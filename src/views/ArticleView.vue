<template>
    <div>
        <ListCard :list="ArticleDates" />
    </div>
</template>

<script setup lang="ts">
// 导入 ListCard 组件
import ListCard from '@/components/ListCard.vue';
// 导入文章数据
import { ArticleDates } from '@/data';
</script>