const { chalkINFO, emoji } = require('./config/utils/chalkTip');

console.log(
  chalkINFO(`读取：${__filename.slice(__dirname.length + 1)}`),
  emoji.get('white_check_mark')
);

module.exports = {
  extends: ['@commitlint/config-conventional'],
};
