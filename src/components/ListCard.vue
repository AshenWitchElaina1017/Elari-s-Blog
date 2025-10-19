<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        <div 
            v-for="item in displayList" 
            :key="item.id"
            class="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
        >
        
            <router-link 
                :to="`/${item.cardType}/${item.id}`"
                class="block"
            >
                <!-- 图片容器 -->
                <div v-if="item.img" class="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                    <img 
                        :src="item.img" 
                        :alt="item.title"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    >
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <!-- 标题区域 -->
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                        {{ item.title }}
                    </h3>
                </div>

                <div>
                    <p v-if="'des' in item && item.des" class="text-sm text-gray-600 line-clamp-2 p-2 h-30">
                        {{ item.des }}
                    </p>
                </div>

                <!-- 悬浮时的查看详情按钮 -->
                <div class="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div class="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 text-center text-sm font-medium text-purple-600 shadow-lg">
                        查看详情 →
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type AnimeArticle } from '@/type';

// 定义 props，增加一个可选的 limit 属性
const props = defineProps<{
    list: AnimeArticle[];
    limit?: number; // 新增：可选的 limit 属性
}>()

// 修改计算属性
const displayList = computed(() => {
    // 检查 props.limit 是否被提供
    if (props.limit !== undefined && props.limit > 0) {
        // 如果提供了 limit，则截取数组
        return props.list.slice(0, props.limit);
    }
    // 如果没有提供 limit，则返回完整的数组
    return props.list;
})
</script>