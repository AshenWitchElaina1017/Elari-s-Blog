/**
 * @file: GitHub相关类型定义
 * @description: 定义GitHub API返回数据的TypeScript类型
 */

// GitHub用户基本信息接口
export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  email: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  html_url: string;
  repos_url: string;
  followers_url: string;
  following_url: string;
}

// GitHub仓库接口
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  fork: boolean;
  html_url: string;
  clone_url: string;
  ssh_url: string;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  default_branch: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  topics: string[];
  license: {
    key: string;
    name: string;
    spdx_id: string;
  } | null;
  homepage: string | null;
  archived: boolean;
  disabled: boolean;
}

// GitHub搜索结果接口
export interface GitHubSearchResult<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

// API响应状态接口
export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// 搜索历史接口
export interface SearchHistory {
  id: string;
  query: string;
  type: 'user' | 'repo' | 'user-repo';
  timestamp: number;
}

// 仓库排序选项
export type RepoSortOption =
  | 'stars'
  | 'forks'
  | 'updated'
  | 'created'
  | 'name'
  | 'size'
  | 'issues';

// 排序方向
export type SortDirection = 'asc' | 'desc';

// 搜索类型选项
export type SearchType = 'user' | 'repo' | 'user-repo';

// 仓库类型选项
export type RepoType = 'all' | 'owner' | 'member';

// 仓库筛选选项接口
export interface RepoFilterOptions {
  language?: string | null;
  type?: RepoType;
  minStars?: number;
  maxStars?: number;
  minForks?: number;
  maxForks?: number;
  updatedAfter?: string;
  updatedBefore?: string;
  createdAfter?: string;
  createdBefore?: string;
  topics?: string[];
  archived?: boolean;
}

// 仓库访问历史接口
export interface RepoAccessHistory {
  id: string;
  owner: string;
  repo: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  accessedAt: number;
}

// 用户仓库快速查看数据结构
export interface UserRepoQuickView {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalCount: number;
  loading: boolean;
  error: string | null;
}

// 指定仓库访问参数
export interface SpecificRepoParams {
  owner: string;
  repo: string;
}

// 分页参数接口
export interface PaginationParams {
  page: number;
  perPage: number;
}

// 分页响应接口
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 语言颜色映射
export interface LanguageColors {
  [key: string]: string;
}