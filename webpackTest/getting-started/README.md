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

### 웹팩 특징

모듈로 번들하기 때문에 request 횟수가 감소함.
![image](https://github.com/suhong99/StudyRepo/assets/120103909/abf7f8b4-b988-4f12-8616-9e1cf5607c2e)  
익명 함수로 관리함.   
<br/>
Webpack First Principle : [https://www.youtube.com/watch?v=WQue1AN93YU]
