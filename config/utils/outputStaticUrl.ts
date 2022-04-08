export const APP_NAME = process.env.VUE_APP_RELEASE_PROJECT_NAME;
export const APP_ENV = process.env.VUE_APP_RELEASE_PROJECT_ENV;
export const NODE_ENV = process.env.NODE_ENV;

export const outputStaticUrl = () => {
  if (NODE_ENV === 'production') {
    // 生产环境是一定有APP_NAME的，APP_ENV可能是'null'字符串
    // if (APP_ENV === 'null') {
    //   return `/${APP_NAME}/`;
    // } else {
    //   return `/${APP_NAME}/${APP_ENV}/`;
    // }

    return '/'; //博客后台，直接放在服务器根目录
  } else {
    // 开发环境
    if (APP_ENV === undefined && APP_NAME === undefined) {
      // 项目名称和项目环境都设置
      return '/';
    }
    if (APP_NAME === undefined) {
      // 如果没设置项目名称，则判断是否设置了项目环境，如果设置了，则返回/项目环境/，否则返回'/'
      return APP_ENV ? `/${APP_ENV}/` : '/';
    }
    if (APP_ENV === undefined) {
      // 如果没设置项目环境，则判断是否设置了项目名称，如果设置了，则返回/项目名称/，否则返回'/'
      return APP_NAME ? `/${APP_NAME}/` : '/';
    }

    // 返回：/项目名称/项目环境/
    return `/${APP_NAME}/${APP_ENV}/`;
  }
};
