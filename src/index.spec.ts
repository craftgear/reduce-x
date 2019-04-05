import { curry /* , reduceSlideWindow, reduceChunk, reduceSplit, reduceAsync */ } from './index';

describe('curry', () => {
  it('curry functions', () => {
    const plus = (a, b, c) => a + b + c;
    const curriedPlus = curry(plus);
    expect(curriedPlus(1, 2, 3)).toEqual(6);
    expect(curriedPlus(1, 2, 3, 4)).toEqual(6);
    expect(curriedPlus(1)(2)(3)).toEqual(6);
  });
});

describe('reduceSlideWindow', () => {
  it('pick N items each time then slice M items', () => {});
});
