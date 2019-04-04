// const uncurry = fn => (...args) => args.reduce((accum, curr) => accum(curr), fn);
const curry = fn => {
  if (fn.length === 0) {
    return fn;
  }

  const _curry = args => (...arg) => {
    const accum = [...args, ...arg];
    if (fn.length === accum.length) {
      return fn(...accum);
    }

    return _curry(accum);
  };
  return _curry([]);
};

export const sleep = async (ms = 500) =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

// 配列の要素をn個まとめて関数で処理しつつ、インデックスをstrideづつずらしていく。
// TODO reduceなんちゃらというモジュールを作ってnpmで公開する
const reduceSlideWindow = (fn, init, windowSize, stride, arrayData) => {
  const chunk = (accum, start) => {
    if (arrayData.length < start + windowSize) {
      return accum;
    }

    const curr = arrayData.slice(start, start + windowSize);
    return chunk(fn(accum, curr), start + stride);
  };

  return chunk(init, 0);
};

// 配列の要素をn個まとめて関数で処理しつつ、インデックスを1つづつずらしていく。
// TODO 移動平均の計算に便利、という例を書く
// [1, 2, 3, 4, 5]
// [1, 2]
//    [2, 3]
//       [3, 4]
//          [4, 5]
export const reduceChunk = curry((fn, init, chunkSize, data) =>
  reduceSlideWindow(fn, init, chunkSize, 1, data)
);

// 配列の要素をn個ずつの配列に分割して、それぞれにfnを適用する
// [1, 2, 3, 4, 5]
// [1, 2]
//       [3, 4]
export const reduceSplit = curry((fn, init, windowSize, data) =>
  reduceSlideWindow(fn, init, windowSize, windowSize, data)
);

// reduceAsync
// TODO どう便利なのかの例
export const reduceAsync = curry(async (fn, init, data) => {
  const fold = async (accum, data) => {
    if (data.length === 0) {
      return accum;
    }
    const [head, ...tail] = data;
    const result = await fn(accum, head);
    return fold(result, tail);
  };
  return await fold(init, data);
});
