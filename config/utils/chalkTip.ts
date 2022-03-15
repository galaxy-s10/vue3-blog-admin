const chalk = require('chalk');
const nodeEmoji = require('node-emoji');

export const emoji = nodeEmoji;
export const chalkINFO = (v) =>
  `${chalk.bgBlueBright.black(' INFO ')} ${chalk.blueBright(v)}`;
export const chalkSUCCESS = (v) =>
  `${chalk.bgGreenBright.black(' SUCCESS ')} ${chalk.greenBright(v)}`;
export const chalkERROR = (v) =>
  `${chalk.bgRedBright.black(' ERROR ')} ${chalk.redBright(v)}`;
