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

### 웹팩이 해결하려는 문제

1. 자바스크립트 변수 유효 범위
2. 브라우저별 HTTP 요청 숫자의 제약
3. 사용하지 않는 코드의 관리
4. Dynamic Loading & Lazy Loading 미지원
