const { chalkINFO, emoji } = require('./config/utils/chalkTip');

console.log(
  chalkINFO(`读取：${__filename.slice(__dirname.length + 1)}`),
  emoji.get('white_check_mark')
);
// 把.browserslistrc的last 2 version改成last 20 version就可以看到明显效果
module.exports = {
  plugins: [
    // 'autoprefixer',  // postcss-preset-env包含了autoprefixer的功能
    'postcss-preset-env', // 简写，具体看各个插件的官网提供几种写法
    // require('postcss-preset-env'),
  ],
};
