import {
  PROJECT_INFO,
  H5_GAME_PROJECT_NAME,
  H5_GAME_PROJECT_VERSION,
  H5_GAME_PROJECT_LASTBUNDLE_TIME,
} from '@/constant';
import prefixCache from '@/util/prefixCache';

const name = H5_GAME_PROJECT_NAME as string;
const lastBuildTime = H5_GAME_PROJECT_LASTBUNDLE_TIME as string;
const version = H5_GAME_PROJECT_VERSION as string;

export default () => {
  const prettierLog = (title, value) => {
    console.log(
      `%c ${title} %c ${value} %c`,
      'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent'
    );
  };
  const { commitHash, commitDate, commitUserName, commitMessage } = process.env
    .H5_GAME_PROJECT_GIT as any;

  prettierLog('项目名称：', name);
  prettierLog('项目版本：', version);
  prettierLog('最后构建：', lastBuildTime);
  prettierLog('提交用户：', commitUserName);
  prettierLog('提交日期：', commitDate);
  prettierLog('提交信息：', commitMessage);
  prettierLog('提交哈希：', commitHash);
  prettierLog('当前地址栏：', window.location.href);
  prefixCache.setStorage(PROJECT_INFO, {
    commitHash,
    commitDate,
    commitUserName,
    commitMessage,
    lastBuildTime,
    version,
  });
};
