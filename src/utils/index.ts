/** 使用json进行深克隆 */
export const deepCloneByJson = (T) => JSON.parse(JSON.stringify(T));

/** 深拷贝，解决循环引用 */
export const deepClone = (obj) => {
  function clone(obj, hash) {
    const newobj = Array.isArray(obj) ? [] : {};
    hash = hash || new WeakMap();
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    hash.set(obj, newobj);

    Object.keys(obj).forEach((i) => {
      if (obj[i] instanceof Object) {
        newobj[i] = clone(obj[i], hash);
      } else {
        newobj[i] = obj[i];
      }
    });
    return newobj;
  }
  return clone(obj, undefined);
};

/** 深拷贝，解决循环引用。但不克隆key字段。 */
export const deepCloneExclude = (obj, key) => {
  function clone(obj, hash) {
    const newobj = Array.isArray(obj) ? [] : {};
    hash = hash || new WeakMap();
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    hash.set(obj, newobj);

    Object.keys(obj).forEach((i) => {
      if (i !== key) {
        if (obj[i] instanceof Object) {
          newobj[i] = clone(obj[i], hash);
        } else {
          newobj[i] = obj[i];
        }
      }
    });
    return newobj;
  }
  return clone(obj, undefined);
};

/** 模拟ajax请求 */
export const mockAjax = async (time = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          name: '张三',
          age: 18,
        },
      });
    }, time);
  });
};

/**
 * 删除对象中值为: null, undefined, NaN, ''的属性
 */
export const deleteUselessObjectKey = <T>(obj: T): T => {
  // @ts-ignore
  Object.keys(obj).forEach((key) => {
    if ([null, undefined, NaN, ''].includes(obj[key])) {
      delete obj[key];
    }
  });
  return obj;
};

/**
 * @description 格式化内存大小（要求传入的数字以byte为单位）
 * @param {number} val
 * @param {*} num 显示几位小数，默认2
 * @return {*}
 */
export const formatMemorySize = (val: number, num = 2) => {
  const oneByte = 1;
  const oneKb = oneByte * 1024;
  const oneMb = oneKb * 1024;
  const oneGb = oneMb * 1024;
  const oneTb = oneGb * 1024;
  const format = (v: number) => v.toFixed(num);
  if (val < oneKb) {
    return `${format(val / oneByte)}byte`;
  }
  if (val < oneMb) {
    return `${format(val / oneKb)}kb`;
  }
  if (val < oneGb) {
    return `${format(val / oneMb)}mb`;
  }
  if (val < oneTb) {
    return `${format(val / oneGb)}gb`;
  }
  return `${format(val / oneTb)}tb`;
};
