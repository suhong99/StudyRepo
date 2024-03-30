# 실무에 바로 적용하는 프런트엔드 테스트 쇼핑몰 예제

<!-- TODO: need to update link -->

> 강의 링크: https://www.inflearn.com/

이 프로젝트는 "실무에 바로 적용하는 프런트엔드 테스트"에서 사용되는 예제입니다.

![image](https://github.com/jung-han/jung-han/assets/35371660/86f96b11-046d-42dd-bb8d-3b780698feeb)

## 사용 기술 스택

| Types      | Techs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Front      | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB) ![Tanstack Query](https://img.shields.io/badge/-tanstack%20Query-FF4154?style=flat&logo=react%20query&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=flat&logo=mui&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=flat&logo=reacthookform&logoColor=white) [zustand](https://github.com/pmndrs/zustand) |
| Server     | ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)                                                                                                                                                                                                                                                                                                                                                                                     |
| Build tool | ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                        |
| Test       | ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=flat&logo=cypress&logoColor=058a5e) ![Testing-Library](https://img.shields.io/badge/-Testing%20Library-%23E33332?style=flat&logo=testing-library&logoColor=white) ![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=flat&logo=storybook&logoColor=white) [MSW](https://mswjs.io/) [Chromatic](https://www.chromatic.com/)                                                                                           |

## 설명

### fireEvent란?

1. DOM 이벤트를 시뮬레이션 하기 위해 제공
2. 내장되어 있기 때문에 별도의 설치 없이 사용가능

```javascript
import { fireEvent } from '@testing-library/react';
fireEvent.click(getBytext(container, 'Submit'));
```

### userEvent와 구분 되는 이유

fireEvent : 단순하게 해당 이벤트만 디스패치함 --> 실제 이벤트와 거리가 있음  
실제 클릭 : pointerdown, mousedown, pointerup, mouseup, click, focus등의 이벤트가 연쇄적으로 발생

userEvent의 경우 disabled,display 상태도 고려하여 실제와 더 유사하게 테스트 가능함.

다만 userEvent가 불가능한 스크롤 같은 경우는 fireEvent 사용을 고려함

## 단위 테스트의 한계

#### 단위 테스트 사용

1. 단위테스트는 공통 컴포넌트, 커스텀 훅, 공통 유틸처럼 다른 모듈에 대한 의존성이 거의 없 때
2. 해당 모둘 자체만으로 작지만 독립적인 역할을 할 때

#### 단위 테스트의 한계

1. 여러 모듈이 조합되었을 때 발생하는 이슈는 찾을 수 없다.
2. 앱의 전반적인 기능이 비즈니스 요구사항에 맞게 동작하는지 보장할 수 없다.

--> 통합, E2E , 비쥬얼 테스트로 보완
