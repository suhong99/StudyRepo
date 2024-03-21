# 테트리스 클론(타입적용)

[참고 영상](https://www.youtube.com/watch?v=_xGETajBA98)

## 목표

    1. 테트리스 클론코딩을 통해 웹게임 개발해보기, vanillaJS 익숙해지기, 타입스크립트 학습하기
    2. JS 기반의 강의를 TS로 변환하면서 TS에 익숙해지기
    3. Develop 해보기

## 시연 영상

![GIFMaker_me](https://github.com/suhong99/StudyRepo/assets/120103909/0eb9560e-e000-4a05-948f-2003ac6f6d1a)

## 코드 리뷰

index.html의 app이라는 div에서 main.ts를 사용하여 구현함  
main.ts에서는 Phaser 라이브러리를 사용하여, app을 부모로 두고 MainScene클래스를 400\*800px로 랜더링함

`Phaser.Scene`
