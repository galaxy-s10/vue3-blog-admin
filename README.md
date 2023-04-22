# 简介

基于 Vue3 + Vue-router + Webpack5 + NaiveUI + Pinia 搭建的博客后台

# 预览

线上地址：[https://admin.hsslive.cn](https://admin.hsslive.cn)

# 项目截图

登录：

![https://resource.hsslive.cn/image/e8241c8c3c9b259a0cc61ca316482f93.webp](https://resource.hsslive.cn/image/e8241c8c3c9b259a0cc61ca316482f93.webp)

控制台：

![https://resource.hsslive.cn/image/d9068218a9c6558b3db07266b554fc7a.webp](https://resource.hsslive.cn/image/d9068218a9c6558b3db07266b554fc7a.webp)

角色列表：

![https://resource.hsslive.cn/image/b7466a76a9cb2b104ec514df7d35b893.webp](https://resource.hsslive.cn/image/b7466a76a9cb2b104ec514df7d35b893.webp)

角色树：

![https://resource.hsslive.cn/image/804590ba404c7eda28dec55ce8094689.webp](https://resource.hsslive.cn/image/804590ba404c7eda28dec55ce8094689.webp)

权限列表：

![https://resource.hsslive.cn/image/a95304ea89428ce356a74d05570bf78e.webp](https://resource.hsslive.cn/image/a95304ea89428ce356a74d05570bf78e.webp)

权限树：

![https://resource.hsslive.cn/image/bf76360b9f52c12598dacad1f7cc4a8d.webp](https://resource.hsslive.cn/image/bf76360b9f52c12598dacad1f7cc4a8d.webp)

用户列表：

![https://resource.hsslive.cn/image/f43a658965af056418f8507628fbf157.webp](https://resource.hsslive.cn/image/f43a658965af056418f8507628fbf157.webp)

日志列表：

![https://resource.hsslive.cn/image/8185a484698664f74b06d54bb56feac7.webp](https://resource.hsslive.cn/image/8185a484698664f74b06d54bb56feac7.webp)

友链列表：

![https://resource.hsslive.cn/image/6e888d01adb02098136f552e93b64e39.webp](https://resource.hsslive.cn/image/6e888d01adb02098136f552e93b64e39.webp)

文章列表：

![https://resource.hsslive.cn/image/92200b687305c22b6b382e748c0029f1.webp](https://resource.hsslive.cn/image/92200b687305c22b6b382e748c0029f1.webp)

发布文章：

![https://resource.hsslive.cn/image/520d6e3af2f0aa389d7a802cecb29f77.webp](https://resource.hsslive.cn/image/520d6e3af2f0aa389d7a802cecb29f77.webp)

点赞列表：

![https://resource.hsslive.cn/image/3f0bbd0eb5f70511f41f30cb57c32a16.webp](https://resource.hsslive.cn/image/3f0bbd0eb5f70511f41f30cb57c32a16.webp)

评论列表：

![https://resource.hsslive.cn/image/c762c97e87859eb6d1b15c853a026c6d.webp](https://resource.hsslive.cn/image/c762c97e87859eb6d1b15c853a026c6d.webp)

# 本地启动

## 安装依赖

```bash
pnpm install
```

更新 billd 依赖：

```bash
pnpm i billd-utils@latest billd-scss@latest billd-html-webpack-plugin@latest billd-deploy@latest
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
