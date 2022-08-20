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
