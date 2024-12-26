# State 관리하기

리엑트에서는 상호작용을 선언적으로 다루려고 한다. 이때 필요한 최소한의 state를 통해서 보여주고 싶은 UI를 관리할 수 있다.

- State 구조화 원칙

1. 연관된 state 그룹화하기
2. State의 모순 피하기
3. 불필요한 state 피하기
4. State의 중복 피하기
5. 깊게 중첩된 state 피하기.

목표 : 오류 없이 상태를 쉽게 업데이트하는 것

## State보존하고 초기화 하기

1. React는 같은 컴포넌트가 같은 자리에 렌더링되는 한 state를 유지합니다.
2. state는 JSX 태그에 저장되지 않습니다. state는 JSX으로 만든 트리 위치와 연관됩니다.
3. 컴포넌트에 다른 key를 주어서 그 하위 트리를 초기화하도록 강제할 수 있습니다.
4. 중첩해서 컴포넌트를 정의하면 원치 않게 state가 초기화될 수 있기 때문에 그렇게 하지 마세요.

```ts
// key를 활용해 초기화 예시
export default function StateByKey() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  const player = isPlayerA ? 'Taylor' : 'Sarah';

  return (
    <div>
      <Counter key={player} person={player} />
      <Counter key="1" person={player} />

      <button
        onClick={() => {
          setIsPlayerA(!isPlayerA);
        }}
      >
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }: { person: string }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>
        {person}'s score: {score}
      </h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}
```

## useState와 useReducer 비교

useState와 useReducer 비교하기
reducer가 좋은 점만 있는 것은 아닙니다! 아래에서 useState와 useReducer를 비교할 수 있는 몇 가지 방법을 소개하겠습니다.

코드 크기: 일반적으로 useState를 사용하면, 미리 작성해야 하는 코드가 줄어듭니다. useReducer를 사용하면 reducer 함수 그리고 action을 전달하는 부분 둘 다 작성해야 합니다. 하지만 여러 이벤트 핸들러에서 비슷한 방식으로 state를 업데이트하는 경우, useReducer를 사용하면 코드의 양을 줄이는 데 도움이 될 수 있습니다.

가독성: useState로 간단한 state를 업데이트하는 경우 가독성이 좋은 편입니다. 그렇지만 더 복잡한 구조의 state를 다루게 되면 컴포넌트의 코드 양이 더 많아져 한눈에 읽기 어려워질 수 있습니다. 이 경우 useReducer를 사용하면 업데이트 로직이 어떻게 동작하는지와 이벤트 핸들러를 통해서 무엇이 발생했는지 구현한 부분을 명확하게 구분할 수 있습니다.

디버깅: useState를 사용하며 버그를 발견했을 때, 왜, 어디서 state가 잘못 설정됐는지 찾기 어려울 수 있습니다. useReducer를 사용하면, 콘솔 로그를 reducer에 추가하여 state가 업데이트되는 모든 부분과 왜 해당 버그가 발생했는지(어떤 action으로 인한 것인지)를 확인할 수 있습니다. 각 action이 올바르게 작성되어 있다면, 버그를 발생시킨 부분이 reducer 로직 자체에 있다는 것을 알 수 있을 것입니다. 그렇지만 useState를 사용하는 경우보다 더 많은 코드를 단계별로 실행해서 디버깅 해야 하는 점이 있기도 합니다.

테스팅: reducer는 컴포넌트에 의존하지 않는 순수 함수입니다. 이는 reducer를 독립적으로 분리해서 내보내거나 테스트할 수 있다는 것을 의미합니다. 일반적으로 더 현실적인 환경에서 컴포넌트를 테스트하는 것이 좋지만, 복잡한 state를 업데이트하는 로직의 경우 reducer가 특정 초기 state 및 action에 대해 특정 state를 반환한다고 생각하고 테스트하는 것이 유용할 수 있습니다.

개인적인 취향: reducer를 좋아하는 사람도 있지만, 그렇지 않는 사람들도 있습니다. 괜찮습니다. 이건 선호도의 문제이니까요. useState와 useReducer는 동일한 방식이기 때문에 언제나 마음대로 바꿔서 사용해도 무방합니다.
