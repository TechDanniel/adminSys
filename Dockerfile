#第一阶段构建应用
#使用使用 Node.js 22 的 Alpine Linux 轻量级镜像作为基础镜像，此阶段命名为build-stage用于后续引用
FROM node:22-apline as build-stage
#设置容器内的工作目录为/app，后续的命令都会默认在这个目录下执行
WORKDIR /app
#启动nodejs内置的包管理器工具corepack
RUN corepack enable
#准备并激活最新版本的pnpm作为包管理器
RUN corepack prepare pnpm@latest --activate
#将npm包源设置为国内的npmmirror镜像，加速依赖下载
RUN npm config set registry https://registry.npmmirror.com

#复制包定义package.json和依赖关系pnpm-lock.yaml到工作哦目录
COPY package.json pnpm-lock.yaml ./
#使用pnpm安装依赖(--frozon-lockfile确保依赖版本严格一致)
RUN pnpm install --frozen-lockfile
#复制整个项目到工作目录
COPY . .
#执行构建命令生成生产环境的代码
RUN pnpm build

#第二阶段：生产环境
#使用Nginx的Alpine轻量级镜像作为生产环境基础镜像
FROM nginx:stable-alpine as production-stage
#从上一阶段(build-satge)复制构建产物dist到nginx默认网站目录
COPY --from=build-stage /app/dist /usr/share/nginx/html
#声明容器将监听80端口(仅作文档用途，不实际开启端口)
EXPOSE 80
#以非守护进程模式启动 Nginx
CMD ["nginx", "-g", "daemon off;"]