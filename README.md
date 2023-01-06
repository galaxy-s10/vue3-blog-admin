# 简介

> 基于 Vue3 + Vue-router + Webpack5 + NaiveUI + Pinia

# 预览

线上地址：[https://admin.hsslive.cn](https://admin.hsslive.cn)

# 本地启动

## 安装依赖

```bash
pnpm install
```

## 运行在根目录

```bash
pnpm start
```

默认运行在 [http://localhost:8000/](http://localhost:8000/)，如果 8000 端口被占用了，会自动递增+1

> 项目启动完成后，终端会打印调试地址，不必担心调试地址是什么~

## 运行在非根目录

```bash
pnpm start:beta
# 或
pnpm start:preview
# 或
pnpm start:prod
```

默认运行在 [http://localhost:8000/vue3-blog-admin/beta/](http://localhost:8000/vue3-blog-admin/beta/) ，如果 8000 端口被占用了，会自动递增+1

默认运行在 [http://localhost:8000/vue3-blog-admin/preview/](http://localhost:8000/vue3-blog-admin/preview/) ，如果 8000 端口被占用了，会自动递增+1

默认运行在 [http://localhost:8000/vue3-blog-admin/prod/](http://localhost:8000/vue3-blog-admin/prod/) ，如果 8000 端口被占用了，会自动递增+1

> 项目启动完成后，终端会打印调试地址，不必担心调试地址是什么~

# 项目构建

## 部署在根目录

```bash
pnpm build
```

最终构建的静态资源需要部署在服务器根目录。

## 部署在非根目录

> 注意：如果部署在非根目录，需要配合 nginx 做好 try_files

```bash
pnpm build:beta
# 或
pnpm build:preview
# 或
pnpm build:prod
```

最终构建的静态资源需要部署在服务器的/vue3-blog-admin/beta/目录。

最终构建的静态资源需要部署在服务器的/vue3-blog-admin/preview/目录。

最终构建的静态资源需要部署在服务器的/vue3-blog-admin/prod/目录。

# 服务器环境

- 操作系统：CentOS Linux release 8.2.2004
- nginx 版本：1.21.4
- node 版本：14.19.0
- redis 版本：5.0.3
- mysql 版本：8.0.26
- pm2 版本：5.1.2
