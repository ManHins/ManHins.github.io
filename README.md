# ManHins 的个人小站

基于 [Nuxt Portfolio](https://github.com/nuxt-ui-templates/portfolio) 改造的中文静态个人网站。
Nuxt 4 + Vue 3 + Nuxt UI + Nuxt Content，部署至 GitHub Pages，无需后端。

## 本地开发

使用 Node.js 24 和 pnpm 11.19.0：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## 检查与构建

```sh
pnpm typecheck
pnpm generate
node scripts/check-static.mjs
```

静态文件在 `.output/public`，需要 HTTP 静态服务器预览，不要用 file:// 直接打开。

## GitHub Pages 发布

1. 在 ManHins 账号新建公开仓库 `ManHins.github.io`，把本项目推送到 main 分支。
2. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
3. 推送 main 或在 Actions 手动运行 **Deploy to GitHub Pages**。
4. 发布地址为 https://manhins.github.io/ 。

Workflow 自动使用 Pages 提供的 base path，也可用于普通项目仓库的子路径。
只部署 `.output/public`，不部署服务端构建文件、源代码环境变量或 node_modules。

## 修改内容

- **照片与公开项目**：编辑 `app/data/site.ts`。目前照片是明确标注的模板示例影像，并非本人摄影作品。
- **摄影作品**：将照片放到 `public/photos/`，更新 photos 数组的 src、title、category、alt，设置 demo: false；同时更新首页和摄影页的示例说明。
- **文章**：在 `content/journal/` 添加 Markdown 文件，包含 title、description、date（引号包裹的 YYYY-MM-DD）、category。
- **简历**：将 PDF 放到 `public/`，在 `app/data/site.ts` 的 resumeFile 填写文件名；更新关于页面的说明。
- **主页文案**：`app/pages/index.vue`。
- **视觉样式**：`app/assets/css/main.css`。
- **工具**：`app/pages/lab.vue`。JSON 数据不会上传；计时器使用真实截止时间，切换标签页后会校准剩余时间。

目前没有填入虚构的学历、工作经历、联系方式或个人摄影作品。

## 许可与来源

原模板使用 MIT 许可，保留于 LICENSE。版式与示例影像来自原模板。
照片替换成个人作品后，应保留自己的摄影版权说明。
