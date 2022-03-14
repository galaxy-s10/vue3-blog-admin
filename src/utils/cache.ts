class CacheModel {
  /**
   * 获取缓存
   * @param {*} key
   */
  getStorage = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
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
      const storage = JSON.parse(localStorage.getItem(key));
      if (storage) {
        // 如果缓存的startTime加上expires小于或等于当前时间戳，则代表还没过期
        const isExpires = storage.startTime + storage.expires <= +new Date();
        if (isExpires) {
          this.clearStorage(key);
          return null;
        }
        return storage.value;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * 设置缓存以及缓存时长
   * @param {*} key
   * @param {*} value
   * @param {*} expires 缓存时长，单位：毫秒
   */
  setStorageExp = (key: string, value: any, expires: number) => {
    try {
      const params = { key, value, expires };
      if (!expires) {
        throw new Error('请传入过期时间!');
      }
      const assignParams = Object.assign(params, { startTime: +new Date() });
      localStorage.setItem(key, JSON.stringify(assignParams));
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default new CacheModel();
