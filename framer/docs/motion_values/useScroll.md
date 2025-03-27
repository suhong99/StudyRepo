# useScroll

`useScroll`은 진행 표시기(progress indicators) 및 패럴랙스 효과(parallax effects)와 같은 **스크롤 연동 애니메이션**을 만드는 데 사용됩니다.

```tsx
const { scrollYProgress } = useScroll();

return <motion.div style={{ scaleX: scrollYProgress }} />;
```

# 사용법

```jsx
import { useScroll } from "motion/react";
```

useScroll은 네 개의 [motion 값](https://motion.dev/docs/react-motion-value)을 반환합니다:

- scrollX / scrollY: 절대적인 스크롤 위치(픽셀 단위).
- scrollXProgress / scrollYProgress: 정의된 오프셋 사이의 스크롤 위치(0과 1 사이의 값).

## Page scroll

기본적으로 `useScroll`은 페이지 스크롤을 추적합니다.

```tsx
const { scrollY } = useScroll();

useMotionValueEvent(scrollY, "change", (latest) => {
  console.log("Page scroll: ", latest);
});
```

예를 들어, `scrollYProgress`를 그대로 진행 표시줄의 scaleX 스타일에 전달하여 페이지 스크롤 인디케이터를 만들 수 있습니다.

````tsx
const { scrollYProgress } = useScroll()

return <motion.div style={{ scaleX: scrollYProgress }} />```
````

`useScroll`은 motion 값을 반환하기 때문에, 이를 `useTransform` 및 `useSpring과` 같은 다른 motion 값 훅과 결합하여 사용할 수 있습니다.

```tsx
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress);

return <motion.div style={{ scaleX }} />;
```

scrollY는 MotionValue이므로, 사용자의 스크롤 방향이 변경될 때 감지하는 간단한 방법을 사용할 수 있습니다:

```tsx
const { scrollY } = useScroll();
const [scrollDirection, setScrollDirection] = useState("down");

useMotionValueEvent(scrollY, "change", (current) => {
  const diff = current - scrollY.getPrevious();
  setScrollDirection(diff > 0 ? "down" : "up");
});
```

이 방법은 고정 헤더(sticky header) 애니메이션을 트리거하는 데 적합합니다.

## Element scroll

스크롤 가능한 요소의 스크롤 위치를 추적하려면, 해당 요소의 ref를 `useScroll`의 container 옵션에 전달할 수 있습니다.

```tsx
const carouselRef = useRef(null);
const { scrollX } = useScroll({
  container: carouselRef,
});

return (
  <div ref={carouselRef} style={{ overflow: "scroll" }}>
    {children}
  </div>
);
```

## Element position

target 옵션에 요소의 ref를 전달하면, 컨테이너 내에서 요소의 진행 상태(scroll progress)를 추적할 수 있습니다.

```jsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end end"],
});

return <div ref={ref}>...</div>;
```

## Scroll offsets

offset 옵션을 사용하면, 뷰포트(viewport)와 비교하여 요소의 어느 부분을 추적할지 정의할 수 있습니다.
예를 들어, 요소가 아래에서 들어올 때, 위에서 나갈 때, 또는 전체 뷰포트를 통과할 때 추적할 수 있습니다.

# API

- **container**  
  기본값: 브라우저 창

  스크롤 위치를 추적할 스크롤 가능한 컨테이너입니다. 기본적으로 이는 브라우저의 뷰포트입니다.
  하지만 다른 스크롤 가능한 요소도 될 수 있습니다.

- **target**  
  기본값: 컨테이너의 스크롤 가능한 영역

  이 옵션은 기본적으로 컨테이너의 스크롤 가능한 영역입니다. 또한 다른 요소로 설정하여 해당 요소의 뷰포트 내 진행 상태를 추적할 수 있습니다.

- **axis**  
  기본값: "y"

  오프셋을 적용할 스크롤 축입니다.

- **offset**  
  기본값: ["start start", "end end"]
  `offset`은 대상 요소와 컨테이너가 만나는 지점을 정의하는 교차점을 설명합니다.
  예를 들어, 교차점 "start end"는 추적되는 축에서 대상의 시작이 컨테이너의 끝에 만날 때를 의미합니다.
  그래서 대상이 요소이고, 컨테이너가 창이라면, 수직 축을 추적할 때 "start end"는 요소의 상단이 뷰포트의 하단에 만나는 지점입니다.

  - 허용되는 교차점:
    대상과 컨테이너의 포인트는 다음과 같이 정의할 수 있습니다:

    - **숫자**: 값은 0이 축의 시작을, 1이 끝을 나타냅니다. 예를 들어, 대상의 상단을 컨테이너의 중간에 정의하려면 "0 0.5"로 정의할 수 있습니다. 이 범위를 벗어난 값도 허용됩니다.

    - **이름**: "start", "center", "end"는 각각 0, 0.5, 1을 나타내는 명확한 단축어로 사용할 수 있습니다.

    - **픽셀**: "100px", "-50px"와 같은 픽셀 값을 사용하여 대상/컨테이너의 시작 지점에서 해당 픽셀 수만큼 정의할 수 있습니다.

    - **백분율**: 숫자와 동일하지만 "0%"에서 "100%"로 표현됩니다.

    - **뷰포트**: "vh"와 "vw" 단위를 지원합니다.
