var errorArr = [
    { errorCode: '100', errorMessage: '텍스트' },
    { errorCode: '200', errorMessage: '토스트', toastShowDuration: 3000 },
    { errorCode: '300', errorMessage: '앨럿', onConfirm: function () { } },
];
var wrongErrorArr = [
    {
        errorCode: '900',
        errorMessage: '잘못된 에러',
        toastShowDuration: 3000,
        onConfirm: function () { }
    },
];
var errorArr2 = [
    { errorType: 'Text', errorCode: '100', errorMessage: '텍스트' },
    {
        errorType: 'Toast',
        errorCode: '200',
        errorMessage: '토스트',
        toastShowDuration: 3000
    },
    {
        errorType: 'Alert',
        errorCode: '300',
        errorMessage: '앨럿',
        onConfirm: function () { }
    },
];
var wrongErrorArr2 = [
    {
        errorType: 'Toast',
        errorCode: '900',
        errorMessage: '잘못된 에러',
        toastShowDuration: 3000
    },
];
var getProduction = function (productPrice) {
    if (productPrice === '10000')
        return '배민상품권 1만원';
    if (productPrice === '20000')
        return '배민상품권 2만원';
    // else exhaustiveCheck(productPrice); //'string' 형식의 인수는 'never' 형식의 매개 변수에 할당될 수 없습니다.ts(2345)
    return '배민상품권';
};
var getProduction2 = function (productPrice) {
    if (productPrice === '10000')
        return '배민상품권 1만원';
    if (productPrice === '20000')
        return '배민상품권 2만원';
    if (productPrice === '50000')
        return '배민상품권 5만원';
    else {
        exhaustiveCheck(productPrice);
        return '배민상품권';
    }
};
var exhaustiveCheck = function (param) {
    throw new Error('type Error!');
};
