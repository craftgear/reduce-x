export declare const curry: (fn: Function) => Function;
export declare const sleep: (ms?: number) => Promise<void>;
export declare const reduceSlideWindow: <T>(fn: Function, init: T, windowSize: number, stride: number, arrayData: any[]) => T;
export declare const reduceChunk: Function;
export declare const reduceSplit: Function;
export declare const reduceAsync: Function;
export declare const reduceObject: <T>(fn: Function, initialValue: T, obj: Record<string, any>) => T;
