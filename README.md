# reduce-plus

[![Actions Status](https://github.com/craftgear/snake-camel/workflows/test/badge.svg)](https://github.com/craftgear/snake-camel/actions)

this package provides a few extra reduce functionalitis

* **reduceChunk** picks N items from an array and run reduce on items, then skip one item, pick N items and reduce again until it reaches the last item.
* **reduceSplit** splits an array into groups with N items and run reduce on each groups. It drops last items fewer than N.
* **reduceAsync** runs async functions as reduce functions.
* **sleep** a utility function, handy to be used with reduceAsync.
* **reduceObject** iterates over objects' key-value pairs. It's shallow.

All functions are curried.

## Install
`npm install --save reduce-plus`

## Usage
### reduceChunk
This function picks items from an array and slide one by one.
It's useful for calculating moving average or min/max in a certain period.

```
const result = reduceChunk(fn, init, 2, [1, 2, 3, 4, 5]);
```

runs like this:
```
[1, 2, 3, 4, 5]
[1, 2]            fn(init, [1, 2])
   [2, 3]         fn(accum, [2, 3])
     [3, 4]       fn(accum, [3, 4])
        [4, 5]    fn(accum, [4, 5])
```

Or you can predefine the above function like so:
```
const reducePair = reduceChunk(fn, [], 2);
const result = reducePair([1, 2, 3, 4, 5]);
```

### reduceSplit
This function splits an array into groups, then reduce each group.

```
const result = reduceSplit(fn, init, 2, [1, 2, 3, 4, 5]);
```

runs like this:
```
[1, 2, 3, 4, 5]
[1, 2]          fn(init, [1, 2])
      [3, 4]    fn(accum, [3, 4])
```

In this case, the last item `5` is not processed as its length fewer than 2.

This function is also curried.

### reduceAsync
This function takes async functions as reducers.

```
const result = await reduceAsync(
                 async(accum, current) => {
                   await sleep(500);
                   return accum + current;
                 },
                 0,
                 [1, 2, 3, 4, 5]
               );
```

It's useful to run async functions like http requests/file operations etc.
`sleep` function can be used with this to make it wait for some time after each iteration.

This function is also curried.

### sleep
This function takes milli seconds as an argument and returns a Promise. It's handy when combining with `reduceAsync`.

### reduceObject
This function iterates over objects' key-value pairs and pass them as a current value in each iteration. Each key-value pair takes a form `[key, value]` array.

```
const result = reduceObject(
                 (accum, [key, value]) => [...accum, `${key} is ${value}`],
                 [],
                 {foo: 'bar', bar: 'baz'}
               );
```

This function is also curried.

## License
MIT
