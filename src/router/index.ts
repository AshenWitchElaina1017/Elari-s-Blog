/**
 * @file: 路由配置文件
 * @description: 定义应用的所有页面路由
 */

import { createRouter, createWebHistory } from 'vue-router'

// 创建路由实例
const router = createRouter({
  // 使用 HTML5 History 模式
  history: createWebHistory(),
  // 定义路由规则
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue') // 首页
    },
    {
      path: '/anime',
      name: 'anime',
      component: () => import('../views/AnimeView.vue') // 番剧列表页
    },
    // 新增：番剧详情页 (动态路由)
    // :id 会匹配 /anime/ 后面跟着的任何数字或字符串
    {
      path: '/anime/:id',
      name: 'anime-detail',
      component: () => import('../views/AnimeDetail.vue') 
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/ArticleView.vue') // 文章列表页
    },
    // 新增：文章详情页 (动态路由)
    // :id 会匹配 /article/ 后面跟着的任何数字或字符串
    {
      path: '/article/:id',
      name: 'article-detail',
      component: () => import('../views/ArticleDetail.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue') // 聊天页
    },
    {
      path: '/tool',
      name: 'tool',
      component: () => import('../views/ToolView.vue') // 工具页
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue') // 关于页
    },
  ],
})

// 导出路由实例
export default router