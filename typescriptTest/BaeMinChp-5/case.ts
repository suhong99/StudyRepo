// T extemds I? X:Y

interface Bank {
  financialCode: string;
  companyName: string;
  name: string;
  fullName: string;
}

interface Card {
  financialCode: string;
  companyName: string;
  name: string;
  appCardType?: string;
}

type PayMethod<T> = T extends 'card' ? Card : Bank;
type CardPayMethodType = PayMethod<'card'>;
type BankMethodType = PayMethod<'bank'>;

type UnpackPromise<T> = T extends Promise<infer K>[] ? K : any;

const promises = [Promise.resolve('Mark'), Promise.resolve(38)];
type Expected = UnpackPromise<typeof promises>; //type Expected = string | number
//Promise.resolve('Mark'):
/*
Promise.resolve는 JavaScript의 Promise를 생성하는 함수 중 하나입니다.
이 함수는 주어진 값을 가지고 즉시 이행(resolve)된 Promise를 반환합니다.
'Mark'는 문자열 "Mark"를 가지는 Promise가 생성되도록 합니다.
즉, Promise.resolve('Mark')는 'Mark'라는 값을 가진 Promise 객체를 반환합니다.
typeof promises:

typeof는 JavaScript에서 변수 또는 표현식의 타입을 문자열로 반환하는 연산자입니다.
promises는 Promise.resolve('Mark')와 Promise.resolve(38)로 이루어진 Promise 배열입니다.
typeof promises는 이 배열의 타입을 나타내는 문자열을 반환합니다.
TypeScript에서는 이 경우에는 'object'가 반환됩니다. 그러나 실제로는 배열이므로 좀 더 정확한 타입 정보가 필요합니다.
*/
type Direction =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';

type Vertical = 'top' | 'bottom';
type Horizon = 'left' | 'right';

type Direction2 = Vertical | `${Vertical}${Capitalize<Horizon>}`;
