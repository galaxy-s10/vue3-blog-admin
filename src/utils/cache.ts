class CacheModel {
  /**
   * 获取缓存
   * @param {*} key
   */
  getStorage = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  };

  /**
   * 设置缓存
   * @param {*} key
   * @param {*} value
   */
  setStorage = (key: string, value: any) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  };

  /**
   * 清除缓存
   * @param {*} key
   */
  clearStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  /**
   * 获取缓存，如果缓存已过期，会清除该缓存并返回null
   * @param {*} key
   */
  getStorageExp = (key: string) => {
    try {
      // @ts-ignore
      const storage = JSON.parse(localStorage.getItem(key));
      if (storage) {
        // 如果缓存的expireTime小于当前时间，则代表已过期
        const isExpires = storage.expireTime < +new Date();
        if (isExpires) {
          this.clearStorage(key);
          return null;
        }
        return storage.value;
      }
      return null;
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  };

  /**
   * 设置缓存以及缓存时长
   * @param {*} key
   * @param {*} value
   * @param {*} expires 缓存时长，单位：小时
   */
  setStorageExp = (key: string, value: any, expires: number) => {
    try {
      if ([key, value, expires].includes(undefined)) {
        throw new Error('请检查传入的参数!');
      }
      const createTime = +new Date();
      const expireTime = createTime + expires * 60 * 60 * 1000;
      const params = { key, value };
      const assignParams = Object.assign(params, { createTime, expireTime });
      localStorage.setItem(key, JSON.stringify(assignParams));
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  };
}

export default new CacheModel();
