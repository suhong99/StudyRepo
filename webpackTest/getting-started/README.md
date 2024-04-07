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

### 웹팩 특징

모듈로 번들하기 때문에 request 횟수가 감소함.
![image](https://github.com/suhong99/StudyRepo/assets/120103909/abf7f8b4-b988-4f12-8616-9e1cf5607c2e)  
익명 함수로 관리함.

<br/>

[Webpack First Principle](https://www.youtube.com/watch?v=WQue1AN93YU)

### 웹팩의4가지 속성

[출처](https://joshua1988.github.io/webpack-guide/concepts/wrapup.html#concepts-review)

1. Entry 속성은 웹팩을 실행할 대상 파일. 진입점
2. Output 속성은 웹팩의 결과물에 대한 정보를 입력하는 속성. 일반적으로 filename과 path를 정의
3. Loader 속성은 CSS, 이미지와 같은 비 자바스크립트 파일을 웹팩이 인식할 수 있게 추가하는 속성. 로더는 오른쪽에서 왼쪽 순으로 적용
4. Plugin 속성은 웹팩으로 변환한 파일에 추가적인 기능을 더하고 싶을 때 사용하는 속성. 웹팩 변환 과정 전반에 대한 제어권을 갖고 있음
