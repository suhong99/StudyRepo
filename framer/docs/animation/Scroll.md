# [Scroll Animations](https://motion.dev/docs/react-scroll-animations#transform-other-values)

스크롤 애니메이션에는 두 가지 유형이 있습니다:

1. 스크롤 트리거(Scroll-triggered): 요소가 뷰포트에 들어올 때 일반 애니메이션이 실행됩니다.
2. 스크롤 연동(Scroll-linked): 값이 스크롤 진행 상황에 직접 연결됩니다.

Motion은 두 가지 유형의 애니메이션을 모두 지원합니다.

## Scroll-triggered animations

스크롤 트리거 애니메이션은 요소가 뷰포트에 들어오거나 나갈 때 실행되는 일반 애니메이션입니다.

Motion은 `whileInView` 속성을 제공하여 요소가 화면에 들어올 때 애니메이션 대상 또는 변수를 설정할 수 있습니다.

```tsx
<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} />
```

- **One-time animations**

  뷰포트 옵션을 사용하면 once: true 설정이 가능합니다. 이를 적용하면 요소가 한 번 뷰포트에 들어온 후 다시 나갈 때 애니메이션이 실행되지 않습니다.

  ```tsx
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  />
  ```

- **Changing scroll container**
  기본적으로 요소는 브라우저 창에 들어오거나 나갈 때 뷰포트 내에 있다고 간주됩니다. 그러나 다른 스크롤 가능한 요소의 ref를 제공하여 이 동작을 변경할 수 있습니다.

  ```tsx
  function Component() {
    const scrollRef = useRef(null);
    return (
      <div ref={scrollRef} style={{ overflow: "scroll" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ root: scrollRef }}
        />
      </div>
    );
  }
  ```

- **Setting state**
  [useInView](https://motion.dev/docs/react-use-in-view) 훅을 사용하면 motion 컴포넌트뿐만 아니라 일반 요소도 뷰포트에 들어오거나 나갈 때 상태를 변경할 수 있습니다.

## Scroll-linked animations

스크롤 연동 애니메이션은 `motion values`와 `useScroll 훅`을 사용하여 생성됩니다.

useScroll은 네 가지 motion value를 반환합니다.
두 개는 스크롤 오프셋을 픽셀 단위로 저장하며(scrollX, scrollY),
다른 두 개는 스크롤 진행률을 0에서 1 사이 값으로 저장합니다(scrollXProgress, scrollYProgress).

이러한 motion value는 특정 스타일에 직접 전달할 수 있습니다.
예를 들어, scrollYProgress 값을 scaleX에 전달하면 프로그레스 바로 활용할 수 있습니다.

```tsx
const { scrollYProgress } = useScroll();

return <motion.div style={{ scaleX: scrollYProgress }} />;
```

- **Value smoothing**
  `useSpring`을 통해서 값을 전달하면 부드러워 질 수 있다.

  ```tsx
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return <motion.div style={{ scaleX }} />;
  ```

- **Transform other values**

  useTransform 훅을 사용하면 진행률 motion 값을 활용하여 색상과 같은 다양한 값 사이를 쉽게 변환할 수 있습니다.

  ```tsx
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#f00", "#0f0", "#00f"]
  );

  return <motion.div style={{ backgroundColor }} />;
  ```
