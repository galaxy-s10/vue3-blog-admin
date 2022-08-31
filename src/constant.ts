export const GITHUB_REPO = 'https://github.com/galaxy-s10/vue3-blog-admin';
export const REDIRECT_URI = 'https://admin.hsslive.cn/oauth/';

export const QQ_CLIENT_ID = '101934585';
export const QQ_OAUTH_URL =
  'https://graph.qq.com/oauth2.0/authorize?response_type=code&';

export const GITHUB_CLIENT_ID = '8c2c07b574ae70ecfa9d';
export const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize?';

export const QINIU_CDN_URL = 'https://resource.hsslive.cn/';

export const POSTMESSAGE_TYPE = ['qq_login', 'github_login', 'login_expired'];

export const QINIU_BUCKET = 'hssblog'; // 七牛云bucket
export const QINIU_PREFIX = {
  'image/': 'image/',
  'backupsDatabase/': 'backupsDatabase/',
  'media/': 'media/',
  'nuxt-blog-client/': 'nuxt-blog-client/',
};

export const MONIT_TYPE_MAP = {
  1: '服务器内存日志',
  2: '服务器内存达到阈值',
  3: '监控七牛云',
  4: '监控node进程',
  5: '重启pm2',
  6: '清除buff/cache',
  7: '备份数据库成功',
  8: '备份数据库失败',
};

// 路由sort，值越大越往上
export const ROUTE_SORT = {
  dashboard: 300,

  log: 200,
  monit: 200,
  blacklist: 200,
  visitor: 200,

  setting: 180,
  schedule: 180,

  user: 120,
  auth: 110,
  role: 110,
  thirdUser: 100,

  comment: 80,
  star: 80,

  qiniu: 70,

  article: 60,
  music: 60,
  works: 60,
  link: 60,
  tag: 60,
  type: 60,
  theme: 60,

  error: 1,
};
