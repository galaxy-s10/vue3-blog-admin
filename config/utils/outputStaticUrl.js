const APP_ENV =
  process.env.VUE_APP_RELEASE_ENV === 'null'
    ? null
    : process.env.VUE_APP_RELEASE_ENV;
const APP_NAME = process.env.VUE_APP_RELEASE_PUBLICPATH;

module.exports = () => {
  if (APP_ENV) {
    if (APP_ENV && APP_NAME) {
      return `/${APP_NAME}/${APP_ENV}/`; // 如：/vueblog-admin/beta/
    }
    return `/${APP_ENV}/`; // 如：/beta/
  }
  return APP_NAME ? `/${APP_NAME}/` : '/'; // 如：/vueblog-admin/或/
};
