# 启动
pnpm i 
npm run dev

# redis
安装 redis
brew install redis
启动 redis-server

安装 redis GUI 工具
https://getmedis.com/
brew install medis
安装完成，链接 redis-server 端口

前端使用 ioredis 库访问 redis 服务

# 图标
https://heroicons.com/

# 国际化
## 方案一 react-i18next
https://react.i18next.com/guides/quick-start
使用到的包:
- @formatjs/intl-localematcher
一个用于语言和区域（locale）匹配的工具包，能够根据客户端的首选语言列表与服务器支持的语言列表进行最优匹配。
主要功能：
    根据客户端提供的语言列表（如 Accept-Language）与服务端支持的语言列表进行匹配。
    按优先级从高到低选择最合适的语言。
    如果没有直接匹配的语言，可以选择最接近的语言（例如，客户端请求 zh-HK，而服务端支持 zh-CN）。

- negotiator
用于处理 HTTP 请求头中的内容协商（content negotiation）。它可以解析客户端首选的语言、内容类型（MIME）、编码、字符集等，并与服务端的支持选项进行对比。
主要功能：
    从 Accept-* 请求头（如 Accept-Language, Accept-Encoding, Accept-Charset, Accept）中解析客户端的偏好。
    返回客户端按权重排序的偏好列表。
    提供了多种内容协商功能，而不仅仅是语言。

- i18next
用 JavaScript 编写的国际化框架，它实现的最主要的功能是字典翻译
支持命名空间，这意味着原本需要将所有翻译内容写在一起的文件可以拆分成多个小文件，比如按页面进行拆分

- react-i18next
i18next 的一个插件，为了方便在 React 中使用

- i18next-resources-to-backend
因为将翻译内容定义在 JS 文件中并不方便，定义在多个 json 文件中更为合适，i18next-resources-to-backend 帮助我们读取 json 文件资源，生成字典。

- i18next-browser-languageDetector
在浏览器端自动检测语言

### 在服务端组件中使用，翻译的内容会直接打包到 HTML 中，所以翻译文件并不会影响文件大小

## 方案二 next-intl
https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing
较 react-i18next 更便捷
1. 直接使用 next-intl/plugin 返回函数，作用于 next.config.ts
2. 使用 next-intl/middleware 中的 createMiddleware 定义好处理路由的 middleware
3. i18n.ts 中使用 next-intl/server 的 getRequestConfig 定义好获取对应语言翻译映射 json 的方法
4. 在 getRequestConfig 中 import 的翻译映射文件路径下定义好各个语言下对应各个字段的的翻译 json 文件
5. 组件中使用，分场景 https://next-intl-docs.vercel.app/docs/environments/server-client-components

# next-auth
验证、授权
1. 可接入 github auth 认证 https://github.com/settings/applications/new
新建生产一个 Client secrets



# 注意
1. 客户端组件下移
服务端组件尽量在服务端组件中引用 通过 props 的方式传入到 客户端组件中，避免将不必要的服务端代码、依赖打包到客户端 bundle 中。（如侧边栏的 noteCard）
2. 当使用 action 操作 note 数据时，需要注意 **完整路由缓存**
npm run build 时可以发现 '/' 、 '/note/eidt' 都会被构建为静态路由
以 /note/edit为例，路由默认是静态渲染，也就是说，会在构建的时候，读取数据，然后将编译后的 HTML 和 RSC Payload 缓存，构建的时候，数据库里有 3 条数据，所以 HTML 中也只有 3 条数据，所以后续打开 /note/edit也都是 3 条数据。

所以重定向时，需要注意重新验证


# 数据库迁移至 mysql，使用 strapi 搭建一个 headless CMS，实现简易的 Restful API
本地控制台 
启动一个 next-react-notes-strapi 项目
npx create-strapi-app@latest next-react-notes-strapi

mysql -u root -p
启动 mysql，并创建一个数据库
CREATE DATABASE strapi\g


更新 next-react-notes-strapi 项目目录中 .env 的数据库配置配置
之后运行 npm run develop 启动 strapi 项目
可在 strapi 项目中创建自己的 Restful API
