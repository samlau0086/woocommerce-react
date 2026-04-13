# Headless WooCommerce Storefront

这是一个基于 React, Vite 和 Tailwind CSS 构建的现代化 WooCommerce 无头电商前端 (Headless Storefront)。

## 🚀 部署说明 (Deployment Guide)

要让这个前端项目正常运行，你需要一个配置好的 WordPress 后端。请按照以下步骤进行配置：

### 1. WordPress 后端准备
确保你的 WordPress 网站已经安装并激活了以下插件：
*   **WooCommerce**: 核心电商插件。
*   **JWT Authentication for WP-REST API**: 用于处理用户登录和注册的 JWT 认证。
*   **Contact Form 7**: 用于“联系我们 (Contact Us)”页面和底部订阅的表单提交。

### 2. WooCommerce REST API 配置
1. 登录 WordPress 后台。
2. 导航到 **WooCommerce > 设置 (Settings) > 高级 (Advanced) > REST API**。
3. 点击 **添加密钥 (Add key)**。
4. 填写描述（例如：React Storefront），选择一个用户，并将**权限 (Permissions)** 设置为 **读/写 (Read/Write)**。
5. 点击生成 API 密钥。
6. **重要**：请妥善保存生成的 **Consumer Key (`ck_...`)** 和 **Consumer Secret (`cs_...`)**，稍后会用到。

### 3. JWT Auth 插件配置
为了让用户能够登录和注册，你需要配置 JWT 插件。
1. 打开 WordPress 根目录下的 `wp-config.php` 文件。
2. 添加以下代码（请将 `your-top-secret-key` 替换为一个随机的复杂字符串）：
   ```php
   define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key');
   define('JWT_AUTH_CORS_ENABLE', true);
   ```
3. 确保你的 WordPress 固定链接 (Permalinks) 设置为 **文章名 (Post name)**（在 设置 > 固定链接 中修改），这是 WP REST API 正常工作的前提。

### 4. Contact Form 7 配置
1. 在 WordPress 后台导航到 **联系 (Contact) > 联系表单 (Contact Forms)**。
2. 创建一个新的表单或使用默认表单。
3. 记下该表单的 **ID**（可以在表单列表的短代码中找到，例如 `[contact-form-7 id="5" title="Contact form 1"]` 中的 `5`）。
4. 如果你有底部订阅表单，请同样记下它的 ID。
5. **注意**：前端代码已经自动处理了 CF7 REST API 必需的 `_wpcf7` 和 `_wpcf7_unit_tag` 隐藏字段，你只需要配置正确的 ID 即可。

### 5. 环境变量配置 (Environment Variables)
在前端项目的根目录下创建一个 `.env` 文件（或在 AI Studio 的 Secrets 面板中配置），并填入以下环境变量：

```env
# 你的 WordPress 网站地址 (不要以斜杠结尾)
VITE_WP_API_URL="https://your-wordpress-site.com"

# WooCommerce REST API 密钥
VITE_WC_CONSUMER_KEY="ck_your_consumer_key_here"
VITE_WC_CONSUMER_SECRET="cs_your_consumer_secret_here"

# Contact Form 7 的表单 ID
VITE_CF7_FORM_ID="5"
VITE_CF7_NEWSLETTER_ID="6"
```

### 6. 运行项目
完成以上配置后，你可以启动前端项目：

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🌐 关于跨域 (CORS) 与 API 请求
本项目内置了一个自定义的 `apiFetch` 拦截器。为了避免严格的 CORS 预检请求 (OPTIONS) 导致请求被拦截，前端在发出所有 API 请求时，会自动在 URL 末尾追加 `?react-headless=true` 查询参数，而不是使用自定义 HTTP Header。
这确保了前端可以直接与你的 WordPress 后端通信，而无需在服务器端修改 Nginx/Apache 的 CORS 规则。

## ☁️ 部署到 Cloudflare Pages (Deploying to Cloudflare Pages)

本项目非常适合部署到 Cloudflare Pages。你可以选择在 Cloudflare 控制台直接关联 GitHub 仓库，或者使用 GitHub Actions 进行自动化部署。

### 选项 1：直接关联 GitHub (推荐，最简单)

1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)。
2. 导航到 **Workers & Pages** > **创建应用程序 (Create application)** > **Pages** > **连接到 Git (Connect to Git)**。
3. 选择你的 GitHub 仓库。
4. 配置构建设置 (Build settings)：
   - **框架预设 (Framework preset):** None (或者选择 Vite 如果有)
   - **构建命令 (Build command):** `npm run build`
   - **构建输出目录 (Build output directory):** `dist`
5. 展开 **环境变量 (Environment variables (advanced))**，添加你的 WordPress 和 WooCommerce 配置：
   - `VITE_WP_API_URL`
   - `VITE_WC_CONSUMER_KEY`
   - `VITE_WC_CONSUMER_SECRET`
   - `VITE_CF7_FORM_ID`
   - `VITE_CF7_NEWSLETTER_ID`
6. 点击 **保存并部署 (Save and Deploy)**。

### 选项 2：使用 GitHub Actions 自动化工作流部署

如果你希望通过 GitHub Actions 来完全控制部署流程，请按照以下步骤操作：

#### 1. 获取 Cloudflare 凭证
- **Account ID:** 在 Cloudflare 控制台右侧边栏可以找到你的账户 ID。
- **API Token:** 点击右上角头像 > **我的个人资料 (My Profile)** > **API 令牌 (API Tokens)** > **创建令牌 (Create Token)**。选择 "编辑 Cloudflare Workers" 模板，或者创建一个自定义令牌，赋予 `Account.Pages:Edit` 权限。

#### 2. 配置 GitHub Secrets 和 Variables
进入你的 GitHub 仓库，点击 **Settings** > **Secrets and variables** > **Actions**。

**添加至 Secrets (敏感信息):**
- `CLOUDFLARE_ACCOUNT_ID`: 你的 Cloudflare 账户 ID。
- `CLOUDFLARE_API_TOKEN`: 你的 Cloudflare API 令牌。
- `VITE_WC_CONSUMER_KEY`: Woocommerce Consumer Key
- `VITE_WC_CONSUMER_SECRET`: Woocommerce Consumer Secret

**添加至 Variables (公开配置):**
- `VITE_WP_API_URL`: 你的 Wordpress网站URL(如https://example.com)
- `VITE_CF7_FORM_ID`: 联系表单 ID
- `VITE_CF7_NEWSLETTER_ID`: 订阅表单 ID

#### 3. 创建 Workflow 文件
在你的项目根目录下，已经存在一个名为 `.github/workflows/cloudflare-pages.yml` 的文件，内容如下。你只需要修改 `projectName` 为你自己的项目名即可：

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main # 如果您的主分支是 master，请修改为 master

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20' # 升级到 Node 20，自带的新版 npm 修复了该可选依赖 bug

      - name: Install dependencies
        run: |
          rm -rf package-lock.json node_modules
          npm install --include=optional

      - name: Build project
        run: npm run build
        env:
          # 在这里注入构建时需要的环境变量
          VITE_WP_API_URL: ${{ vars.VITE_WP_API_URL }}
          VITE_CF7_FORM_ID: ${{ vars.VITE_CF7_FORM_ID }}
          VITE_CF7_NEWSLETTER_ID: ${{ vars.VITE_CF7_NEWSLETTER_ID }}
          VITE_WC_CONSUMER_KEY: ${{ secrets.VITE_WC_CONSUMER_KEY }}
          VITE_WC_CONSUMER_SECRET: ${{ secrets.VITE_WC_CONSUMER_SECRET }}

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: 'your-project-name' # ⚠️ 请替换为您在 Cloudflare Pages 上创建的项目名称
          directory: 'dist' # Vite 默认的打包输出目录
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

每次你将代码推送到 `main` 分支时，GitHub Actions 就会自动构建项目并将其部署到 Cloudflare Pages。

## ❓ 常见问题与故障排除 (FAQ & Troubleshooting)

### 1. 线上部署后提交表单报错："The requested contact form was not found."
**原因**：Vite 是在**打包构建（Build）**时将环境变量静态注入到前端代码中的。如果线上打包时没有读取到 `VITE_CF7_FORM_ID`，代码就会使用默认的 fallback 值（ID 为 1），从而导致 WordPress 找不到表单。

**解决方法**：
你需要确保环境变量已正确配置，**并且重新触发一次构建部署**。

*   **如果你使用 Cloudflare Pages 直接关联 GitHub**：
    1. 进入 Cloudflare 控制台 -> 你的项目 -> **设置 (Settings)** -> **环境变量 (Environment variables)**。
    2. 确保已添加 `VITE_CF7_FORM_ID` 和 `VITE_CF7_NEWSLETTER_ID`。
    3. **关键步骤**：回到 **部署 (Deployments)** 页面，点击最新部署右侧的三个点，选择 **重试部署 (Retry deployment)**。
*   **如果你使用 GitHub Actions 部署**：
    1. 进入 GitHub 仓库 -> **Settings** -> **Secrets and variables** -> **Actions** -> **Variables** 选项卡。
    2. 确保已添加 `VITE_CF7_FORM_ID` 等变量（注意是 Variables 而不是 Secrets，如果你的 workflow 中使用的是 `${{ vars.XXX }}`）。
    3. **关键步骤**：进入 **Actions** 页面，手动触发一次 **Run workflow** 重新打包部署。

## ✨ 功能特性
*   **完整的购物流程**：商品浏览、加入购物车、结账。
*   **用户账户系统**：登录、注册、密码找回、订单历史、地址管理。
*   **订单追踪**：无需登录即可通过订单号和邮箱追踪订单状态。
*   **联系表单**：直接对接后端的 Contact Form 7，已自动处理跨域和隐藏字段。
*   **响应式设计**：完美适配手机、平板和桌面设备。
