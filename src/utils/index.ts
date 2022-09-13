import sparkMD5 from 'spark-md5';

export const getFileExt = (name: string) => {
  return name.split('.')[1];
};

// 根据文件内容获取hash，同一个文件不管重命名还是改文件名后缀，hash都一样
export const getHash = (file: File) => {
  return new Promise<{
    hash: string;
    ext: string;
    buffer: ArrayBuffer;
  }>((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const spark = new sparkMD5.ArrayBuffer();
      const buffer = e.target!.result as ArrayBuffer;
      spark.append(buffer);
      const hash = spark.end();
      const ext = file.name.split('.')[1];
      resolve({ hash, ext, buffer });
    };
  });
};

// 文件切片
export const splitFile = (file: File) => {
  const chunkList: { chunk: Blob; chunkName: string }[] = [];
  // 先以固定的切片大小1024*100
  let max = 50 * 100;
  let count = Math.ceil(file.size / max);
  let index = 0;
  // 限定最多100个切片
  if (count > 100) {
    max = Math.ceil(file.size / 100);
    count = 100;
  }
  /**
   * 0：0,max
   * 1：max,2max
   * 2：2max,3max
   */
  while (index < count) {
    chunkList.push({
      chunkName: `${index}`,
      chunk: new File([file.slice(index * max, (index + 1) * max)], file.name),
    });
    index += 1;
  }
  return chunkList;
};

/**
 * @description 返回正则匹配到的结果（数组或null）
 * @param {string} str
 * @param {RegExp} reg
 * @return {*}
 */
export const getStrMatch = (str: string, reg: RegExp) => {
  return str.match(reg);
};

/** 使用json进行深克隆 */
export const deepCloneByJson = (T) => JSON.parse(JSON.stringify(T));

/** 深拷贝，解决循环引用 */
export const deepClone = (obj) => {
  // eslint-disable-next-line
  function clone(obj, hash) {
    const newobj = Array.isArray(obj) ? [] : {};
    // eslint-disable-next-line
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
  // eslint-disable-next-line
  function clone(obj, hash) {
    const newobj = Array.isArray(obj) ? [] : {};
    // eslint-disable-next-line
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
export const mockAjax = (time = 1000) => {
  return new Promise((resolve) => {
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
