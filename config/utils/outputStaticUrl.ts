export const APP_NAME = process.env.VUE_APP_RELEASE_PROJECT_NAME;
export const APP_ENV = process.env.VUE_APP_RELEASE_PROJECT_ENV;
export const PUBLIC_PATH = process.env.PUBLIC_PATH;
export const NODE_ENV = process.env.NODE_ENV;

export const outputStaticUrl = (isProduction: boolean) => {
  console.table({ isProduction, APP_NAME, APP_ENV, NODE_ENV, PUBLIC_PATH });
  if (APP_ENV === undefined && APP_NAME === undefined) {
    return '/';
  }
  if (isProduction) {
    // 如果是jenkins里面构建，会执行build.sh，一定会有APP_NAME，APP_ENV可能是：'null'|'beta'|'preview'|'prod'
    if (APP_ENV === 'null') {
      return `/${APP_NAME}/`;
    } else {
      return `/${APP_NAME}/${APP_ENV}/`;
    }
  } else {
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
