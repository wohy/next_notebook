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

# 注意
1. 客户端组件下移
服务端组件尽量在服务端组件中引用 通过 props 的方式传入到 客户端组件中，避免将不必要的服务端代码、依赖打包到客户端 bundle 中。（如侧边栏的 noteCard）
2. 当使用 action 操作 note 数据时，需要注意 **完整路由缓存**
npm run build 时可以发现 '/' 、 '/note/eidt' 都会被构建为静态路由
以 /note/edit为例，路由默认是静态渲染，也就是说，会在构建的时候，读取数据，然后将编译后的 HTML 和 RSC Payload 缓存，构建的时候，数据库里有 3 条数据，所以 HTML 中也只有 3 条数据，所以后续打开 /note/edit也都是 3 条数据。

所以重定向时，需要注意重新验证


