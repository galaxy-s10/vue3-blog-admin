import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import pkg from '../package.json';

let commitHash;
let commitUserName;
let commitDate;
let commitMessage;
try {
  // commit哈希
  commitHash = execSync('git show -s --format=%H').toString().trim();
  // commit用户名
  commitUserName = execSync('git show -s --format=%cn').toString().trim();
  // commit日期
  commitDate = new Date(
    execSync(`git show -s --format=%cd`).toString()
  ).toLocaleString();
  // commit消息
  commitMessage = execSync('git show -s --format=%s').toString().trim();
} catch (error) {
  console.log(error);
}

const tmpStr = fs.readFileSync(path.resolve(__dirname, './tmp.txt'));

const pkgName = pkg.name;
const pkgVersion = pkg.version;
const pkgRepository = pkg.repository.url;

const replaceKeyFromValue = (str: string, obj: object) => {
  let res = str;
  Object.keys(obj).forEach((v) => {
    res = res.replace(new RegExp(`{${v}}`, 'ig'), obj[v]);
  });
  return res;
};

interface IConsoleProjectPlugin {
  isProduction?: boolean;
}

class ConsoleProjectPlugin {
  options: IConsoleProjectPlugin;

  constructor(options: IConsoleProjectPlugin) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tap('ConsoleProjectPlugin', (compilation) => {
      const extensions = ['js'];
      const assets = Object.keys(compilation.assets).filter((assetPath) => {
        const splitted = assetPath.split('.');
        // 获取最后一个文件扩展名
        const extension = splitted[splitted.length - 1];
        return extensions.includes(extension);
      });
      assets
        .filter((v) => v.indexOf('main') !== -1)
        .forEach((asset) => {
          // 获取原来内容
          const source = compilation.assets[asset].source();
          const buildRepository = this.options.isProduction
            ? `https://gitee.com/galaxy-s10/${pkgName}`
            : pkgRepository;
          const info = replaceKeyFromValue(tmpStr.toString(), {
            pkgName: JSON.stringify(pkgName),
            pkgVersion: JSON.stringify(pkgVersion),
            pkgRepository: JSON.stringify(pkgRepository),
            buildRepository: JSON.stringify(buildRepository),
            lastBuild: JSON.stringify(new Date().toLocaleString()),
            commitDate: JSON.stringify(commitDate),
            commitHash: JSON.stringify(commitHash),
            commitMessage: JSON.stringify(commitMessage),
            commitUserName: JSON.stringify(commitUserName),
          });
          // 拼接上数据
          const content = `(function () {${info}})();${source}`;
          // 修改资源
          compilation.assets[asset] = {
            // 最终资源输出时，调用source方法，source方法的返回值就是资源的具体内容
            source() {
              return content;
            },
            // 资源大小
            size() {
              return content.length;
            },
          };
        });
    });
  }
}

export default ConsoleProjectPlugin;
