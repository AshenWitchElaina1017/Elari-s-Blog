<template>
  <div class="h-[674.5px] bg-gray-100">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md h-[674.5px] flex flex-col">
      <!-- 标题和操作按钮区域 -->
      <div class="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h1 class="text-xl font-bold">AI 聊天助手</h1>
        <button
          @click="clearChat"
          :disabled="!hasMessages"
          class="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          清空对话
        </button>
      </div>
      
      <!-- 聊天区域 -->
      <div 
        ref="chatContainer" 
        class="flex-1 p-4 overflow-y-auto space-y-4"
      >
        <div
          v-for="message in messages"
          :key="message.id"
          :class="[
            'flex',
            message.role === 'user' ? 'justify-end' : 'justify-start'
          ]"
        >
          <div class="max-w-xs lg:max-w-md">
            <div
              :class="[
                'px-4 py-2 rounded-lg relative',
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              ]"
            >
              <!-- 消息内容 -->
              <div
                v-if="message.role === 'assistant'"
                class="markdown-content"
                v-html="renderMarkdown(message.content)"
              ></div>
              <div v-else class="whitespace-pre-wrap">{{ message.content }}</div>

              <!-- 消息状态和时间 -->
              <div
                :class="[
                  'text-xs mt-1 flex items-center gap-2',
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                ]"
              >
                <!-- 时间戳 -->
                <span>{{ formatTime(message.timestamp) }}</span>

                <!-- 状态指示器 -->
                <span v-if="message.status === 'sending'" class="inline-flex items-center">
                  <svg class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  发送中
                </span>

                <span v-else-if="message.status === 'error'" class="text-red-500 flex items-center gap-1">
                  <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  发送失败
                </span>

                <!-- 重试按钮（仅对用户的消息显示） -->
                <button
                  v-if="message.role === 'user' && message.status === 'error'"
                  @click="retryMessage(message.id, message.content)"
                  class="text-blue-500 hover:text-blue-600 underline"
                  title="重试发送"
                >
                  重试
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="loading" class="flex justify-start">
          <div class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
            思考中...
          </div>
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="border-t p-4">
        <div class="flex space-x-2">
          <input
            ref="inputRef"
            v-model="inputMessage"
            @keyup="handleKeyup"
            type="text"
            placeholder="输入你的问题..."
            class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="loading || isSubmitting"
          />
          <button
            @click="debouncedSendMessage"
            :disabled="loading || isSubmitting || !inputMessage.trim()"
            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            发送
          </button>
        </div>
      </div>
    </div>

    <!-- 清空确认对话框 -->
    <div 
      v-if="showClearConfirm" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg max-w-sm mx-4">
        <h3 class="text-lg font-bold mb-2">确认清空</h3>
        <p class="text-gray-600 mb-4">确定要清空所有聊天记录吗？此操作不可撤销。</p>
        <div class="flex justify-end space-x-2">
          <button
            @click="showClearConfirm = false"
            class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            @click="confirmClearChat"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            确认清空
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { marked } from 'marked'

// 类型定义
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  status: 'sending' | 'sent' | 'error'
}

interface APIResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

// 错误类型枚举
enum ErrorType {
  NETWORK = 'network',
  AUTHENTICATION = 'authentication',
  RATE_LIMIT = 'rate_limit',
  INVALID_RESPONSE = 'invalid_response',
  UNKNOWN = 'unknown'
}

// 响应式状态
const inputMessage = ref('')
const messages = ref<Message[]>([])
const loading = ref(false)
const chatContainer = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const showClearConfirm = ref(false)
const retryMessageId = ref<string | null>(null)
const isSubmitting = ref(false)

// API 配置 - 使用环境变量
const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY
const MODEL = import.meta.env.VITE_MODEL

// 计算属性：检查是否为空消息
const hasMessages = computed(() => messages.value.length > 1)

// Markdown 渲染函数
const renderMarkdown = (content: string) => {
  try {
    return marked.parse(content)
  } catch (error) {
    console.error('Markdown 渲染失败:', error)
    return content
  }
}

// 防抖函数
const debounce = <T extends (...args: unknown[]) => unknown>(func: T, wait: number): T => {
  let timeout: number
  return ((...args: Parameters<T>) => {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }) as T
}

// 生成唯一ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

// 获取错误类型
const getErrorType = (error: unknown): ErrorType => {
  if (error instanceof Error) {
    if (error.message.includes('HTTP error! status: 401')) {
      return ErrorType.AUTHENTICATION
    }
    if (error.message.includes('HTTP error! status: 429')) {
      return ErrorType.RATE_LIMIT
    }
    if (error instanceof SyntaxError) {
      return ErrorType.INVALID_RESPONSE
    }
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return ErrorType.NETWORK
    }
  }
  return ErrorType.UNKNOWN
}

// 获取用户友好的错误信息
const getErrorMessage = (errorType: ErrorType): string => {
  switch (errorType) {
    case ErrorType.AUTHENTICATION:
      return 'API Key 无效或已过期，请检查您的 API 密钥。'
    case ErrorType.RATE_LIMIT:
      return '请求频率过高或额度已用完，请稍后再试。'
    case ErrorType.NETWORK:
      return '网络连接失败，请检查网络连接后重试。'
    case ErrorType.INVALID_RESPONSE:
      return 'API 返回了无效的响应格式，请稍后再试。'
    default:
      return '抱歉，发生了未知错误，请稍后再试。'
  }
}

// 防抖发送消息函数
const debouncedSendMessage = debounce(async () => {
  await sendMessage()
}, 500)

// 发送消息函数
const sendMessage = async (retryContent?: string) => {
  if ((!inputMessage.value.trim() && !retryContent) || loading.value || isSubmitting.value) return

  const messageContent = retryContent || inputMessage.value.trim()
  const messageId = retryMessageId.value || generateId()

  // 重置重试状态
  retryMessageId.value = null
  isSubmitting.value = true

  // 如果是重试，先更新原消息状态
  if (retryContent) {
    const messageIndex = messages.value.findIndex(msg => msg.id === messageId)
    if (messageIndex !== -1) {
      messages.value[messageIndex]!.status = 'sending'
    }
  } else {
    // 创建用户消息
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
      status: 'sent'
    }

    messages.value.push(userMessage)
    inputMessage.value = ''
  }

  loading.value = true

  await scrollToBottom()

  try {
    console.log('正在发送请求到:', API_URL)

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: '你是一个有用的AI助手。'
          },
          ...messages.value.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    })

    console.log('响应状态:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('错误响应内容:', errorText)
      throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`)
    }

    const data: APIResponse = await response.json()
    console.log('成功响应:', data)

    const assistantMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: data.choices[0]?.message.content || '',
      timestamp: new Date(),
      status: 'sent'
    }

    messages.value.push(assistantMessage)
  } catch (error) {
    console.error('发送消息失败:', error)

    const errorType = getErrorType(error)
    const errorContent = getErrorMessage(errorType)

    // 如果是重试消息，更新其状态为错误
    if (retryContent) {
      const messageIndex = messages.value.findIndex(msg => msg.id === messageId)
      if (messageIndex !== -1) {
        messages.value[messageIndex]!.status = 'error'
      }
    }

    const errorMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: errorContent,
      timestamp: new Date(),
      status: 'error'
    }

    messages.value.push(errorMessage)
  } finally {
    loading.value = false
    isSubmitting.value = false
    await scrollToBottom()
  }
}

// 重试发送消息
const retryMessage = (messageId: string, content: string) => {
  retryMessageId.value = messageId
  sendMessage(content)
}


// 清空聊天函数 - 显示确认对话框
const clearChat = () => {
  // 如果只有初始消息或没有消息，不需要清空
  if (messages.value.length <= 1) {
    return
  }
  showClearConfirm.value = true
}

// 确认清空聊天
const confirmClearChat = () => {
  // 保留初始的欢迎消息
  const initialMessage = messages.value.find(msg =>
    msg.role === 'assistant' && msg.content.includes('你好')
  )

  messages.value = initialMessage ? [initialMessage] : []
  showClearConfirm.value = false

  // 清空后重新聚焦到输入框
  nextTick(() => {
    inputRef.value?.focus()
  })

  // 可选：添加清空成功的提示
  if (messages.value.length === 0) {
    const clearMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: '聊天记录已清空，有什么可以帮你的吗？',
      timestamp: new Date(),
      status: 'sent'
    }
    messages.value.push(clearMessage)
  }
}

// 格式化时间戳
const formatTime = (timestamp: Date) => {
  return timestamp.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 处理回车键发送
const handleKeyup = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    debouncedSendMessage()
  }
}

// 初始化欢迎消息
onMounted(() => {
  const welcomeMessage: Message = {
    id: generateId(),
    role: 'assistant',
    content: '你好！我是AI助手，有什么可以帮你的吗？',
    timestamp: new Date(),
    status: 'sent'
  }
  messages.value.push(welcomeMessage)
})
</script>
