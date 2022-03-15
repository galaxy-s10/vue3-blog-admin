export const APP_ENV = process.env.VUE_APP_RELEASE_ENV;
export const APP_NAME = process.env.VUE_APP_RELEASE_PUBLICPATH;

export const outputStaticUrl = () => {
  if (APP_ENV === undefined && APP_NAME === undefined) {
    return '/';
  }
  if (APP_ENV !== 'null') {
    if (APP_ENV && APP_NAME) {
      return `/${APP_NAME}/${APP_ENV}/`; // 如：/vueblog-admin/beta/
    }
    return `/${APP_ENV}/`; // 如：/beta/
  }
  return APP_NAME ? `/${APP_NAME}/` : '/'; // 如：/vueblog-admin/或/
};
