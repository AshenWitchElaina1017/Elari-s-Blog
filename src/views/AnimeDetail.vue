<template>
    <div class="bg-white rounded-lg shadow-xl m-8 p-8 max-w-3xl mx-auto">
        <div v-if="anime">
            <h1 class="text-4xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                {{ anime.title }}
            </h1>
            
            <img 
                :src="anime.img" 
                :alt="anime.title"
                class="w-full h-auto object-cover rounded-lg shadow-md"
            >
            <div>
                <p class="text-gray-500 mt-4">
                    {{ anime.content }}
                </p>
            </div>
        </div>
        <div v-else>
            <h1 class="text-2xl font-semibold text-gray-600">
                番剧未找到
            </h1>
            <p class="text-gray-500 mt-4">
                无法找到 ID 为 {{ route.params.id }} 的番剧。
            </p>
            <router-link to="/" class="text-blue-500 hover:underline mt-4 inline-block">
                返回首页
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * @file: 番剧详情页
 * @description: 显示单个番剧的详细信息（标题和图片）。
 */

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { AnimeDates } from '@/data'; // 导入番剧数据
/**
 * @function useRoute
 * @description 获取当前路由信息对象
 */
const route = useRoute();

/**
 * @function anime (computed)
 * @description 从路由参数中获取 'id'，并在 'AnimeDates' 数组中查找对应的番剧项。
 * @returns {AnimeArticle | undefined} 找到的番剧对象，如果未找到则为 undefined。
 */
const anime = computed(() => {
    // 1. 从路由参数中获取 id (route.params.id)
    //    注意：路由参数总是字符串，我们使用 + 将其转换为数字
    const currentId = +(route.params.id as string);

    // 2. 在 AnimeDates 数组中查找匹配的 id
    return AnimeDates.find(item => item.id === currentId);
});
</script>