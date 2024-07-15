# 타입스크립트 연습

https://typescript-exercises.github.io/

## 몰랐던 거

4번 : https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

5번 : partial로 user에서 type을 제외한 키 값을 통해 filter 하는 함수. Omit으로 type을 제거하고 Partial로 옵셔널 걸어주기

6번 : 함수 overload를 이용해서 구분,, 2번째 매개변수를 overload 구분용으로 쓰는게 좀 신기하고 처음봣다..

7번 : swap 함수에 USER ,ADMIN, string 이 오기 때문에, 제네릭을 활용해야 함.

8번 : Omit으로 하는 방식이 투박해서 다른방법이 있나 싶어 모범 답안을 봤는데, 동일해서 당황함...

9번 : User 혹은 Admin으로 API 요청을 할 떄, 결국 generic으로 구별하는 것. 이때 불필요하게 따로 선언했던 type은 제거했음

10번 : promise와 제네릭을 섞어서 만들어야함. 예제에서는 promiseAll까지도 보여준다.

11번 : 자바스크립트 모듈에 대해서 declare를 통해서 타입을 지정하는 작업
