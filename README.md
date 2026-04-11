# Headless WooCommerce Storefront

这是一个基于 React, Vite 和 Tailwind CSS 构建的现代化 WooCommerce 无头电商前端 (Headless Storefront)。

## 🚀 部署说明 (Deployment Guide)

要让这个前端项目正常运行，你需要一个配置好的 WordPress 后端。请按照以下步骤进行配置：

### 1. WordPress 后端准备
确保你的 WordPress 网站已经安装并激活了以下插件：
*   **WooCommerce**: 核心电商插件。
*   **JWT Authentication for WP-REST API**: 用于处理用户登录和注册的 JWT 认证。
*   **Contact Form 7**: 用于“联系我们 (Contact Us)”页面的表单提交。

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

## ✨ 功能特性
*   **完整的购物流程**：商品浏览、加入购物车、结账。
*   **用户账户系统**：登录、注册、密码找回、订单历史、地址管理。
*   **订单追踪**：无需登录即可通过订单号和邮箱追踪订单状态。
*   **联系表单**：直接对接后端的 Contact Form 7。
*   **响应式设计**：完美适配手机、平板和桌面设备。
