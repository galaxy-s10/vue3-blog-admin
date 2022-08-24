# 简介

> 基于Vue3 + Vue-router + Webpack5 + NaiveUI + Pinia

# 预览

线上地址：[https://admin.hsslive.cn](https://admin.hsslive.cn)

# 本地启动

## 安装依赖

```bash
yarn install
```

## 运行在根目录

```bash
yarn start
```

默认运行在 [http://localhost:8000/](http://localhost:8000/)，如果 8000 端口被占用了，会自动递增+1

> 项目启动完成后，终端会打印调试地址，不必担心调试地址是什么~

## 运行在非根目录

```bash
yarn start:beta
# 或
yarn start:preview
# 或
yarn start:prod
```

默认运行在 [http://localhost:8000/vue3-blog-admin/beta/](http://localhost:8000/vue3-blog-admin/beta/) ，如果 8000 端口被占用了，会自动递增+1

默认运行在 [http://localhost:8000/vue3-blog-admin/preview/](http://localhost:8000/vue3-blog-admin/preview/) ，如果 8000 端口被占用了，会自动递增+1

默认运行在 [http://localhost:8000/vue3-blog-admin/prod/](http://localhost:8000/vue3-blog-admin/prod/) ，如果 8000 端口被占用了，会自动递增+1

> 项目启动完成后，终端会打印调试地址，不必担心调试地址是什么~

# 项目构建

## 部署在根目录

```bash
yarn build
```

最终构建的静态资源需要部署在服务器根目录。

## 部署在非根目录

> 注意：如果部署在非根目录，需要配合nginx做好try_files

```bash
yarn build:beta
# 或
yarn build:preview
# 或
yarn build:prod
```

最终构建的静态资源需要部署在服务器的/vue3-blog-admin/beta/目录。

最终构建的静态资源需要部署在服务器的/vue3-blog-admin/preview/目录。

最终构建的静态资源需要部署在服务器的/vue3-blog-admin/prod/目录。
