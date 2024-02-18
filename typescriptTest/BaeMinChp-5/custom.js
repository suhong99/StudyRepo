var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var _a;
function withdraw(type) {
  //...
}
withdraw({ type: 'card', card: 'hyundai' });
var one = { card: 'hyunadi' };
function withdrawPick(type) {
  //. .
}
withdrawPick({ card: 'hyundaii' });
// withdrawPick({ card: 'hyundaii', account: 'test' });// error
// type NonNullable<T> = T extends null | undefined ? never : T;
function NonNullable(value) {
  return value !== null && value !== undefined;
}
var colors = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#F45452',
  green: '#0C952A',
  blue: '#1A7CFF',
};
var theme = {
  colors: __assign({ default: colors.black }, colors),
  backgroundColor: {
    default: colors.white,
    red: colors.red,
    green: colors.green,
    black: colors.black,
  },
};
var foodByCategory = {
  한식: [{ name: '제육' }, { name: '뚝불' }],
  일식: [{ name: '초밥' }, { name: '텐동' }],
};
foodByCategory['양식']; //Food[] 로 추론
foodByCategory['양식'].map(function (food) {
  return console.log(food.name);
});
(_a = foodByCategory['양식']) === null || _a === void 0
  ? void 0
  : _a.map(function (food) {
      return console.log(food.name);
    });
var foodByCategory2 = {
  한식: [{ name: '제육' }, { name: '뚝불' }],
  일식: [{ name: '초밥' }, { name: '텐동' }],
};
foodByCategory2['양식'].map(function (food) {
  return console.log(food.name);
});
