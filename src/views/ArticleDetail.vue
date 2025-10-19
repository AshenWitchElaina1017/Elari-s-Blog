<template>
    <div class="bg-white rounded-lg shadow-xl m-8 p-8 max-w-3xl mx-auto">
        <div v-if="article">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">
                {{ article.title }}
            </h1>
            <p class="text-lg text-gray-600 mb-6 pb-6 border-b border-gray-200">
                {{ article.content }}
            </p>

            <div class="markdown-content" v-html="renderedContent"></div>
        </div>
        
        <div v-else>
            <h1 class="text-2xl font-semibold text-gray-600">
                文章未找到
            </h1>
            <p class="text-gray-500 mt-4">
                无法找到 ID 为 {{ route.params.id }} 的文章。
            </p>
            <router-link to="/article" class="text-blue-500 hover:underline mt-4 inline-block">
                返回文章列表
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ArticleDates } from '@/data';
import { isArticleCard } from '@/type';
import { marked } from 'marked'; 
const route = useRoute();
const article = computed(() => {
    const currentId = +(route.params.id as string);
    return ArticleDates.find(item => item.id === currentId);
});
const renderedContent = computed(() => {
    if (article.value && isArticleCard(article.value)) { 
        try {
            return marked.parse(article.value.content);
        } catch (e) {
            console.error('Markdown 渲染失败:', e);
            return '<p>内容渲染出错</p>';
        }
    }
    return '';
});
</script>

<style scoped>
.markdown-content {
    line-height: 1.7;
    color: #333;
}
</style>