// export for test purpose only
export const curry = (fn: Function): Function => {
  if (fn.length === 0) {
    return fn;
  }

  const recursion = (accum: any[]): Function => (...args: any[]): Function | any[] => {
    const temp = [...accum, ...args];
    if (fn.length <= temp.length) {
      return fn(...temp);
    }

    return recursion(temp);
  };
  return recursion([]);
};

export const sleep = async (ms: number = 500): Promise<void> =>
  new Promise(
    (resolve: () => void): void => {
      setTimeout((): void => resolve(), ms);
    }
  );

// 配列の要素をkernel個まとめて関数で処理しつつ、インデックスをstrideづつずらしていく。
// export for test purpose only
export const reduceSlideWindow = <T>(
  fn: Function,
  init: T,
  kernel: number,
  stride: number,
  arrayData: any[]
): T => {
  const recursion = (accum: T, start: number): T => {
    if (arrayData.length < start + kernel) {
      return accum;
    }

    const curr = arrayData.slice(start, start + kernel);
    return recursion(fn(accum, curr), start + stride);
  };

  return recursion(init, 0);
};

// 配列の要素をn個まとめて関数で処理しつつ、インデックスを1つづつずらしていく。
export const reduceChunk = curry(
  <T>(fn: Function, init: T, chunkSize: number, data: any[]): T =>
    reduceSlideWindow(fn, init, chunkSize, 1, data)
);

// 配列の要素をn個ずつの配列に分割して、それぞれにfnを適用する
export const reduceSplit = curry(
  <T>(fn: Function, init: T, kernel: number, data: any[]): T =>
    reduceSlideWindow(fn, init, kernel, kernel, data)
);

export const reduceAsync = curry(
  async <T>(fn: Function, init: T, data: any[]): Promise<T> => {
    const recursion = async (accum: T, rest: any[]): Promise<T> => {
      if (data.length === 0) {
        return accum;
      }
      const [head, ...tail] = rest;
      const result = await fn(accum, head);
      return recursion(result, tail);
    };
    return recursion(init, data);
  }
);

export const reduceObject = <T>(fn: Function, initialValue: T, obj: Record<string, any>): T => {
  const keys = Object.keys(obj);

  return keys.reduce((accum, key): T => fn(accum, [key, obj[key]]), initialValue);
};
