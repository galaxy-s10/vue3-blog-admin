#!/usr/bin/env bash
###
# Author: shuisheng
# Date: 2022-04-26 01:54:48
# Description: https://github.com/galaxy-s10/vue3-blog-admin
# Email: 2274751790@qq.com
# FilePath: /vue3-blog-admin/build.sh
# Github: https://github.com/galaxy-s10
# LastEditTime: 2022-10-27 13:53:17
# LastEditors: shuisheng
###

# 注意:JOBNAME=$1,这个等号左右不能有空格！
JOBNAME=$1      #约定$1为任务名
ENV=$2          #约定$2为环境
WORKSPACE=$3    #约定$3为Jenkins工作区
PORT=$4         #约定$4为端口号
TAG=$5          #约定$5为git标签
PUBLICDIR=/node #约定公共目录为/node

echo 删除node_modules:
rm -rf node_modules

echo 查看node版本:
node -v

echo 查看npm版本:
npm -v

echo 设置npm淘宝镜像:
npm config set registry https://registry.npm.taobao.org/

echo 查看当前npm镜像:
npm get registry

if ! type pnpm >/dev/null 2>&1; then
  echo 'pnpm未安装,先全局安装pnpm'
  npm i pnpm -g
else
  echo 'pnpm已安装'
fi

echo 查看pnpm版本:
pnpm -v

echo 设置pnpm淘宝镜像:
pnpm config set registry https://registry.npm.taobao.org/
pnpm config set @billd:registry http://registry.hsslive.cn/

echo 查看当前pnpm镜像:
pnpm config get registry
pnpm config get @billd:registry

echo 开始安装依赖:
pnpm install

if [ $ENV = 'beta' ]; then
  echo 开始构建测试环境:
elif [ $ENV = 'preview' ]; then
  echo 开始构建预发布环境:
elif [ $ENV = 'prod' ]; then
  echo 开始构建正式环境:
else
  echo 开始构建$ENV环境:
fi

# npx cross-env VUE_APP_RELEASE_PROJECT_NAME=$JOBNAME VUE_APP_RELEASE_PROJECT_ENV=$ENV webpack --config ./config/webpack.common.ts --env production
npx vue-tsc --noEmit && npx vite build
