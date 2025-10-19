<template>
    <div class="min-h-screen">
        <!-- Hero区域 - 个人介绍大图 -->
        <section class="relative h-screen flex items-center justify-center overflow-hidden">
            <!-- 背景图片 -->
            <div class="absolute inset-0">
                <img
                    :src="aboutData.personal.backgroundImage"
                    alt="个人背景图"
                    class="w-full h-full object-cover"
                >
                <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
            </div>

            <!-- 内容区域 -->
            <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <!-- 头像和品牌标识 -->
                <div class="mb-8">
                    <img
                        :src="aboutData.personal.avatar"
                        alt="Elari"
                        class="w-32 h-32 rounded-full mx-auto mb-6 shadow-2xl ring-4 ring-white/30 hover:scale-105 transition-transform duration-300"
                    >
                    <h1 class="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-sky-100 bg-clip-text text-transparent">
                        {{ aboutData.personal.title }}
                    </h1>
                    <p class="text-xl md:text-2xl text-sky-100 mb-8">
                        {{ aboutData.personal.subtitle }}
                    </p>
                </div>

                <!-- 简短介绍 -->
                <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
                    <p class="text-lg md:text-xl leading-relaxed text-white/90 whitespace-pre-line" v-html="aboutData.personal.description">
                    </p>
                </div>

                <!-- 向下滚动提示 -->
                <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg class="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </section>

        <!-- 项目介绍区域 -->
        <section class="py-20 px-4 bg-gradient-to-br from-sky-50 to-blue-50">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        {{ aboutData.project.title }}
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        {{ aboutData.project.subtitle }}
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-8 items-center">
                    <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <h3 class="text-2xl font-bold text-sky-600 mb-6">{{ aboutData.project.vision.title }}</h3>
                        <div v-for="(content, index) in aboutData.project.vision.content" :key="index" class="mb-4">
                            <p class="text-gray-700 leading-relaxed whitespace-pre-line" v-html="content">
                            </p>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <h3 class="text-2xl font-bold mb-6">{{ aboutData.project.coreValues.title }}</h3>
                        <ul class="space-y-4">
                            <li v-for="(value, index) in aboutData.project.coreValues.values" :key="index" class="flex items-start">
                                <svg class="w-6 h-6 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span class="text-lg">{{ value }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- 功能模块展示 -->
        <section class="py-20 px-4 bg-white">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        功能模块
                    </h2>
                    <p class="text-xl text-gray-600">
                        探索网站的六大核心功能区域
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="(feature, index) in aboutData.features" :key="index"
                         :class="`group bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`">
                        <div class="p-8 text-white">
                            <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold mb-4">{{ feature.title }}</h3>
                            <p class="text-white/90 leading-relaxed">
                                {{ feature.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 技术栈展示 -->
        <section class="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        技术栈
                    </h2>
                    <p class="text-xl text-gray-600">
                        构建这个网站所使用的技术和工具
                    </p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="(tech, index) in aboutData.techStack" :key="index"
                         class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div :class="`${tech.color} text-4xl font-bold mb-4`">{{ tech.name }}</div>
                        <p class="text-gray-700">{{ tech.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 个人特色区域 -->
        <section class="py-20 px-4 bg-gradient-to-br from-sky-100 to-blue-100">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        {{ aboutData.personalFeatures.title }}
                    </h2>
                    <p class="text-xl text-gray-600">
                        {{ aboutData.personalFeatures.subtitle }}
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="space-y-8">
                        <div class="bg-white rounded-2xl shadow-xl p-8">
                            <h3 class="text-2xl font-bold text-sky-600 mb-6">{{ aboutData.personalFeatures.animeHobby.title }}</h3>
                            <div v-for="(content, index) in aboutData.personalFeatures.animeHobby.content" :key="index" class="mb-4">
                                <p class="text-gray-700 leading-relaxed whitespace-pre-line" v-html="content">
                                </p>
                            </div>
                        </div>

                        <div class="bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-xl p-8 text-white">
                            <h3 class="text-2xl font-bold mb-6">{{ aboutData.personalFeatures.techPursuit.title }}</h3>
                            <div v-for="(content, index) in aboutData.personalFeatures.techPursuit.content" :key="index" class="mb-4">
                                <p class="text-white/90 leading-relaxed whitespace-pre-line" v-html="content">
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl shadow-xl p-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-6">{{ aboutData.personalFeatures.conceptIntegration.title }}</h3>
                        <div class="space-y-6">
                            <div v-for="(concept, index) in aboutData.personalFeatures.conceptIntegration.concepts" :key="index" class="flex items-start">
                                <div class="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                    <span class="text-white font-bold">{{ concept.number }}</span>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-800 mb-2">{{ concept.title }}</h4>
                                    <p class="text-gray-600">{{ concept.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 联系方式区域 -->
        <section class="py-20 px-4 bg-gradient-to-br from-sky-500 to-blue-600">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
                    {{ aboutData.contact.title }}
                </h2>
                <p class="text-xl text-sky-100 mb-12">
                    {{ aboutData.contact.subtitle }}
                </p>

                <div class="grid md:grid-cols-3 gap-8 mb-12">
                    <div v-for="(method, index) in aboutData.contact.methods" :key="index"
                         class="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                        <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <svg v-if="method.type === '邮箱'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.icon"></path>
                            </svg>
                            <svg v-else-if="method.type === 'GitHub'" class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path :d="method.icon"/>
                            </svg>
                            <svg v-else class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.icon"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-white mb-2">{{ method.title }}</h3>
                        <p class="text-sky-100">{{ method.value }}</p>
                    </div>
                </div>

                <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                    <p class="text-lg text-white/90 mb-4">
                        {{ aboutData.contact.farewell.main }}
                    </p>
                    <p class="text-sky-100 whitespace-pre-line" v-html="aboutData.contact.farewell.sub">
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
// Vue 3 Composition API - 页面逻辑
import { onMounted } from 'vue'
import { aboutData } from '@/data'

// 页面加载完成后的初始化
onMounted(() => {
    // 可以在这里添加页面加载动画或其他初始化逻辑
    console.log('About page loaded - Welcome to Elari\'s Blog!')
})
</script>

<style scoped>
/* 自定义样式 */
.hero-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
    transform: translateY(-8px);
}

/* 动画效果 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out;
}

/* 平滑滚动 */
html {
    scroll-behavior: smooth;
}

/* 响应式字体大小 */
@media (max-width: 768px) {
    .hero-title {
        font-size: 3rem;
    }
}
</style>