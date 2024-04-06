#웹팩 설정

### 결과 파일 위치 변경하기

entry와 output활용

```js
// 노드 패스모듈 설명 : https://nodejs.org/api/path.html
module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### 웹팩을 사용하면 장점

모듈로 번들하기 때문에 request 횟수가 감소함.
