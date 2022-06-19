import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

const path = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
    /**
     * 不建议省略.vue后缀
     * https://cn.vitejs.dev/config/shared-options.html#resolve-extensions
     */
    // extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
  },
  plugins: [
    vue(),
    eslint({
      failOnError: false,
      failOnWarning: false,
      cache: true,
    }),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3300',
        secure: false, // 默认情况下（secure: true），不接受在HTTPS上运行的带有无效证书的后端服务器。设置secure: false后，后端服务器的HTTPS有无效证书也可运行
        /**
         * changeOrigin，是否修改请求地址的源
         * 默认changeOrigin: false，即发请求即使用devServer的localhost:port发起的，如果后端服务器有校验源，就会有问题
         * 设置changeOrigin: true，就会修改发起请求的源，将原本的localhost:port修改为target，这样就可以通过后端服务器对源的校验
         */
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/admin/'),
      },
      '/prodapi': {
        target: 'http://42.193.157.44:3200',
        secure: false, // 默认情况下（secure: true），不接受在HTTPS上运行的带有无效证书的后端服务器。设置secure: false后，后端服务器的HTTPS有无效证书也可运行
        /**
         * changeOrigin，是否修改请求地址的源
         * 默认changeOrigin: false，即发请求即使用devServer的localhost:port发起的，如果后端服务器有校验源，就会有问题
         * 设置changeOrigin: true，就会修改发起请求的源，将原本的localhost:port修改为target，这样就可以通过后端服务器对源的校验
         */
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prodapi/, '/admin/'),
      },
      '/betaapi': {
        target: 'http://42.193.157.44:3300',
        secure: false, // 默认情况下（secure: true），不接受在HTTPS上运行的带有无效证书的后端服务器。设置secure: false后，后端服务器的HTTPS有无效证书也可运行
        /**
         * changeOrigin，是否修改请求地址的源
         * 默认changeOrigin: false，即发请求即使用devServer的localhost:port发起的，如果后端服务器有校验源，就会有问题
         * 设置changeOrigin: true，就会修改发起请求的源，将原本的localhost:port修改为target，这样就可以通过后端服务器对源的校验
         */
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/betaapi/, '/admin/'),
      },
    },
  },
});
