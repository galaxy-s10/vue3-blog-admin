# 主要技术栈

> Vue3 + Vue-router + Webpack5 + NaiveUI + Pinia

# 本地运行

## 安装依赖

```bash
yarn install
```

## 模拟根目录

```sh
yarn start
```

运行在 http://localhost:8000/，可以模拟部署根目录的环境。

## 模拟非根目录

```sh
yarn start:beta
```

运行在 http://localhost:8000/vue3-blog-admin/beta/，可以模拟部署在/vue3-blog-admin/beta/目录的环境。

# 构建部署

## 部署在根目录

```sh
yarn build
```

最终构建的静态资源需要部署在服务器根目录。

## 部署在非根目录

```sh
yarn build:beta
```

最终构建的静态资源需要部署在服务器的/vue3-blog-admin/beta/目录。
