<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面标题 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">GitHub 工具箱</h1>
        <p class="mt-2 text-gray-600">探索GitHub用户、仓库和热门项目</p>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 搜索功能区域 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 用户搜索 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              搜索GitHub用户
            </label>
            <div class="flex gap-2">
              <input
                v-model="userSearchQuery"
                @keyup.enter="searchUser"
                type="text"
                placeholder="输入GitHub用户名"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <button
                @click="searchUser"
                :disabled="user.loading || !userSearchQuery.trim()"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <span v-if="user.loading" class="flex items-center">
                  <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  搜索中
                </span>
                <span v-else>搜索</span>
              </button>
            </div>
          </div>

          <!-- 仓库搜索 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              搜索仓库
            </label>
            <div class="flex gap-2">
              <input
                v-model="repoSearchQuery"
                @keyup.enter="searchRepo"
                type="text"
                placeholder="输入仓库名或关键词"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
              <button
                @click="searchRepo"
                :disabled="repos.loading || !repoSearchQuery.trim()"
                class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <span v-if="repos.loading" class="flex items-center">
                  <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  搜索中
                </span>
                <span v-else>搜索</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 搜索历史 -->
        <div v-if="history.length > 0" class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-700">搜索历史</h3>
            <button
              @click="clearHistory"
              class="text-xs text-red-600 hover:text-red-800"
            >
              清除历史
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in history.slice(0, 10)"
              :key="item.id"
              @click="useHistoryItem(item)"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
            >
              <svg v-if="item.type === 'user'" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
              <svg v-else class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              {{ item.query }}
              <button
                @click.stop="removeFromHistory(item.id)"
                class="ml-1 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- 用户仓库快速查看模块 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">快速查看用户仓库</h3>
          <button
            v-if="quickView.user"
            @click="clearQuickView"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <div class="flex gap-3 mb-4">
          <input
            v-model="quickViewUsername"
            @keyup.enter="fetchQuickView"
            type="text"
            placeholder="输入GitHub用户名"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
          <select
            v-model="quickViewType"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">所有仓库</option>
            <option value="owner">拥有的仓库</option>
            <option value="member">参与的仓库</option>
          </select>
          <select
            v-model="quickViewSort"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="stars">按星标排序</option>
            <option value="forks">按Fork排序</option>
            <option value="updated">按更新时间</option>
            <option value="created">按创建时间</option>
            <option value="name">按名称排序</option>
            <option value="size">按大小排序</option>
            <option value="issues">按问题数排序</option>
          </select>
          <button
            @click="fetchQuickView"
            :disabled="quickView.loading || !quickViewUsername.trim()"
            class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="quickView.loading" class="flex items-center">
              <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              加载中
            </span>
            <span v-else>查看仓库</span>
          </button>
        </div>

        <!-- 快速查看用户信息 -->
        <div v-if="quickView.user" class="bg-gray-50 rounded-lg p-4 mb-4">
          <div class="flex items-center gap-4">
            <img
              :src="quickView.user.avatar_url"
              :alt="quickView.user.name || quickView.user.login"
              class="w-16 h-16 rounded-full"
            >
            <div class="flex-1">
              <h4 class="text-lg font-semibold text-gray-900">{{ quickView.user.name || quickView.user.login }}</h4>
              <p class="text-gray-600">@{{ quickView.user.login }}</p>
              <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{{ quickView.user.public_repos }} 个仓库</span>
                <span>{{ quickView.user.followers }} 关注者</span>
                <span>{{ quickView.user.following }} 关注中</span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-purple-600">{{ formatNumber(quickView.totalCount) }}</div>
              <div class="text-sm text-gray-600">总仓库数</div>
            </div>
          </div>
        </div>

        <!-- 快速查看错误提示 -->
        <div v-if="quickView.error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span class="text-red-800">{{ quickView.error }}</span>
          </div>
        </div>

        <!-- 快速查看仓库列表 -->
        <div v-if="quickView.repos.length > 0" class="space-y-3">
          <h4 class="text-md font-medium text-gray-700">
            仓库列表 ({{ quickView.repos.length }}/{{ quickView.totalCount }})
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            <div
              v-for="repo in quickView.repos"
              :key="repo.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 hover:border-purple-300"
            >
              <div class="flex items-start justify-between mb-2">
                <h5 class="font-semibold text-gray-900 truncate">
                  <a
                    :href="repo.html_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    {{ repo.name }}
                  </a>
                </h5>
                <span v-if="repo.private" class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                  Private
                </span>
              </div>
              <p v-if="repo.description" class="text-sm text-gray-600 mb-2 line-clamp-2">
                {{ repo.description }}
              </p>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span v-if="repo.language" class="flex items-center">
                  <span
                    class="w-2 h-2 rounded-full mr-1"
                    :style="{ backgroundColor: getLanguageColor(repo.language) }"
                  ></span>
                  {{ repo.language }}
                </span>
                <span class="flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  {{ formatNumber(repo.stargazers_count) }}
                </span>
                <span class="flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  {{ formatNumber(repo.forks_count) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 仓库快速访问模块 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">仓库快速访问</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              用户名
            </label>
            <input
              v-model="specificRepoOwner"
              @keyup.enter="fetchSpecificRepoFromInputs"
              type="text"
              placeholder="输入GitHub用户名"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              仓库名
            </label>
            <input
              v-model="specificRepoName"
              @keyup.enter="fetchSpecificRepoFromInputs"
              type="text"
              placeholder="输入仓库名称"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="fetchSpecificRepoFromInputs"
            :disabled="specificRepo.loading || !specificRepoOwner.trim() || !specificRepoName.trim()"
            class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="specificRepo.loading" class="flex items-center">
              <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              查找中
            </span>
            <span v-else>访问仓库</span>
          </button>
        </div>

        <!-- 仓库访问历史 -->
        <div v-if="repoAccessHistory.length > 0" class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-700">访问历史</h4>
            <button
              @click="clearRepoAccessHistory"
              class="text-xs text-red-600 hover:text-red-800"
            >
              清除历史
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div
              v-for="item in repoAccessHistory.slice(0, 9)"
              :key="item.id"
              @click="useAccessHistory(item)"
              class="flex items-center gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <span class="text-xs text-gray-600 truncate">{{ item.fullName }}</span>
              <button
                @click.stop="removeFromRepoAccessHistory(item.id)"
                class="ml-auto text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <!-- 特定仓库信息显示 -->
        <div v-if="specificRepo.data" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-1">
                <a
                  :href="specificRepo.data.html_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-green-600 hover:text-green-800 transition-colors"
                >
                  {{ specificRepo.data.full_name }}
                </a>
              </h4>
              <p v-if="specificRepo.data.description" class="text-sm text-gray-600">
                {{ specificRepo.data.description }}
              </p>
            </div>
            <button
              @click="clearSpecificRepo"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div class="text-center">
              <div class="font-semibold text-gray-900">{{ formatNumber(specificRepo.data.stargazers_count) }}</div>
              <div class="text-gray-600">Stars</div>
            </div>
            <div class="text-center">
              <div class="font-semibold text-gray-900">{{ formatNumber(specificRepo.data.forks_count) }}</div>
              <div class="text-gray-600">Forks</div>
            </div>
            <div class="text-center">
              <div class="font-semibold text-gray-900">{{ specificRepo.data.language || 'N/A' }}</div>
              <div class="text-gray-600">语言</div>
            </div>
            <div class="text-center">
              <div class="font-semibold text-gray-900">{{ formatDate(specificRepo.data.updated_at) }}</div>
              <div class="text-gray-600">更新时间</div>
            </div>
          </div>
        </div>

        <!-- 特定仓库错误提示 -->
        <div v-if="specificRepo.error" class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span class="text-red-800">{{ specificRepo.error }}</span>
          </div>
        </div>
      </div>

      <!-- 错误提示 -->
      <div v-if="user.error || repos.error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          <span class="text-red-800">{{ user.error || repos.error }}</span>
        </div>
      </div>

      <!-- 用户信息展示 -->
      <div v-if="user.data" class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-start justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">用户信息</h2>
          <button
            @click="clearUserInfo"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <div class="flex flex-col md:flex-row gap-6">
          <!-- 用户头像和基本信息 -->
          <div class="flex flex-col items-center md:items-start">
            <img
              :src="user.data.avatar_url"
              :alt="user.data.name || user.data.login"
              class="w-24 h-24 rounded-full shadow-lg mb-4"
            >
            <div class="text-center md:text-left">
              <h3 class="text-lg font-semibold text-gray-900">{{ user.data.name || user.data.login }}</h3>
              <p class="text-gray-600">@{{ user.data.login }}</p>
              <p v-if="user.data.bio" class="mt-2 text-sm text-gray-700">{{ user.data.bio }}</p>
            </div>
          </div>

          <!-- 用户统计信息 -->
          <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900">{{ formatNumber(user.data.public_repos) }}</div>
              <div class="text-sm text-gray-600">仓库</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900">{{ formatNumber(user.data.followers) }}</div>
              <div class="text-sm text-gray-600">关注者</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900">{{ formatNumber(user.data.following) }}</div>
              <div class="text-sm text-gray-600">关注中</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900">{{ formatNumber(user.data.public_gists) }}</div>
              <div class="text-sm text-gray-600">Gists</div>
            </div>
          </div>
        </div>

        <!-- 其他信息 -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div v-if="user.data.company" class="flex items-center text-gray-700">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clip-rule="evenodd"/>
            </svg>
            {{ user.data.company }}
          </div>
          <div v-if="user.data.location" class="flex items-center text-gray-700">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            {{ user.data.location }}
          </div>
          <div v-if="user.data.blog" class="flex items-center text-gray-700">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd"/>
            </svg>
            <a :href="user.data.blog" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">
              {{ user.data.blog }}
            </a>
          </div>
          <div class="flex items-center text-gray-700">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            加入于 {{ formatDate(user.data.created_at) }}
          </div>
        </div>

        <!-- 查看用户仓库按钮 -->
        <div class="mt-6">
          <button
            @click="loadUserRepos"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看用户仓库
          </button>
        </div>
      </div>

      <!-- 仓库列表展示 -->
      <div v-if="filteredRepos.length > 0" class="bg-white rounded-lg shadow-md p-6">
        <!-- 仓库列表标题和筛选 -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4 md:mb-0">
            仓库列表 <span class="text-sm text-gray-500">({{ filteredRepos.length }})</span>
          </h2>
          <div class="flex items-center gap-4">
            <!-- 搜索框 -->
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索仓库名称或描述..."
              class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            <!-- 排序选择 -->
            <select
              v-model="sortOption"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="stars">按星标排序</option>
              <option value="forks">按Fork排序</option>
              <option value="updated">按更新时间</option>
              <option value="created">按创建时间</option>
              <option value="name">按名称排序</option>
            </select>
          </div>
        </div>

        <!-- 仓库网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="repo in filteredRepos"
            :key="repo.id"
            class="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow duration-300 hover:border-blue-300"
          >
            <!-- 仓库标题 -->
            <div class="mb-3">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                <a
                  :href="repo.html_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {{ repo.name }}
                </a>
              </h3>
              <p v-if="repo.description" class="text-sm text-gray-600 line-clamp-2">
                {{ repo.description }}
              </p>
            </div>

            <!-- 仓库信息 -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <!-- 语言 -->
              <div v-if="repo.language" class="flex items-center">
                <span
                  class="w-3 h-3 rounded-full mr-1"
                  :style="{ backgroundColor: getLanguageColor(repo.language) }"
                ></span>
                <span>{{ repo.language }}</span>
              </div>

              <!-- 星标 -->
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>{{ formatNumber(repo.stargazers_count) }}</span>
              </div>

              <!-- Fork -->
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>{{ formatNumber(repo.forks_count) }}</span>
              </div>

              <!-- 更新时间 -->
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                <span>{{ formatDate(repo.updated_at) }}</span>
              </div>
            </div>

            <!-- 标签 -->
            <div v-if="repo.topics.length > 0" class="mt-3 flex flex-wrap gap-1">
              <span
                v-for="topic in repo.topics.slice(0, 3)"
                :key="topic"
                class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
              >
                {{ topic }}
              </span>
              <span v-if="repo.topics.length > 3" class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                +{{ repo.topics.length - 3 }}
              </span>
            </div>

            <!-- 操作按钮 -->
            <div class="mt-4 flex gap-2">
              <a
                :href="repo.html_url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 text-center px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                访问仓库
              </a>
              <button
                @click="viewRepoDetail(repo)"
                class="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
              >
                详情
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 热门仓库 -->
      <div v-if="!user.data && !repos.data && trending.data" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">热门仓库</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="repo in trending.data"
            :key="repo.id"
            class="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow duration-300"
          >
            <!-- 仓库标题 -->
            <div class="mb-3">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                <a
                  :href="repo.html_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {{ repo.name }}
                </a>
              </h3>
              <p v-if="repo.description" class="text-sm text-gray-600 line-clamp-2">
                {{ repo.description }}
              </p>
            </div>

            <!-- 仓库信息 -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <!-- 语言 -->
              <div v-if="repo.language" class="flex items-center">
                <span
                  class="w-3 h-3 rounded-full mr-1"
                  :style="{ backgroundColor: getLanguageColor(repo.language) }"
                ></span>
                <span>{{ repo.language }}</span>
              </div>

              <!-- 星标 -->
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>{{ formatNumber(repo.stargazers_count) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!user.data && !repos.data && !trending.data && !user.loading && !repos.loading && !trending.loading" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">没有找到内容</h3>
        <p class="mt-1 text-sm text-gray-500">开始搜索GitHub用户或仓库吧</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  useGitHubUser,
  useGitHubRepos,
  useSearchHistory,
  useTrendingRepos,
  useUserRepoQuickView,
  useSpecificRepo,
  useRepoAccessHistory,
  getLanguageColor,
  formatNumber,
  formatDate
} from '@/composables/useGitHub';
import type { RepoType, RepoSortOption, RepoAccessHistory, GitHubRepo } from '@/types/github';

// 使用组合函数
const { user, fetchUser, clearUser } = useGitHubUser();
const { repos, filteredRepos, searchQuery, sortOption, fetchUserRepos, searchRepos, clearRepos } = useGitHubRepos();
const { history, addToHistory, clearHistory, removeFromHistory } = useSearchHistory();
const { trending, fetchTrendingRepos } = useTrendingRepos();

// 新增组合函数
const { quickView, fetchUserRepoQuickView, clearQuickView } = useUserRepoQuickView();
const { repo, fetchSpecificRepo, clearSpecificRepo } = useSpecificRepo();
const {
  history: repoAccessHistory,
  addToHistory: addToRepoAccessHistory,
  clearHistory: clearRepoAccessHistory,
  removeFromHistory: removeFromRepoAccessHistory
} = useRepoAccessHistory();

// 快速查看相关响应式变量
const quickViewUsername = ref<string>('');
const quickViewType = ref<RepoType>('all');
const quickViewSort = ref<RepoSortOption>('stars');

// 特定仓库相关响应式变量
const specificRepoOwner = ref<string>('');
const specificRepoName = ref<string>('');

// 为了在模板中使用，创建特定仓库的别名
const specificRepo = repo;

// 搜索查询
const userSearchQuery = ref('');
const repoSearchQuery = ref('');

/**
 * 搜索用户
 */
const searchUser = async () => {
  if (!userSearchQuery.value.trim()) return;

  await fetchUser(userSearchQuery.value);
  if (user.value.data) {
    addToHistory(userSearchQuery.value, 'user');
  }
};

/**
 * 搜索仓库
 */
const searchRepo = async () => {
  if (!repoSearchQuery.value.trim()) return;

  await searchRepos(repoSearchQuery.value);
  if (repos.value.data) {
    addToHistory(repoSearchQuery.value, 'repo');
  }
};

/**
 * 使用历史记录
 */
const useHistoryItem = (item: { query: string; type: string }) => {
  if (item.type === 'user') {
    userSearchQuery.value = item.query;
    searchUser();
  } else {
    repoSearchQuery.value = item.query;
    searchRepo();
  }
};

/**
 * 清除用户信息
 */
const clearUserInfo = () => {
  clearUser();
  clearRepos();
  userSearchQuery.value = '';
};

/**
 * 加载用户仓库
 */
const loadUserRepos = async () => {
  if (user.value.data) {
    await fetchUserRepos(user.value.data.login);
  }
};

/**
 * 查看仓库详情
 */
const viewRepoDetail = (repo: { owner: { login: string }; name: string }) => {
  // 打开GitHub仓库页面
  window.open(`https://github.com/${repo.owner.login}/${repo.name}`, '_blank');
};

/**
 * 快速查看用户仓库
 */
const fetchQuickView = async (): Promise<void> => {
  if (!quickViewUsername.value.trim()) return;

  await fetchUserRepoQuickView(
    quickViewUsername.value.trim(),
    quickViewType.value,
    quickViewSort.value
  );
};

/**
 * 获取特定仓库
 */
const fetchSpecificRepoFromInputs = async (): Promise<void> => {
  if (!specificRepoOwner.value.trim() || !specificRepoName.value.trim()) return;

  await fetchSpecificRepo({
    owner: specificRepoOwner.value.trim(),
    repo: specificRepoName.value.trim()
  });

  // 如果成功获取仓库信息，添加到访问历史
  if (specificRepo.value.data) {
    // 创建一个可变副本以解决 readonly 类型问题
    const repoCopy = { ...specificRepo.value.data, topics: [...specificRepo.value.data.topics] } as GitHubRepo;
    addToRepoAccessHistory(repoCopy);
  }
};

/**
 * 使用访问历史
 */
const useAccessHistory = (item: RepoAccessHistory): void => {
  const [owner, repo] = item.fullName.split('/');
  specificRepoOwner.value = owner || '';
  specificRepoName.value = repo || '';
  fetchSpecificRepoFromInputs();
};

// 组件挂载时加载热门仓库
onMounted(async () => {
  await fetchTrendingRepos();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
