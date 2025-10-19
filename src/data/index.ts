// 从 "@/type" 模块导入 AnimeArticle 类型定义和相关工具
import type { AnimeArticle } from "@/type";

// 定义一个常量 AnimeDates，其类型被指定为 AnimeArticle 对象的数组
const AnimeDates: AnimeArticle[] = [
    // 动漫卡片 - 刀剑神域
    {
        cardType: "anime",
        id: 1,
        title: "刀剑神域",
        img: "https://picgo-elaina.oss-cn-chengdu.aliyuncs.com/majotabi/202510061605255.jpg",
        content: "一部开创性的作品，将“虚拟现实”与“生存游戏”的概念带入主流视野。故事讲述了主角桐人被困在名为《Sword Art Online》的死亡游戏中，与同伴们为了生存而战。动画第一季的艾恩葛朗特篇以其华丽的战斗场面、流畅的动作设计以及桐人与亚丝娜之间动人的情感羁绊而备受赞誉。 尽管后续的“妖精之舞篇”因剧情节奏和反派塑造问题而引发争议，但该作无疑凭借其新颖的设定和出色的视觉表现在动漫史上留下了重要一笔。"
    },
    // 动漫卡片 - 罪恶王冠
    {
        cardType: "anime",
        id: 2,
        title: "罪恶王冠",
        img: "https://picgo-elaina.oss-cn-chengdu.aliyuncs.com/typora/202507280821191.jpg",
        content: "一部极具争议的作品，以其华丽的制作、神级的配乐和优秀的人设而闻名。 故事设定在近未来的东京，讲述了普通高中生樱满集意外获得“王的能力”，从此被卷入反抗组织与政府的斗争之中。该作由荒木哲郎执导，泽野弘之负责音乐，制作阵容强大。 尽管剧情因其“中二”的展开和后期走向而褒贬不一，但其出色的视听表现和主角在绝境中的成长与抉择，依然吸引了大量观众。"
    },
    // 动漫卡片 - 鬼灭之刃
    {
        cardType: "anime",
        id: 3,
        title: "鬼灭之刃",
        img: "https://picgo-elaina.oss-cn-chengdu.aliyuncs.com/majotabi/202510061605260.jpeg",
        content: "近年现象级的热血动漫，讲述了善良温柔的少年灶门炭治郎为让变成鬼的妹妹祢豆子恢复原状，而加入鬼杀队与恶鬼战斗的故事。 该作在人物塑造方面非常成功，无论是主角小队还是性格迥异的“柱”与“十二鬼月”，都给观众留下了深刻印象。 动画版凭借ufotable精良的制作，尤其是“那田蜘蛛山篇”的惊艳表现，将作品推向了新的高度，在全球范围内获得了广泛赞誉。"
    },
    // 动漫卡片 - 空之境界
    {
        cardType: "anime",
        id: 4,
        title: "空之境界",
        img: "https://picgo-elaina.oss-cn-chengdu.aliyuncs.com/majotabi/202510061605256.jpg",
        content: "由奈须蘑菇创作的奇幻小说改编而成的动画电影系列，以其晦涩深刻的剧情、独特的非线性叙事和浓厚的哲学思辨色彩而著称。 故事围绕着拥有“直死之魔眼”的少女两仪式展开，探讨了生死、人性、存在等宏大命题。 ufotable的精良制作与梶浦由记的完美配乐相结合，营造出压抑而华丽的都市氛围，使其成为一部需要反复品味才能完全理解的杰作。"
    },
    // 动漫卡片 - 进击的巨人
    {
        cardType: "anime",
        id: 5,
        title: "进击的巨人",
        img: "https://picgo-elaina.oss-cn-chengdu.aliyuncs.com/majotabi/202510061605261.png",
        content: "一部被认为是近年日本动画代表作之一的史诗级作品，在全球范围内获得了极高的评价。 故事最初描绘了人类为了生存对抗神秘巨人，但逐渐揭示了一个充满政治阴谋、种族冲突和人性拷问的复杂世界。 动画以其一流的制作、悲壮的故事情节、激动人心的动作场面和令人震惊的真相揭露而备受赞誉。 动画的结局在漫画的基础上进行了一些修改，获得了压倒性的正面评价。"
    },
    // 动漫卡片 - 紫罗兰永恒花园
    {
        cardType: "anime",
        id: 6,
        title: "紫罗兰永恒花园",
        img: "https://picgo-elaina.oss-cn-chengdu.aliyuncs.com/majotabi/202510061605257.png",
        content: "京都动画出品的视觉盛宴，以其无懈可击的精美作画和动人配乐而闻名。 故事讲述了在战争中作为“武器”长大的少女薇尔莉特，在战后成为“自动手记人偶”（代笔人），通过为他人书写信件，逐渐理解“爱”为何物的旅程。 动画以单元剧的形式展开，每一集都讲述一个感人至深的故事，细腻地描绘了人类的各种情感，是一部能触动心灵的治愈之作。"
    },
    // 动漫卡片 - 魔女之旅
    {
        cardType: "anime",
        id: 7,
        title: "魔女之旅",
        img: "https://picgo-elaina.oss-cn-chengdu.aliyuncs.com/majotabi/202510061605254.jpg",
        content: "一部以旅行为主轴的单元剧动画，讲述了天才魔女伊蕾娜在游历各国的奇妙见闻。 动画风格多变，时而轻松愉快，时而又会转入探讨人性黑暗面的深刻故事，这种明暗交织的叙事方式是其最大特色。 尽管部分黑暗情节的快速转变引发了一些争议，但作品凭借其独特的旅行者视角、精致的画面和对主角伊蕾娜细腻的心理描绘，获得了很多观众的喜爱。"
    }
];

// === 以下是补全了 content 字段的 ArticleDates ===

// 定义一个常量 ArticleDates，其类型被指定为 AnimeArticle 对象的数组
const ArticleDates: AnimeArticle[] = [
    // 文章卡片 1: 如何学习Vue.js框架
    {
        // 卡片类型为 "article"
        cardType: "article",
        // 唯一 ID
        id: 1,
        // 文章标题
        title: "如何学习Vue.js框架",
        // 文章简短描述
        des: "Vue.js是一个流行的JavaScript框架，用于构建用户界面和单页应用程序。本文将介绍如何学习Vue.js框架。",
        // 文章详细内容 (使用 Markdown 格式的模板字符串)
        content: `## 什么是 Vue.js？
Vue (发音为 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

## 学习路线图

### 1. 基础知识 (HTML, CSS, JavaScript)
在深入学习 Vue 之前，你必须对以下内容有扎实的理解：
* **HTML**: 网页的骨架。
* **CSS**: 网页的样式。
* **JavaScript (ES6+)**: 网页的行为。你需要熟悉变量、函数、对象、数组方法 (map, filter, reduce)、Promise 以及模块化 (import/export)。

### 2. Vue 核心概念
从官方文档开始，重点理解以下概念：
* **模板语法**: 插值（\\\`{{ }}\\\`）、指令 (如 \\\`v-if\\\`, \\\`v-for\\\`, \\\`v-bind\\\`, \\\`v-on\\\`)。
* **响应式基础**: \\\`ref\\\` 和 \\\`reactive\\\`。
* **计算属性 (Computed)**: 用于处理依赖其他响应式数据的复杂逻辑。
* **生命周期钩子**: \\\`onMounted\\\`, \\\`onUpdated\\\`, \\\`onUnmounted\\\` 等。
* **组件化**: 如何创建、注册和使用组件，以及父子组件通信 (Props 和 Events)。

### 3. Vue 生态系统
掌握核心后，开始探索 Vue 的生态：
* **Vue Router**: 官方的路由管理器，用于构建单页应用 (SPA)。
* **Pinia**: 官方推荐的状态管理库 (取代了 Vuex)。
* **Vue CLI / Vite**: 快速搭建项目的脚手架工具 (推荐 Vite)。

### 4. 实践项目
最好的学习方式是实践。尝试构建一个小型项目，例如：
* 一个待办事项列表 (Todo List)
* 一个简单的博客
* 一个连接公开 API (如天气 API) 的应用

## 结论
学习 Vue.js 是一个循序渐进的过程。不要急于求成，打好基础，多看官方文档，多加练习，你很快就能掌握它。`
    }, // 文章卡片 1 结束
    // 文章卡片 2: 前端性能优化技巧
    {
        // 卡片类型
        cardType: "article",
        // 唯一 ID
        id: 2,
        // 文章标题
        title: "前端性能优化技巧",
        // 文章简短描述
        des: "前端性能优化是提高网站用户体验的重要方面。本文将介绍一些前端性能优化的技巧。",
        // 文章详细内容
        content: `## 为什么前端性能如此重要？
在现代 Web 应用中，用户期望快速的加载时间和流畅的交互体验。如果页面加载缓慢或响应迟钝，用户很可能会失去耐心并离开。前端性能优化 (FPO) 是一系列旨在缩短页面加载时间、提高交互响应速度的技术和最佳实践。

## 关键优化策略

### 1. 减少请求和资源大小
* **图片优化**:
    * 使用现代格式 (如 WebP, AVIF) 替代 JPEG/PNG。
    * 根据显示区域调整图片大小。
    * 使用图片懒加载 (Lazy Loading)。
* **代码压缩**: 压缩 (Minify) JavaScript, CSS 和 HTML 文件，移除空格、注释和不必要的代码。
* **代码分割 (Code Splitting)**: 利用 Webpack、Vite 等工具，将代码分割成更小的块 (Chunks)，按需加载。

### 2. 优化关键渲染路径 (CRP)
* **CSS 优化**: 将关键 CSS (首屏所需的 CSS) 内联到 \\\`<head>\\\` 中，异步加载非关键 CSS。
* **JavaScript 优化**:
    * 使用 \\\`async\\\` 或 \\\`defer\\\` 属性异步加载脚本，避免阻塞 DOM 解析。
    * 将 \\\`<script>\\\` 标签放在 \\\`<body>\\\` 底部。

### 3. 利用浏览器缓存
* **HTTP 缓存**: 正确设置 \\\`Cache-Control\\\`, \\\`ETag\\\` 等响应头，让浏览器缓存静态资源。
* **CDN (内容分发网络)**: 将静态资源部署到 CDN，利用边缘节点加速全球用户的访问。

### 4. 减少重绘 (Repaint) 和回流 (Reflow)
* 避免频繁操作 DOM 样式。
* 使用 \\\`transform\\\` 和 \\\`opacity\\\` 进行动画，它们通常只触发合成 (Composite)，不触发回流或重绘。
* 使用 \\\`requestAnimationFrame\\\` 来执行动画更新。

## 监控与分析
优化不是一次性的工作。使用工具如 **Lighthouse**, **WebPageTest** 和 **Performance** (浏览器开发者工具) 来持续监控网站的性能指标 (如 LCP, FID, CLS)，并找到新的瓶颈。`
    }, // 文章卡片 2 结束
    // 文章卡片 3: 响应式设计基础
    {
        // 卡片类型
        cardType: "article",
        // 唯一 ID
        id: 3,
        // 文章标题
        title: "响应式设计基础",
        // 文章简短描述
        des: "响应式设计是一种设计方法，旨在使网站在各种设备和屏幕尺寸上都能良好显示。本文将介绍响应式设计的基础知识。",
        // 文章详细内容
        content: `## 什么是响应式设计？
响应式网页设计 (Responsive Web Design, RWD) 是一种网页设计方法，旨在使网页能够在各种设备上（从桌面电脑显示器到智能手机）提供最佳的查看和交互体验。网页会根据设备的屏幕尺寸、平台和方向自动调整布局。

## 响应式设计的三大核心

### 1. 流式布局 (Fluid Grids)
传统的固定宽度布局（如 \\\`width: 960px\\\`）在小屏幕上会导致内容被裁剪或出现水平滚动条。流式布局使用相对单位（如百分比 \\\`%\\\`）来定义元素的宽度。

**示例:**
\\\`\\\`\\\`css
/* 固定布局 */
.container {
  width: 960px;
  margin: 0 auto;
}

/* 流式布局 */
.container {
  width: 90%; /* 相对于父元素的宽度 */
  max-width: 1200px; /* 设置一个最大宽度，防止在大屏上过宽 */
  margin: 0 auto;
}
\\\`\\\`\\\`

### 2. 媒体查询 (Media Queries)
媒体查询是 CSS3 的一个模块，它允许我们根据设备的特性（最常用的是视口宽度）来应用不同的 CSS 样式。

**示例:**
\\\`\\\`\\\`css
/* 默认样式 (移动优先) */
.sidebar {
  width: 100%;
}

/* 当屏幕宽度大于等于 768px 时 */
@media (min-width: 768px) {
  .sidebar {
    width: 30%;
    float: right;
  }
  .content {
    width: 70%;
    float: left;
  }
}
\\\`\\\`\\\`

### 3. 弹性图片/媒体 (Flexible Images/Media)
为了防止图片或视频溢出其容器，我们可以设置它们的最大宽度为 100%。

**示例:**
\\\`\\\`\\\`css
img, video {
  max-width: 100%;
  height: auto; /* 保持宽高比 */
}
\\\`\\\`\\\`

## 移动优先 (Mobile First)
"移动优先"是一种设计策略，即先为小屏幕（如手机）设计布局和样式，然后再通过媒体查询逐步增强大屏幕的体验。这种方法有助于我们专注于核心内容，并确保在性能受限的移动设备上也能获得良好的体验。`
    }, // 文章卡片 3 结束
    // 文章卡片 4: JavaScript异步编程详解
    {
        // 卡片类型
        cardType: "article",
        // 唯一 ID
        id: 4,
        // 文章标题
        title: "JavaScript异步编程详解",
        // 文章简短描述
        des: "异步编程是现代JavaScript开发中的重要概念。本文将详细介绍JavaScript中的异步编程，包括回调函数、Promise和async/await。",
        // 文章详细内容
        content: `## 为什么需要异步编程？
JavaScript 是单线程的，这意味着它一次只能做一件事。如果一个任务（例如从服务器获取数据）需要很长时间，它将阻塞主线程，导致整个页面无响应（卡死）。异步编程允许我们在等待这些耗时任务完成时，继续执行其他代码。

## 异步编程的演进

### 1. 回调函数 (Callbacks)
最早的异步模式是使用回调函数。我们将一个函数 A 作为参数传递给另一个函数 B，当函数 B 完成某个异步操作后，它会调用函数 A。

\\\`\\\`\\\`javascript
// 示例：模拟网络请求
function fetchData(url, callback) {
  setTimeout(() => {
    // 模拟获取到的数据
    const data = { userId: 1, name: "Elaina" };
    callback(data); // 数据准备好后，调用回调函数
  }, 1000);
}

fetchData("/api/user/1", (data) => {
  console.log("数据已获取:", data);
});

console.log("代码继续执行...");
// 输出:
// "代码继续执行..."
// "数据已获取: { userId: 1, name: 'Elaina' }" (大约1秒后)
\\\`\\\`\\\`
**缺点**: 当多个异步操作相互依赖时，容易产生"回调地狱 (Callback Hell)"。

### 2. Promise
Promise 是 ES6 引入的，它是一个表示异步操作最终完成或失败的对象。它有三种状态：Pending（进行中）、Fulfilled（已成功）和 Rejected（已失败）。

\\\`\\\`\\\`javascript
function fetchData(url) {
  // Promise 接收一个执行器函数
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { userId: 1, name: "Elaina" };
      // 成功时调用 resolve
      resolve(data);
      // 失败时调用 reject
      // reject(new Error("网络错误"));
    }, 1000);
  });
}

fetchData("/api/user/1")
  .then(data => {
    // 处理成功的数据
    console.log("Promise 成功:", data);
    return fetchData("/api/posts/" + data.userId); // 链式调用
  })
  .then(posts => {
    console.log("获取到帖子:", posts);
  })
  .catch(error => {
    // 统一处理错误
    console.error("Promise 失败:", error);
  });
\\\`\\\`\\\`
Promise 通过 \\\`.then()\\\` 链式调用解决了回调地狱的问题。

### 3. Async/Await (ES7)
Async/Await 是建立在 Promise 之上的语法糖，它允许我们用更像同步代码的方式来编写异步代码。

* \\\`async\\\`: 放在函数声明前，表示该函数是一个异步函数（它会隐式返回一个 Promise）。
* \\\`await\\\`: 只能用在 \\\`async\\\` 函数内部，它会"暂停"函数的执行，等待 \\\`await\\\` 后面的 Promise 完成，然后返回 Promise 的结果。

\\\`\\\`\\\`javascript
// 假设 fetchData 同样返回 Promise
async function loadUserData() {
  try {
    console.log("开始加载数据...");
    // 等待 fetchData 完成
    const data = await fetchData("/api/user/1");
    console.log("获取到用户:", data);

    // 等待下一个请求完成
    const posts = await fetchData("/api/posts/" + data.userId);
    console.log("获取到帖子:", posts);

    console.log("所有数据加载完毕。");
  } catch (error) {
    // 异步函数中的 Promise.reject 会被 try...catch 捕获
    console.error("加载失败:", error);
  }
}

loadUserData();
\\\`\\\`\\\`
Async/Await 是目前处理异步操作最清晰、最推荐的方式。`
    }, // 文章卡片 4 结束

    // === 以下是补全了 content 的新数据 ===

    // 文章卡片 5: Git入门到精通
    {
        // 卡片类型
        cardType: "article",
        // 唯一 ID
        id: 5,
        // 文章标题
        title: "Git入门到精通",
        // 文章简短描述
        des: "Git是目前最流行的分布式版本控制系统。本文将带你从入门到精通Git的使用。",
        // 文章详细内容
        content: `## 什么是 Git？
Git 是一个免费、开源的**分布式版本控制系统**。它被设计用来快速高效地处理从小型到非常大型的项目的所有事务。与 SVN 等集中式版本控制系统不同，Git 是分布式的，每个开发者的电脑上都有一个完整的代码仓库。

## 核心概念
* **Repository (仓库)**: 你的项目。它可以存在于本地，也可以存在于远程服务器（如 GitHub, GitLab）。
* **Commit (提交)**: 你对代码的一次"快照"或"保存点"。
* **Branch (分支)**: 一个独立的开发线。默认分支通常是 \\\`main\\\` 或 \\\`master\\\`。
* **Merge (合并)**: 将一个分支的更改合并到另一个分支。
* **Workspace (工作区)**: 你实际修改文件的目录。
* **Index (暂存区)**: 介于工作区和本地仓库之间的一个区域，用于存放你"准备提交"的更改。

## 常用 Git 命令

### 1. 初始化和克隆
\\\`\\\`\\\`bash
# 在当前目录初始化一个新的 Git 仓库
git init

# 从远程 URL 克隆一个仓库到本地
git clone https://github.com/user/repo.git
\\\`\\\`\\\`

### 2. 基本工作流
\\\`\\\`\\\`bash
# 查看当前仓库状态 (哪些文件被修改了？)
git status

# 将指定文件的更改添加到暂存区
git add <file-name>
# (或者) 将所有更改添加到暂存区
git add .

# 将暂存区的更改提交到本地仓库，并附带一条信息
git commit -m "你的提交信息"
\\\`\\\`\\\`

### 3. 分支操作
\\\`\\\`\\\`bash
# 查看所有分支
git branch

# 创建一个名为 "feature/new-login" 的新分支
git branch feature/new-login

# 切换到指定分支
git checkout feature/new-login
# (或者) 创建并立即切换到新分支
git checkout -b feature/new-login

# 将 "feature/new-login" 分支合并到当前分支 (假设当前在 main)
git merge feature/new-login

# 删除本地分支
git branch -d feature/new-login
\\\`\\\`\\\`

### 4. 远程同步
\\\`\\\`\\\`bash
# 查看配置的远程仓库 (通常是 origin)
git remote -v

# 从远程仓库拉取最新的更改 (但暂不合并)
git fetch origin

# 拉取远程分支的更改并合并到当前本地分支 (等于 fetch + merge)
git pull origin main

# 将本地的提交推送到远程仓库
git push origin main
\\\`\\\`\\\`

## 总结
Git 功能强大，但初学者只需掌握上述基本命令即可应对日常开发。熟练使用分支是团队协作的关键。`
    }, // 文章卡片 5 结束
    // 文章卡片 6: React Hooks 深度解析
    {
        // 卡片类型
        cardType: "article",
        // 唯一 ID
        id: 6,
        // 文章标题
        title: "React Hooks 深度解析",
        // 文章简短描述
        des: "Hooks是React 16.8引入的新特性，它彻底改变了React组件的编写方式。本文将深度解析Hooks的原理和用法。",
        // 文章详细内容
        content: `## 为什么需要 Hooks？
在 React 16.8 之前，我们主要使用**类组件 (Class Components)** 来管理 state 和生命周期方法。函数组件 (Functional Components) 通常是无状态的。Hooks 的出现，使得我们**可以在函数组件中使用 state 以及其他 React 特性**。

Hooks 解决了类组件带来的一些问题：
1.  **逻辑复用困难**: 高阶组件 (HOC) 和 Render Props 模式会导致组件层级嵌套过深。
2.  **"地狱"般的生命周期**: 复杂的组件中，相关逻辑（如事件订阅和取消）被拆分到 \\\`componentDidMount\\\` 和 \\\`componentWillUnmount\\\` 中，难以维护。
3.  **类组件的困惑**: \\\`this\\\` 的指向、\\\`bind\\\` 的使用对初学者不友好。

## 核心 Hooks 介绍

### 1. \\\`useState\\\` (状态 Hook)
允许你在函数组件中添加 state。

\\\`\\\`\\\`jsx
import React, { useState } from 'react';

function Counter() {
  // 声明一个名为 count 的 state 变量，和更新它的函数 setCount
  // 0 是初始值
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* 调用 setCount 来更新 state */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\\\`\\\`\\\`

### 2. \\\`useEffect\\\` (副作用 Hook)
用于处理副作用，如数据获取、DOM 操作、设置订阅等。它模拟了类组件中的 \\\`componentDidMount\\\`, \\\`componentDidUpdate\\\`, 和 \\\`componentWillUnmount\\\`。

\\\`\\\`\\\`jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // useEffect 接收一个函数，该函数在组件渲染后执行
  useEffect(() => {
    // 异步获取数据
    async function fetchUser() {
      const response = await fetch(\\\`/api/users/\\\${userId}\\\`);
      const data = await response.json();
      setUser(data);
    }

    fetchUser();

    // 依赖项数组: [userId]
    // 只有当 userId 发生变化时，这个 effect 才会重新执行
  }, [userId]);

  // 如果 useEffect 返回一个函数，该函数将在组件卸载时执行 (用于清理)
  useEffect(() => {
    const subscription = ...;
    return () => {
      // 清理订阅
      subscription.unsubscribe();
    };
  }, []); // 空数组表示只在挂载时执行一次

  if (!user) {
    return 'Loading...';
  }

  return <h1>{user.name}</h1>;
}
\\\`\\\`\\\`

## Hooks 的规则
Hooks 只能在**函数组件的顶层**或**自定义 Hook** 中调用。
1.  **不要在循环、条件或嵌套函数中调用 Hook**。这确保了 Hooks 在每次渲染时都以相同的顺序被调用，React 才能正确地在多次 \\\`useState\\\` 和 \\\`useEffect\\\` 调用之间保持 state 的连续性。
2.  **只能在 React 函数组件中调用 Hook**。

## 其他常用 Hooks
* \\\`useContext\\\`: 访问 React Context，避免层层传递 props。
* \\\`useReducer\\\`: \\\`useState\\\` 的替代方案，用于管理复杂的 state 逻辑。
* \\\`useCallback\\\`: 缓存函数实例，用于性能优化。
* \\\`useMemo\\\`: 缓存计算结果，用于性能优化。
* \\\`useRef\\\`: 访问 DOM 节点或存储可变的实例值。`
    }, // 文章卡片 6 结束
    // 文章卡片 7: TypeScript 实践指南
    {
        // 卡片类型
        cardType: "article",
        // 唯一 ID
        id: 7,
        // 文章标题
        title: "TypeScript 实践指南",
        // 文章简短描述
        des: "TypeScript是JavaScript的超集，它添加了静态类型。本文将分享在项目中使用TypeScript的最佳实践。",
        // 文章详细内容
        content: `## 为什么选择 TypeScript？
TypeScript (TS) 是 JavaScript (JS) 的超集，它为 JS 添加了**静态类型**。浏览器不认识 TS，它最终会被编译成纯 JS。

使用 TS 的主要好处：
1.  **提早发现错误**: 许多在运行时才会暴露的 bug（如 \\\`TypeError: undefined is not a function\\\`）在编码阶段就能被 TS 的类型检查器发现。
2.  **更好的代码提示和重构**: IDE (如 VSCode) 能基于类型提供精确的自动补全、定义跳转和安全的重命名。
3.  **更强的可维护性**: 类型就像是代码的"文档"，使得大型项目和团队协作更加容易。

## 核心概念与实践

### 1. 基础类型
\\\`\\\`\\\`typescript
let isDone: boolean = false;
let count: number = 10;
let framework: string = "React";
let list: number[] = [1, 2, 3];
// (或者) 使用泛型
let listAlt: Array<number> = [1, 2, 3];

// any: 放弃类型检查 (应尽量避免使用)
let notSure: any = 4;
notSure = "maybe a string";

// unknown: 安全的 any。在操作前必须进行类型检查
let value: unknown;
if (typeof value === 'string') {
  console.log(value.toUpperCase());
}
\\\`\\\`\\\`

### 2. 接口 (Interface) 和类型别名 (Type)
\\\`Interface\\\` 和 \\\`Type\\\` 都可以用来定义对象的结构。

\\\`\\\`\\\`typescript
// 接口 (Interface)
interface User {
  id: number;
  name: string;
  // 可选属性
  age?: number;
  // 只读属性
  readonly email: string;
}

// 类型别名 (Type)
type Point = {
  x: number;
  y: number;
};

// 实践：
// - 优先使用 Interface 来描述对象、类。
// - 优先使用 Type 来描述联合类型、元组或复杂的非对象类型。

// 联合类型
type Status = "pending" | "success" | "error";
\\\`\\\`\\\`

### 3. 函数类型
为函数的参数和返回值添加类型。

\\\`\\\`\\\`typescript
// (a: number, b: number) => number
function add(a: number, b: number): number {
  return a + b;
}

// 箭头函数
const subtract = (a: number, b: number): number => {
  return a - b;
};

// void: 表示函数没有返回值
function logMessage(message: string): void {
  console.log(message);
}
\\\`\\\`\\\`

### 4. 泛型 (Generics)
泛型用于创建可重用的组件，这些组件可以处理多种类型的数据，而不是单一类型。

\\\`\\\`\\\`typescript
// T 是一个类型变量
function identity<T>(arg: T): T {
  return arg;
}

// 调用时，可以显式指定类型
let output = identity<string>("myString");
// (或者) TS 会自动进行类型推断
let output2 = identity(100);

// 在 React 中使用泛型 (例如 useState)
// const [user, setUser] = useState<User | null>(null);
\\\`\\\`\\\`

## 渐进式迁移
你不需要一次性将整个项目重写为 TS。可以从修改文件后缀（\\\`.js\\\` -> \\\`.ts\\\`）开始，并逐步为关键模块添加类型。利用 \\\`tsconfig.json\\\` 中的 \\\`"strict": true\\\` 开启最严格的检查，是保证代码质量的最佳实践。`
    } // 文章卡片 7 结束

]; // ArticleDates 数组定义结束

// 关于页面数据接口定义
interface AboutData {
    // 个人信息
    personal: {
        name: string;
        avatar: string;
        title: string;
        subtitle: string;
        description: string;
        backgroundImage: string;
    };

    // 项目信息
    project: {
        title: string;
        subtitle: string;
        vision: {
            title: string;
            content: string[];
        };
        coreValues: {
            title: string;
            values: string[];
        };
    };

    // 功能模块
    features: Array<{
        title: string;
        description: string;
        gradient: string;
        icon: string;
    }>;

    // 技术栈
    techStack: Array<{
        name: string;
        description: string;
        color: string;
    }>;

    // 个人特色
    personalFeatures: {
        title: string;
        subtitle: string;
        animeHobby: {
            title: string;
            content: string[];
        };
        techPursuit: {
            title: string;
            content: string[];
        };
        conceptIntegration: {
            title: string;
            concepts: Array<{
                number: string;
                title: string;
                description: string;
            }>;
        };
    };

    // 联系方式
    contact: {
        title: string;
        subtitle: string;
        methods: Array<{
            type: string;
            title: string;
            value: string;
            icon: string;
        }>;
        farewell: {
            main: string;
            sub: string;
        };
    };
}

// 关于页面数据
const aboutData: AboutData = {
    // 个人信息
    personal: {
        name: "Elari's Blog",
        avatar: "https://picgo-elaina.oss-cn-chengdu.aliyuncs.com/typora/202510111541510.jpg",
        title: "Elari's Blog",
        subtitle: "动漫爱好者 | 全栈开发者 | 内容创作者",
        description: "欢迎来到我的数字世界！这里是技术与创意的交汇点，动漫文化与代码艺术的融合空间。\n我致力于打造一个既有趣又有价值的综合性内容平台。",
        backgroundImage: "https://picgo-elaina.oss-cn-chengdu.aliyuncs.com/majotabi/202510061605258.jpeg"
    },

    // 项目信息
    project: {
        title: "关于 MiniToy",
        subtitle: "一个融合动漫文化与技术创新的综合性个人博客平台",
        vision: {
            title: "项目愿景",
            content: [
                "MiniToy 不仅仅是一个技术博客，它是我对美好数字生活的向往和实践。\n在这里，我希望将二次元的美好与三次元的技术完美融合，\n创造出一个既有趣味性又有知识性的内容空间。",
                "无论是动漫作品的深度解析，还是技术问题的详细讲解，\n我都力求以最高的标准和最真诚的态度来对待每一篇内容。"
            ]
        },
        coreValues: {
            title: "核心理念",
            values: [
                "内容质量优先，每篇文章都经过精心打磨",
                "技术分享与兴趣表达并重",
                "持续学习，持续分享，持续进步",
                "构建温暖友好的技术交流社区"
            ]
        }
    },

    // 功能模块
    features: [
        {
            title: "首页",
            description: "精选内容展示，为你推荐最优质的动漫作品和技术文章",
            gradient: "from-orange-400 to-pink-500",
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        },
        {
            title: "番剧",
            description: "深度动漫解析，分享观后感和作品推荐",
            gradient: "from-purple-500 to-indigo-600",
            icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
            title: "文章",
            description: "技术分享与学习笔记，记录成长轨迹",
            gradient: "from-green-500 to-teal-600",
            icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        },
        {
            title: "工具",
            description: "实用工具集合，提高开发效率",
            gradient: "from-blue-500 to-cyan-600",
            icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        },
        {
            title: "聊天",
            description: "AI智能助手，随时为你答疑解惑",
            gradient: "from-pink-500 to-rose-600",
            icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        },
        {
            title: "关于",
            description: "了解更多关于我和这个项目的信息",
            gradient: "from-sky-500 to-blue-600",
            icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        }
    ],

    // 技术栈
    techStack: [
        {
            name: "Vue.js",
            description: "渐进式JavaScript框架，提供响应式数据绑定和组件化开发",
            color: "text-green-500"
        },
        {
            name: "TS",
            description: "JavaScript的超集，提供静态类型检查和更好的开发体验",
            color: "text-blue-500"
        },
        {
            name: "TW",
            description: "实用优先的CSS框架，快速构建现代化用户界面",
            color: "text-cyan-500"
        },
        {
            name: "⚡",
            description: "下一代前端构建工具，提供极速的开发体验",
            color: "text-purple-500"
        }
    ],

    // 个人特色
    personalFeatures: {
        title: "个人特色",
        subtitle: "动漫文化与技术的完美融合",
        animeHobby: {
            title: "🎌 动漫爱好",
            content: [
                "从《刀剑神域》到《进击的巨人》，动漫不仅是娱乐，更是一种艺术形式和情感载体。\n我喜欢深入分析作品的内涵，分享观后感，与同好交流心得。",
                "每一部优秀的动漫作品都值得被认真对待，它们承载着创作者的心血和对美好生活的向往。"
            ]
        },
        techPursuit: {
            title: "💻 技术追求",
            content: [
                "全栈开发是我的职业，也是我的热情所在。从前端交互到后端架构，\n从数据库设计到部署运维，我享受着用技术解决问题的过程。",
                "持续学习新技术，追求代码的优雅和效率，致力于创造有价值的产品。"
            ]
        },
        conceptIntegration: {
            title: "🌟 理念融合",
            concepts: [
                {
                    number: "01",
                    title: "创意驱动",
                    description: "动漫的创意思维启发技术创新，技术的实现能力让创意变为现实"
                },
                {
                    number: "02",
                    title: "精益求精",
                    description: "像对待动漫作品一样对待代码，追求每一个细节的完美"
                },
                {
                    number: "03",
                    title: "分享精神",
                    description: "乐于分享知识和技术，与社区一起成长和进步"
                }
            ]
        }
    },

    // 联系方式
    contact: {
        title: "联系我",
        subtitle: "如果你有任何问题、建议或想要交流，欢迎随时联系我",
        methods: [
            {
                type: "邮箱",
                title: "邮箱",
                value: "elari@example.com",
                icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            },
            {
                type: "GitHub",
                title: "GitHub",
                value: "@elari-dev",
                icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            },
            {
                type: "社交媒体",
                title: "社交媒体",
                value: "@elari_blog",
                icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            }
        ],
        farewell: {
            main: "感谢你访问我的个人博客！",
            sub: "无论是技术交流、动漫讨论，还是简单的打招呼，我都非常期待听到你的声音。\n让我们一起在这个数字世界里创造更多精彩！"
        }
    }
};

// 导出 AnimeDates、ArticleDates 和 aboutData 常量，以便在其他模块中导入和使用
export { AnimeDates, ArticleDates, aboutData };