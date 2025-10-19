/**
 * @file: GitHub API组合函数
 * @description: 提供GitHub API调用的响应式状态和方法
 */

import { ref, computed, watch, readonly } from 'vue';
import type {
  GitHubUser,
  GitHubRepo,
  GitHubSearchResult,
  ApiResponse,
  SearchHistory,
  RepoSortOption,
  SearchType,
  RepoFilterOptions,
  RepoAccessHistory,
  UserRepoQuickView,
  SpecificRepoParams,
  PaginationParams,
  PaginatedResponse,
  RepoType,
  SortDirection
} from '@/types/github';

// GitHub API基础URL
const GITHUB_API_BASE = 'https://api.github.com';

// 语言颜色映射
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Vue: '#4fc08d',
  React: '#61dafb',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Dockerfile: '#384d54',
};

/**
 * GitHub用户信息管理
 */
export function useGitHubUser() {
  const user = ref<ApiResponse<GitHubUser>>({
    data: null,
    loading: false,
    error: null,
  });

  /**
   * 获取GitHub用户信息
   * @param username GitHub用户名
   */
  const fetchUser = async (username: string) => {
    if (!username.trim()) {
      user.value.error = '请输入有效的用户名';
      return;
    }

    user.value.loading = true;
    user.value.error = null;

    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${encodeURIComponent(username)}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('用户不存在');
        } else if (response.status === 403) {
          throw new Error('API请求限制，请稍后再试');
        } else {
          throw new Error(`请求失败: ${response.status}`);
        }
      }

      const userData = await response.json();
      user.value.data = userData;
    } catch (error) {
      user.value.error = error instanceof Error ? error.message : '获取用户信息失败';
      user.value.data = null;
    } finally {
      user.value.loading = false;
    }
  };

  /**
   * 清除用户信息
   */
  const clearUser = () => {
    user.value.data = null;
    user.value.error = null;
  };

  return {
    user: readonly(user),
    fetchUser,
    clearUser,
  };
}

/**
 * GitHub仓库信息管理
 */
export function useGitHubRepos() {
  const repos = ref<ApiResponse<GitHubRepo[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const sortOption = ref<RepoSortOption>('stars');
  const searchQuery = ref('');

  /**
   * 获取用户的仓库列表
   * @param username GitHub用户名
   * @param sort 排序选项
   * @param type 仓库类型 (all, owner, member)
   */
  const fetchUserRepos = async (username: string, sort: RepoSortOption = 'stars', type: string = 'all') => {
    if (!username.trim()) return;

    repos.value.loading = true;
    repos.value.error = null;

    try {
      const sortParams: Record<string, string> = {
        stars: 'stars',
        forks: 'forks',
        updated: 'updated',
        created: 'created',
        name: 'name',
      };

      const response = await fetch(
        `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/repos?type=${type}&sort=${sortParams[sort]}&per_page=30`
      );

      if (!response.ok) {
        throw new Error(`获取仓库列表失败: ${response.status}`);
      }

      const reposData = await response.json();
      repos.value.data = reposData;
    } catch (error) {
      repos.value.error = error instanceof Error ? error.message : '获取仓库列表失败';
      repos.value.data = null;
    } finally {
      repos.value.loading = false;
    }
  };

  /**
   * 搜索GitHub仓库
   * @param query 搜索关键词
   * @param sort 排序选项
   * @param order 排序方向 (desc, asc)
   */
  const searchRepos = async (query: string, sort: string = 'stars', order: string = 'desc') => {
    if (!query.trim()) return;

    repos.value.loading = true;
    repos.value.error = null;

    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(query)}&sort=${sort}&order=${order}&per_page=30`
      );

      if (!response.ok) {
        throw new Error(`搜索仓库失败: ${response.status}`);
      }

      const searchResult: GitHubSearchResult<GitHubRepo> = await response.json();
      repos.value.data = searchResult.items;
    } catch (error) {
      repos.value.error = error instanceof Error ? error.message : '搜索仓库失败';
      repos.value.data = null;
    } finally {
      repos.value.loading = false;
    }
  };

  /**
   * 过滤仓库列表
   */
  const filteredRepos = computed(() => {
    if (!repos.value.data) return [];

    if (!searchQuery.value.trim()) return repos.value.data;

    const query = searchQuery.value.toLowerCase();
    return repos.value.data.filter(repo =>
      repo.name.toLowerCase().includes(query) ||
      repo.description?.toLowerCase().includes(query) ||
      repo.language?.toLowerCase().includes(query)
    );
  });

  // 监听排序选项变化
  watch(sortOption, (newSort) => {
    if (repos.value.data && repos.value.data.length > 0) {
      // 重新排序现有数据
      const sorted = [...repos.value.data].sort((a, b) => {
        switch (newSort) {
          case 'stars':
            return b.stargazers_count - a.stargazers_count;
          case 'forks':
            return b.forks_count - a.forks_count;
          case 'updated':
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          case 'created':
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
      repos.value.data = sorted;
    }
  });

  return {
    repos: readonly(repos),
    sortOption,
    searchQuery,
    filteredRepos,
    fetchUserRepos,
    searchRepos,
    clearRepos: () => {
      repos.value.data = null;
      repos.value.error = null;
      searchQuery.value = '';
    },
  };
}

/**
 * 搜索历史管理
 */
export function useSearchHistory() {
  const STORAGE_KEY = 'github-search-history';

  const history = ref<SearchHistory[]>([]);

  /**
   * 加载搜索历史
   */
  const loadHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        history.value = JSON.parse(stored);
      }
    } catch (error) {
      console.error('加载搜索历史失败:', error);
    }
  };

  /**
   * 添加搜索记录
   */
  const addToHistory = (query: string, type: SearchType) => {
    const newRecord: SearchHistory = {
      id: Date.now().toString(),
      query,
      type,
      timestamp: Date.now(),
    };

    // 移除重复记录
    history.value = history.value.filter(item => item.query !== query || item.type !== type);

    // 添加到开头
    history.value.unshift(newRecord);

    // 保持最多20条记录
    if (history.value.length > 20) {
      history.value = history.value.slice(0, 20);
    }

    // 保存到本地存储
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value));
    } catch (error) {
      console.error('保存搜索历史失败:', error);
    }
  };

  /**
   * 清除搜索历史
   */
  const clearHistory = () => {
    history.value = [];
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('清除搜索历史失败:', error);
    }
  };

  /**
   * 删除特定记录
   */
  const removeFromHistory = (id: string) => {
    history.value = history.value.filter(item => item.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value));
    } catch (error) {
      console.error('更新搜索历史失败:', error);
    }
  };

  // 组件挂载时加载历史记录
  loadHistory();

  return {
    history: readonly(history),
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
}

/**
 * 获取语言颜色
 */
export function getLanguageColor(language: string | null): string {
  if (!language) return '#6b7280';
  return LANGUAGE_COLORS[language] || '#6b7280';
}

/**
 * 格式化数字显示
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

/**
 * 格式化日期显示
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return '今天';
  } else if (days === 1) {
    return '昨天';
  } else if (days < 30) {
    return `${days}天前`;
  } else if (days < 365) {
    return `${Math.floor(days / 30)}个月前`;
  } else {
    return `${Math.floor(days / 365)}年前`;
  }
}

/**
 * 获取热门仓库
 */
export function useTrendingRepos() {
  const trending = ref<ApiResponse<GitHubRepo[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchTrendingRepos = async (language: string = '', since: string = 'daily') => {
    trending.value.loading = true;
    trending.value.error = null;

    try {
      // 由于GitHub API没有直接的热门仓库接口，我们搜索最近创建的高星仓库
      let query = `created:>${getSinceDate(since)} stars:>10`;
      if (language) {
        query += ` language:${language}`;
      }

      const response = await fetch(
        `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=20`
      );

      if (!response.ok) {
        throw new Error(`获取热门仓库失败: ${response.status}`);
      }

      const searchResult: GitHubSearchResult<GitHubRepo> = await response.json();
      trending.value.data = searchResult.items;
    } catch (error) {
      trending.value.error = error instanceof Error ? error.message : '获取热门仓库失败';
      trending.value.data = null;
    } finally {
      trending.value.loading = false;
    }
  };

  /**
   * 获取时间范围的日期字符串
   */
  const getSinceDate = (since: string): string => {
    const now = new Date();
    switch (since) {
      case 'daily':
        now.setDate(now.getDate() - 1);
        break;
      case 'weekly':
        now.setDate(now.getDate() - 7);
        break;
      case 'monthly':
        now.setMonth(now.getMonth() - 1);
        break;
      default:
        now.setDate(now.getDate() - 1);
    }
    return now.toISOString().split('T')[0] || '';
  };

  return {
    trending: readonly(trending),
    fetchTrendingRepos,
  };
}

/**
 * 获取指定仓库信息
 */
export function useSpecificRepo() {
  const repo = ref<ApiResponse<GitHubRepo>>({
    data: null,
    loading: false,
    error: null,
  });

  /**
   * 获取指定仓库的详细信息
   * @param params 仓库参数（用户名和仓库名）
   */
  const fetchSpecificRepo = async (params: SpecificRepoParams): Promise<void> => {
    if (!params.owner.trim() || !params.repo.trim()) {
      repo.value.error = '请提供完整的用户名和仓库名';
      return;
    }

    repo.value.loading = true;
    repo.value.error = null;

    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${encodeURIComponent(params.owner)}/${encodeURIComponent(params.repo)}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('仓库不存在或无权访问');
        } else if (response.status === 403) {
          throw new Error('API请求限制，请稍后再试');
        } else {
          throw new Error(`请求失败: ${response.status}`);
        }
      }

      const repoData = await response.json();
      repo.value.data = repoData;
    } catch (error) {
      repo.value.error = error instanceof Error ? error.message : '获取仓库信息失败';
      repo.value.data = null;
    } finally {
      repo.value.loading = false;
    }
  };

  /**
   * 清除仓库信息
   */
  const clearSpecificRepo = (): void => {
    repo.value.data = null;
    repo.value.error = null;
  };

  return {
    repo: readonly(repo),
    fetchSpecificRepo,
    clearSpecificRepo,
  };
}

/**
 * 用户仓库快速查看功能
 */
export function useUserRepoQuickView() {
  const quickView = ref<UserRepoQuickView>({
    user: null as any,
    repos: [],
    totalCount: 0,
    loading: false,
    error: null,
  });

  /**
   * 快速查看用户仓库
   * @param username GitHub用户名
   * @param type 仓库类型
   * @param sort 排序方式
   * @param perPage 每页数量
   */
  const fetchUserRepoQuickView = async (
    username: string,
    type: RepoType = 'all',
    sort: RepoSortOption = 'stars',
    perPage: number = 30
  ): Promise<void> => {
    if (!username.trim()) {
      quickView.value.error = '请输入有效的用户名';
      return;
    }

    quickView.value.loading = true;
    quickView.value.error = null;

    try {
      // 获取用户信息
      const userResponse = await fetch(`${GITHUB_API_BASE}/users/${encodeURIComponent(username)}`);
      if (!userResponse.ok) {
        throw new Error(userResponse.status === 404 ? '用户不存在' : '获取用户信息失败');
      }
      const userData = await userResponse.json();

      // 获取仓库列表
      const sortParams: Record<string, string> = {
        stars: 'stars',
        forks: 'forks',
        updated: 'updated',
        created: 'created',
        name: 'name',
        size: 'size',
        issues: 'issues',
      };

      const reposResponse = await fetch(
        `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/repos?type=${type}&sort=${sortParams[sort]}&per_page=${perPage}`
      );

      if (!reposResponse.ok) {
        throw new Error('获取仓库列表失败');
      }

      const reposData = await reposResponse.json();

      quickView.value.user = userData;
      quickView.value.repos = reposData;
      quickView.value.totalCount = userData.public_repos;
    } catch (error) {
      quickView.value.error = error instanceof Error ? error.message : '获取用户仓库信息失败';
      quickView.value.user = null as any;
      quickView.value.repos = [];
      quickView.value.totalCount = 0;
    } finally {
      quickView.value.loading = false;
    }
  };

  /**
   * 清除快速查看数据
   */
  const clearQuickView = (): void => {
    quickView.value.user = null as any;
    quickView.value.repos = [];
    quickView.value.totalCount = 0;
    quickView.value.error = null;
  };

  return {
    quickView: readonly(quickView),
    fetchUserRepoQuickView,
    clearQuickView,
  };
}

/**
 * 仓库访问历史管理
 */
export function useRepoAccessHistory() {
  const STORAGE_KEY = 'github-repo-access-history';
  const history = ref<RepoAccessHistory[]>([]);

  /**
   * 加载访问历史
   */
  const loadHistory = (): void => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        history.value = JSON.parse(stored);
      }
    } catch (error) {
      console.error('加载仓库访问历史失败:', error);
    }
  };

  /**
   * 添加访问记录
   */
  const addToHistory = (repo: GitHubRepo): void => {
    const newRecord: RepoAccessHistory = {
      id: `${repo.owner.login}/${repo.name}`,
      owner: repo.owner.login,
      repo: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      accessedAt: Date.now(),
    };

    // 移除重复记录
    history.value = history.value.filter(item => item.id !== newRecord.id);

    // 添加到开头
    history.value.unshift(newRecord);

    // 保持最多20条记录
    if (history.value.length > 20) {
      history.value = history.value.slice(0, 20);
    }

    // 保存到本地存储
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value));
    } catch (error) {
      console.error('保存仓库访问历史失败:', error);
    }
  };

  /**
   * 清除访问历史
   */
  const clearHistory = (): void => {
    history.value = [];
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('清除仓库访问历史失败:', error);
    }
  };

  /**
   * 删除特定记录
   */
  const removeFromHistory = (id: string): void => {
    history.value = history.value.filter(item => item.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value));
    } catch (error) {
      console.error('更新仓库访问历史失败:', error);
    }
  };

  // 组件挂载时加载历史记录
  loadHistory();

  return {
    history: readonly(history),
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
}

/**
 * 仓库高级筛选功能
 */
export function useRepoFilters() {
  const filterOptions = ref<RepoFilterOptions>({});
  const sortDirection = ref<SortDirection>('desc');

  /**
   * 筛选仓库列表
   * @param repos 原始仓库列表
   * @param filters 筛选选项
   * @returns 筛选后的仓库列表
   */
  const filterRepos = (repos: GitHubRepo[], filters: RepoFilterOptions): GitHubRepo[] => {
    return repos.filter(repo => {
      // 语言筛选
      if (filters.language && repo.language !== filters.language) {
        return false;
      }

      // 归档状态筛选
      if (filters.archived !== undefined && repo.archived !== filters.archived) {
        return false;
      }

      // 星标数范围筛选
      if (filters.minStars !== undefined && repo.stargazers_count < filters.minStars) {
        return false;
      }
      if (filters.maxStars !== undefined && repo.stargazers_count > filters.maxStars) {
        return false;
      }

      // Fork数范围筛选
      if (filters.minForks !== undefined && repo.forks_count < filters.minForks) {
        return false;
      }
      if (filters.maxForks !== undefined && repo.forks_count > filters.maxForks) {
        return false;
      }

      // 更新时间筛选
      if (filters.updatedAfter) {
        const updatedAt = new Date(repo.updated_at);
        const afterDate = new Date(filters.updatedAfter);
        if (updatedAt < afterDate) {
          return false;
        }
      }
      if (filters.updatedBefore) {
        const updatedAt = new Date(repo.updated_at);
        const beforeDate = new Date(filters.updatedBefore);
        if (updatedAt > beforeDate) {
          return false;
        }
      }

      // 创建时间筛选
      if (filters.createdAfter) {
        const createdAt = new Date(repo.created_at);
        const afterDate = new Date(filters.createdAfter);
        if (createdAt < afterDate) {
          return false;
        }
      }
      if (filters.createdBefore) {
        const createdAt = new Date(repo.created_at);
        const beforeDate = new Date(filters.createdBefore);
        if (createdAt > beforeDate) {
          return false;
        }
      }

      // 主题标签筛选
      if (filters.topics && filters.topics.length > 0) {
        const hasTopic = filters.topics.some(topic =>
          repo.topics.includes(topic)
        );
        if (!hasTopic) {
          return false;
        }
      }

      return true;
    });
  };

  /**
   * 排序仓库列表
   * @param repos 仓库列表
   * @param sortBy 排序字段
   * @param direction 排序方向
   * @returns 排序后的仓库列表
   */
  const sortRepos = (
    repos: GitHubRepo[],
    sortBy: RepoSortOption,
    direction: SortDirection = 'desc'
  ): GitHubRepo[] => {
    const sorted = [...repos].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortBy) {
        case 'stars':
          aValue = a.stargazers_count;
          bValue = b.stargazers_count;
          break;
        case 'forks':
          aValue = a.forks_count;
          bValue = b.forks_count;
          break;
        case 'updated':
          aValue = new Date(a.updated_at).getTime();
          bValue = new Date(b.updated_at).getTime();
          break;
        case 'created':
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        case 'name':
          aValue = a.name.toLowerCase().charCodeAt(0);
          bValue = b.name.toLowerCase().charCodeAt(0);
          break;
        case 'size':
          aValue = a.size;
          bValue = b.size;
          break;
        case 'issues':
          aValue = a.open_issues_count;
          bValue = b.open_issues_count;
          break;
        default:
          return 0;
      }

      if (direction === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return sorted;
  };

  /**
   * 应用筛选和排序
   * @param repos 原始仓库列表
   * @param filters 筛选选项
   * @param sortBy 排序字段
   * @returns 处理后的仓库列表
   */
  const applyFiltersAndSort = (
    repos: GitHubRepo[],
    filters: RepoFilterOptions,
    sortBy: RepoSortOption,
    direction: SortDirection = 'desc'
  ): GitHubRepo[] => {
    let filtered = filterRepos(repos, filters);
    filtered = sortRepos(filtered, sortBy, direction);
    return filtered;
  };

  /**
   * 重置筛选选项
   */
  const resetFilters = (): void => {
    filterOptions.value = {};
    sortDirection.value = 'desc';
  };

  return {
    filterOptions: readonly(filterOptions),
    sortDirection: readonly(sortDirection),
    filterRepos,
    sortRepos,
    applyFiltersAndSort,
    resetFilters,
  };
}