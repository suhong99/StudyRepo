
## 테스트 코드 참고 문헌
------------------------
- https://www.youtube.com/watch?v=q9d631Nl0_4   
 테스트를 신뢰하기 위해서
 ![image](https://github.com/suhong99/StudyRepo/assets/120103909/30356d77-2a96-4752-80d4-a5c1c7a4ce05)

하지만 HTML 테스트는 CSS를 확인할 수도 없고, 리팩토링에 도움이 되지도 않아서 신뢰성이 없다.    
따라서  HTML테스트보단 시각적 회귀 테스트가 유의미하다(픽셀 단위의 테스트).
하지만 시각적 회귀 테스트 또한 결과 관리가 어렵고 캡쳐 이미지의 신뢰성에도 문제가 있을 수 있음(이를 해결하기 위한 전무 도구들이 나옴)    
또한 시각적 테스트만으로 모든게 해결되진 않음 (TDD 힘듬, 특정환경에서만 됨, 속도 느림, 단일 테스트에 영향 주는 요소 실패 원인 파악 힘듬)   
![image](https://github.com/suhong99/StudyRepo/assets/120103909/2d848051-9d43-4f04-9e48-87d004436b28)

따라서 기능적 테스트를 해야하는데, 이떄 시각적 테스트와 기능적 테스트를 서로 구분해서 해야함(시각에선 시간만,)

단위테스트의 경우에도 불필요한 것을 최소화 해야함   
![image](https://github.com/suhong99/StudyRepo/assets/120103909/147d4df0-8659-48b6-a786-1e0f2378e759)   
(발표자는 Socialble 테스트를 선호한다고 함)
![image](https://github.com/suhong99/StudyRepo/assets/120103909/60f5ae67-000d-4666-9195-1205cd3622e1)
(컴퍼넌트 단위로 통합 테스트를 하는 것이 더 효율적이다.)   
![image](https://github.com/suhong99/StudyRepo/assets/120103909/53f0eaae-2c0c-477d-87d8-e4eb5bcae518)
![image](https://github.com/suhong99/StudyRepo/assets/120103909/946b0677-b051-4a0a-9f73-9cdc0591aed4)
![image](https://github.com/suhong99/StudyRepo/assets/120103909/f54a54f3-7f7c-4d06-826e-e01f28a4110c)





   
- https://www.youtube.com/watch?v=L1dtkLeIz-M
  <br/>
요약 : TDD는 결국 설계를 잘해야 하고, 요구사항에 대해서 명확하게 할 수 있고 타인이 테스트 코드만 봐도 이해할 수 있어서 좋다.   
귀찮지만 해야하는 이유 : 에러를 작은 단위에서 마주칠려고(작은똥) 
