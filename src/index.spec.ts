/* eslint-env jest */

import {
  curry,
  reduceSlideWindow,
  reduceChunk,
  reduceSplit,
  reduceAsync,
  sleep,
  reduceObject
} from './index';

describe('curry', () => {
  it('curry functions', () => {
    const plus = (a, b, c) => a + b + c;
    const curriedPlus = curry(plus);
    expect(curriedPlus(1, 2, 3)).toEqual(6);
    expect(curriedPlus(1, 2, 3, 4)).toEqual(6);
    expect(curriedPlus(1)(2)(3)).toEqual(6);
  });
});

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const sum3 = (accum, [x, y, z]) => [...accum, x + y + z];

describe('reduceSlideWindow', () => {
  it('pick 3 items each time then slide 1 item', () => {
    const result = reduceSlideWindow(sum3, [], 3, 1, numbers);
    expect(result).toEqual([6, 9, 12, 15, 18, 21, 24, 27, 30]);
  });

  it('pick 3 items each time then slide 2 item', () => {
    const result = reduceSlideWindow(sum3, [], 3, 2, numbers);
    expect(result).toEqual([6, 12, 18, 24, 30]);
  });

  it('pick 3 items each time then slide 3 item', () => {
    const result = reduceSlideWindow(sum3, [], 3, 3, numbers);
    expect(result).toEqual([6, 15, 24]);
  });
});

describe('reduceChunk', () => {
  it('takes 3 items each iteration then increase index by 1', () => {
    const result = reduceChunk(sum3, [], 3, numbers);
    expect(result).toEqual([6, 9, 12, 15, 18, 21, 24, 27, 30]);
  });
});

describe('reduceSplit', () => {
  it('takes 3 items at once then repeat, does not iterate on items less than split size', () => {
    const result = reduceSplit(sum3, [], 3, numbers);
    expect(result).toEqual([6, 15, 24]);
  });
});

describe('reduceAsync', () => {
  it('runs async functions as iterators', async () => {
    const result = reduceAsync(
      async (accum, curr) => {
        await sleep(10);
        return accum + curr;
      },
      0,
      [1, 2, 3, 4, 5]
    );
    expect(result).resolves.toEqual(15);
  });
});

describe('reduceObject', () => {
  it('reduce an object into key/value pairs', () => {
    const o = {
      name: 'hoge',
      count: 3
    };

    const result = reduceObject(
      (accum, [key, value]) => [...accum, `${key} is ${value}`],
      [],
      o
    );
    expect(result).toEqual(['name is hoge', 'count is 3']);
  });
});
