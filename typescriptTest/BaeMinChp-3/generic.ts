class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise | string>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

//비추천
type GType<T> = T;
