type TextError = {
  errorCode: string;
  errorMessage: string;
};

type ToastError = {
  errorCode: string;
  errorMessage: string;
  toastShowDuration: number; //토스트 시간
};

type AlertError = {
  errorCode: string;
  errorMessage: string;
  onConfirm: () => void; // 확인 버튼 후 액션
};

type ErrorFeedbackType = TextError | ToastError | AlertError;
const errorArr: ErrorFeedbackType[] = [
  { errorCode: '100', errorMessage: '텍스트' },
  { errorCode: '200', errorMessage: '토스트', toastShowDuration: 3000 },
  { errorCode: '300', errorMessage: '앨럿', onConfirm: () => {} },
];

const wrongErrorArr: ErrorFeedbackType[] = [
  {
    errorCode: '900',
    errorMessage: '잘못된 에러',
    toastShowDuration: 3000,
    onConfirm: () => {},
  },
];

type TextError2 = {
  errorType: 'Text';
  errorCode: string;
  errorMessage: string;
};

type ToastError2 = {
  errorType: 'Toast';
  errorCode: string;
  errorMessage: string;
  toastShowDuration: number; //토스트 시간
};

type AlertError2 = {
  errorType: 'Alert';
  errorCode: string;
  errorMessage: string;
  onConfirm: () => void; // 확인 버튼 후 액션
};

type ErrorFeedbackType2 = TextError2 | ToastError2 | AlertError2;
const errorArr2: ErrorFeedbackType2[] = [
  { errorType: 'Text', errorCode: '100', errorMessage: '텍스트' },
  {
    errorType: 'Toast',
    errorCode: '200',
    errorMessage: '토스트',
    toastShowDuration: 3000,
  },
  {
    errorType: 'Alert',
    errorCode: '300',
    errorMessage: '앨럿',
    onConfirm: () => {},
  },
];

const wrongErrorArr2: ErrorFeedbackType2[] = [
  {
    errorType: 'Toast',
    errorCode: '900',
    errorMessage: '잘못된 에러',
    toastShowDuration: 3000,
    // onConfirm: () => {}, //개체 리터럴은 알려진 속성만 지정할 수 있으며 'ToastError2' 형식에 'onConfirm'이(가) 없습니다
  },
];

type ProductPrice = '10000' | '20000' | '50000';

const getProduction = (productPrice: ProductPrice): string => {
  if (productPrice === '10000') return '배민상품권 1만원';
  if (productPrice === '20000') return '배민상품권 2만원';
  // else exhaustiveCheck(productPrice); //'string' 형식의 인수는 'never' 형식의 매개 변수에 할당될 수 없습니다.ts(2345)
  return '배민상품권';
};

const getProduction2 = (productPrice: ProductPrice): string => {
  if (productPrice === '10000') return '배민상품권 1만원';
  if (productPrice === '20000') return '배민상품권 2만원';
  if (productPrice === '50000') return '배민상품권 5만원';
  else {
    exhaustiveCheck(productPrice);
    return '배민상품권';
  }
};

const exhaustiveCheck = (param: never) => {
  throw new Error('type Error!');
};
