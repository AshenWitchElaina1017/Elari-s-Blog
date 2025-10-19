<template>
    <div>
        <ListCard :list="AnimeDates" />
    </div>
</template>

<script setup lang="ts">
/**
 * @file: 番剧视图页面
 * @description: 该页面用于显示所有的番剧卡片列表。
 */

// 导入 ListCard 组件，用于渲染卡片网格
import ListCard from '@/components/ListCard.vue';

// 导入番剧数据源
import { AnimeDates } from '@/data';

// (setup lang="ts" 自动处理了组件和数据的注册，无需额外代码)
</script>