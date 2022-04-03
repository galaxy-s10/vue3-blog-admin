const chalk = require('chalk');

console.log(
  `${chalk.bgBlueBright.black(' INFO ')} ${chalk.blueBright(
    `读取了: ${__filename.slice(__dirname.length + 1)}`
  )}`
);

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        /**
         * useBuiltIns:
         * false: 默认值就是false,不用任何的polyfill相关的代码
         * usage: 代码中需要哪些polyfill, 就引用相关的api
         * entry: 手动在入口文件中导入 core-js/regenerator-runtime, 根据目标浏览器引入所有对应的polyfill
         */
        useBuiltIns: 'usage',
        corejs: 3,
        modules: 'auto', //modules设置成commonjs后，路由懒加载就没了。
        // modules: 'commonjs', // https://github.com/vuejs/vue-cli/blob/HEAD/packages/@vue/babel-preset-app/index.js#L226
      },
    ],
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import'],
};
