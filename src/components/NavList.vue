<template>
    <nav class="bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo + Title Group -->
                <div class="flex items-center space-x-3">
                    <img 
                        src="https://picgo-elaina.oss-cn-chengdu.aliyuncs.com/typora/202510111541510.jpg"
                        class="w-16 h-16 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                        alt="Logo"
                    >
                    <div class="text-white text-2xl font-bold tracking-wide">
                        <span class="bg-gradient-to-r from-white to-sky-100 bg-clip-text text-transparent drop-shadow-lg">
                            Elari's
                        </span>
                        <span class="ml-2 font-light text-sky-50">
                            Blog
                        </span>
                    </div>
                </div>
                
                <!-- Navigation Links -->
                <ul class="flex space-x-8 items-center">
                    <li v-for="link in links" :key="link.path">
                        <RouterLink 
                            :to="link.path"
                            class="group flex items-center space-x-2 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                            <!-- SVG Icon -->
                            <svg 
                                class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <!-- 首页图标 -->
                                <path 
                                    v-if="link.name === '首页'" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                                <!-- 番剧图标 (播放/视频) -->
                                <path 
                                    v-else-if="link.name === '番剧'" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                                <!-- 文章图标 (文档) -->
                                <path 
                                    v-else-if="link.name === '文章'" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                                <!-- 工具图标 -->
                                <path 
                                    v-else-if="link.name === '工具'" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <!-- 聊天图标 (对话气泡) -->
                                <path 
                                    v-else-if="link.name === '聊天'" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                                <!-- 关于图标 -->
                                <path 
                                    v-else-if="link.name === '关于'" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            
                            <!-- Link Text -->
                            <span class="text-base font-medium group-hover:text-gray-100">
                                {{ link.name }}
                            </span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const links = [
    { name: '首页', path: '/' },
    { name: '番剧', path: '/anime' },
    { name: '文章', path: '/article' },
    { name: '工具', path: '/tool' },
    { name: '聊天', path: '/chat' },
    { name: '关于', path: '/about' },
];
</script>
