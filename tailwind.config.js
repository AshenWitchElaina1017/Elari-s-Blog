/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // 针对 Tailwind CSS 4 的特殊配置
  future: {
    hoverOnlyWhenSupported: true,
  },
  // 确保外部资源可以被正确处理
  safelist: [
    // 这里可以添加需要确保生成的类名
    'bg-cover',
    'bg-center',
    'bg-no-repeat',
    'min-h-screen',
  ]
}