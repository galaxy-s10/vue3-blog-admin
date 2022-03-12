const { chalkINFO, emoji } = require('./config/utils/chalkTip');

console.log(
  chalkINFO(`读取：${__filename.slice(__dirname.length + 1)}`),
  emoji.get('white_check_mark')
);

module.exports = {
  types: [
    { type: 'feat', section: 'Features', hidden: false },
    { type: 'fix', section: 'Bug Fixes', hidden: false },
    { type: 'docs', section: 'Docs', hidden: false },
    { type: 'style', section: 'Styling', hidden: false },
    { type: 'refactor', section: 'Code Refactoring', hidden: false },
    { type: 'perf', section: 'Performance Improvements', hidden: false },
    { type: 'test', section: 'Tests', hidden: false },
    { type: 'build', section: 'Build System', hidden: false },
    { type: 'ci', section: 'CI', hidden: false },
    { type: 'chore', section: 'Others', hidden: false },
    { type: 'revert', section: 'Reverts', hidden: false },
  ],
};
