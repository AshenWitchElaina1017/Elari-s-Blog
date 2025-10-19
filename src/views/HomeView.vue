<template>
    <div class="hero-section relative min-h-screen">
        <!-- 背景图片容器 -->
        <div class="absolute inset-0 z-0">
            <img
                src="https://picgo-elaina.oss-cn-chengdu.aliyuncs.com/majotabi/202510061605258.jpeg"
                alt="Background"
                class="w-full h-full object-cover"
                @error="handleImageError"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <!-- 文字内容区域 -->
        <div class="relative z-20 flex flex-col items-center justify-center min-h-screen text-sky-600">
            <!-- 主标题 -->
            <h1 class="hero-title text-5xl md:text-7xl font-bold mb-4 text-center">
                <span class="typewriter" ref="titleText">Elari's Blog</span>
                <span class="cursor">|</span>
            </h1>

            <!-- 小标题 -->
            <p class="hero-subtitle text-xl md:text-2xl mb-12 text-center">
                <span class="typewriter-subtitle" ref="subtitleText">{{ yiyanQuote }}</span>
            </p>

            <!-- 向下滚动箭头 -->
            <div class="scroll-arrow animate-bounce cursor-pointer" @click="scrollToContent">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    </div>
    <div>
        <ListCard :list="AnimeDates" :limit="4" />
        <ListCard :list="ArticleDates" :limit="4" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ListCard from '@/components/ListCard.vue';
import { AnimeDates, ArticleDates } from '@/data';

// 模板引用
const titleText = ref<HTMLElement>();
const subtitleText = ref<HTMLElement>();
const timer = ref<number | null>(null);

// 获取一言数据，添加错误处理
async function getYiyanQuote() {
    try {
        const response = await fetch('https://v1.hitokoto.cn/??c=a&c=c&encode=text');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const quote = await response.text();
        return quote;
    } catch (error) {
        console.error('获取一言数据失败:', error);
        return '生活就像一盒巧克力，你永远不知道下一颗是什么味道。'; // 默认句子
    }
}

const yiyanQuote = ref('');

// 更新一言数据的函数
const updateYiyanQuote = async () => {
    const quote = await getYiyanQuote();
    yiyanQuote.value = quote;
};
// 滚动到内容区域
const scrollToContent = () => {
    const contentElement = document.querySelector('.hero-section + div');
    if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth' });
    }
};

// 处理图片加载错误
const handleImageError = (event: Event) => {
    console.log('背景图片加载失败，使用备用渐变背景');
    const img = event.target as HTMLImageElement;
    if (img) {
        img.style.display = 'none';
    }
};

// 打字机效果和定时器
onMounted(() => {
    // 立即获取一次一言数据
    updateYiyanQuote();

    // 设置定时器，每10秒更新一次一言数据
    timer.value = window.setInterval(() => {
        updateYiyanQuote();
    }, 10000);

    // 主标题打字机效果
    if (titleText.value) {
        const title = "Elari's Blog";
        let titleIndex = 0;

        const typeTitle = () => {
            if (titleIndex < title.length) {
                titleText.value!.textContent = title.substring(0, titleIndex + 1);
                titleIndex++;
                // 随机打字速度，模拟真实打字效果
                const typingSpeed = Math.random() * 100 + 100; // 100-200ms
                setTimeout(typeTitle, typingSpeed);
            } else {
                // 打字完成后停止光标动画
                setTimeout(() => {
                    const cursor = titleText.value?.nextElementSibling as HTMLElement;
                    if (cursor) {
                        cursor.style.animation = 'none';
                        cursor.style.opacity = '0';
                    }
                }, 1000);
            }
        };

        // 开始主标题打字效果
        setTimeout(typeTitle, 500); // 延迟开始
    }
});

// 组件销毁时清理定时器
onUnmounted(() => {
    if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
    }
});
</script>

<style scoped>
/* 打字机效果容器 */
.typewriter, .typewriter-subtitle {
    display: inline-block;
}

/* 光标闪烁效果 */
.cursor, .cursor-subtitle {
    animation: blink 1s infinite;
    display: inline-block;
    vertical-align: text-bottom;
    transition: opacity 0.3s ease;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

/* 英雄区域样式 */
.hero-section {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
}

/* 确保背景图片容器填充整个区域 */
.hero-section .absolute:nth-child(1) {
    width: 100%;
    height: 100%;
}

/* 备用渐变背景的定位 */
.hero-section .bg-gradient-to-br {
    z-index: 1;
}

/* 图片加载失败时显示渐变 */
.hero-section img[style*="display: none"] + .bg-gradient-to-br {
    z-index: 2;
}

/* 确保文字居中显示 */
.hero-title, .hero-subtitle {
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9),
                 1px 1px 3px rgba(0, 0, 0, 0.8);
    letter-spacing: 0.05em;
}

/* 滚动箭头样式 */
.scroll-arrow {
    color: white;
    transition: transform 0.3s ease, color 0.3s ease;
}

.scroll-arrow:hover {
    transform: scale(1.1);
    color: #fbbf24;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }

    .hero-subtitle {
        font-size: 1.25rem;
    }
}
</style>