import { marked } from 'marked'
import hljs from 'highlight.js'
import type { App } from 'vue'
import type { MarkedExtension } from 'marked'
import 'highlight.js/styles/github.css'

// 配置 marked 选项 - 使用 marked.use() 替代已弃用的 setOptions()
marked.use({
  renderer: {
    code(code: string, language?: string): string {
      if (language && hljs.getLanguage(language)) {
        try {
          const result = hljs.highlight(code, { language })
          return `<pre><code class="hljs language-${language}">${result.value}</code></pre>`
        } catch (err: unknown) {
          console.error('代码高亮失败:', err instanceof Error ? err.message : String(err))
        }
      }
      const result = hljs.highlightAuto(code)
      return `<pre><code class="hljs">${result.value}</code></pre>`
    }
  },
  breaks: true, // 支持换行
  gfm: true, // 支持GitHub风格markdown
} as MarkedExtension)

// 创建 Markdown 渲染插件
export const MarkdownPlugin = {
  install(app: App) {
    // 全局提供 marked 方法
    app.config.globalProperties.$marked = marked

    // 提供全局方法
    app.provide('marked', marked)
  }
}

// 声明全局属性类型扩展
declare module 'vue' {
  interface ComponentCustomProperties {
    $marked: typeof marked
  }
}

export default MarkdownPlugin