# HelloTab

一个现代化的新标签页替代方案，提供个性化的浏览体验和丰富的小部件功能。

## 特性

- 🎨 美观的用户界面
- 🔄 可自定义的小部件系统
- 🌤️ 天气信息显示
- 🕒 时钟显示
- 📅 日历集成
- 🔍 快速搜索功能
- 🌐 自定义网站收藏
- ☁️ WebDAV同步支持

## Todo List

- [ ] 增加更多的实用小组件
- [ ] 移动端支持
- [ ] 国际化支持

## 技术栈

- [Nuxt 3](https://nuxt.com/) - Vue.js框架
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [Pinia](https://pinia.vuejs.org/) - 状态管理

## 快速开始

### 安装依赖

```bash
bun install
# 或
npm install
```
### 配置

在项目根目录下创建 `.env` 文件，并添加以下配置：
```bash
NUXT_QWEATHER_API_KEY="你的和风天气API密钥"
NUXT_GLM_API_KEY="你的智谱API密钥"
```

### 开发环境

```bash
bun dev
# 或
npm run dev
```

### 生产环境构建

```bash
bun run build
# 或
npm run build
```

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

本项目采用 LGPL 许可证。