const chalk = require('chalk');

console.log(
  `${chalk.bgBlueBright.black(' INFO ')} ${chalk.blueBright(
    `读取了: ${__filename.slice(__dirname.length + 1)}`
  )}`
);
// 把.browserslistrc的last 2 version改成last 20 version就可以看到明显效果
module.exports = {
  plugins: [
    // 'autoprefixer',  // postcss-preset-env包含了autoprefixer的功能
    'postcss-preset-env', // 简写，具体看各个插件的官网提供几种写法
    // require('postcss-preset-env'),
  ],
};
