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

12번 : 11번에 제네릭이 섞인 경우

13번 : 시간과 관련된 모듈 등록. 함수 보고 매개변수 유추

14번 : 많이 어려웠고, 특히Bonus는 너무 막막했다.`

```ts
function toFunctional<T extends Function>(func: T): Function {
  const fullArgCount = func.length;
  function createSubFunction(curriedArgs: unknown[]) {
    return function (this: unknown) {
      const newCurriedArguments = curriedArgs.concat(Array.from(arguments));
      if (newCurriedArguments.length > fullArgCount) {
        throw new Error('Too many arguments');
      }
      if (newCurriedArguments.length === fullArgCount) {
        return func.apply(this, newCurriedArguments);
      }
      return createSubFunction(newCurriedArguments);
    };
  }
  return createSubFunction([]);
}
```

map, reduce등에 사용되는 공통 내용을 묶고 커링을 하는 방식에 대해서는 감탄했다. 함수형 프로그래밍이 왜 좋은 코드를 사용하는데 도움이 된다고 하는지 단편적으로나마 느낄 수 있었다.

15번 : 클래스를 generic과 섞어서 하는 문제. 유틸 타입을 만들어서 제네릭으로 props를 쉽게 받게 하였다.

    Want to improve your TypeScript skills further?

        1. Go through the TS Handbook:
            https://www.typescriptlang.org/docs/handbook/intro.html

        2. Most of the important updates are listed here:
            https://www.typescriptlang.org/docs/handbook/release-notes/overview.html

        3. Check out Effective TypeScript book:
            https://effectivetypescript.com/
