#!/usr/bin/env bash
###
# Author: shuisheng
# Date: 2022-04-26 01:54:48
# Description: https://github.com/galaxy-s10/sh/blob/master/build.sh
# Email: 2274751790@qq.com
# FilePath: /vue3-blog-admin/build.sh
# Github: https://github.com/galaxy-s10
# LastEditTime: 2022-08-25 03:45:51
# LastEditors: shuisheng
###

# 该build.sh文件会在Jenkins构建完成后被执行
# 注意:JOBNAME=$1,这个等号左右不能有空格！
JOBNAME=$1      #约定$1为任务名
ENV=$2          #约定$2为环境
WORKSPACE=$3    #约定$3为Jenkins工作区
PORT=$4         #约定$4为端口号
TAG=$5          #约定$5为git标签
PUBLICDIR=/node #约定公共目录为/node

echo 删除node_modules:
rm -rf node_modules

echo 查看npm版本:
npm -v

echo 设置npm淘宝镜像:
npm config set registry http://registry.npm.taobao.org/

echo 查看当前npm镜像:
npm get registry

if ! type yarn >/dev/null 2>&1; then
  echo 'yarn未安装,先全局安装yarn'
  npm i yarn -g
else
  echo 'yarn已安装'
fi

echo 查看yarn版本:
yarn -v

echo 设置yarn淘宝镜像:
yarn config set registry https://registry.npm.taobao.org

echo 查看当前yarn镜像:
yarn config get registry

echo 开始安装依赖:
yarn install

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

# 博客后台，直接放服务器根目录
npx webpack --config ./config/webpack.common.ts --env production
