const arr = [];
console.log(Object.prototype.toString.call(arr));

const array: Array<number> = [1, 2, 3];
const array2: number[] = [1, 2, 3];

const unionArr: Array<number | string> = [1, 'string'];
const unionArr2: (number | string)[] = [1, 'string'];

const tuple: [number] = [1];
const tuple2: [number, string] = [1, 'string'];
