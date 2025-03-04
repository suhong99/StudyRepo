# Animation

Motion for React는 매우 간단한 prop 기반 애니메이션부터 더 복잡한 오케스트레이션까지 다양한 방식으로 UI를 애니메이션화할 수 있습니다.

## Basic Animation

기본 애니메이션은 [<motion/> 컴퍼넌트](https://motion.dev/docs/react-motion-component)로 할 수 있습니다.

```
// framer-motion 사용시
import { motion } from 'framer-motion';

// 모션 사용시
import { motion } from "motion/react"
<motion.div animate={{ opacity: 1 }} />
```

## animation 가능한 값들 (Animatable values)

- 숫자: `0`, `100` 등.
- 숫자를 포함한 문자열: `"0vh"`, `"10px"` 등.
- 색상: Hex, RGBA, HSLA.
- 여러 개의 숫자 및/또는 색상을 포함한 복합 문자열 (예: `box-shadow`).
- `display`: `"none"` / `"block"`, `visibility`: `"hidden"` / `"visible"`.

### 타입 변환

- 일반적으로 값은 같은 유형 사이에서만 애니메이션화할 수 있습니다 (예: `"0px"` → `"100px"`).
- 색상은 Hex, RGBA, HSLA 사이에서 자유롭게 애니메이션화할 수 있습니다.
- 또한 `x`, `y`, `width`, `height`, `top`, `left`, `right`, `bottom`은 서로 다른 값 유형 간에 애니메이션화할 수 있습니다.

  ```tsx
  <motion.div initial={{ x: '100%' }} animate={{ x: 'calc(100vw - 50%)' }} />
  ```

- width와 height는 "auto" 값으로 애니메이션화할 수도 있습니다.

  ```tsx
  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} />
  ```

- **display 값을 "none"으로 변경하는 애니메이션을 추가하는 경우, 대신 visibility: "hidden"을 사용**하세요.
  display: none 상태에서는 요소의 크기를 측정할 수 없습니다.

### transform

- CSS와 달리, Motion은 각 변형(transform) 축을 개별적으로 애니메이션화할 수 있습니다.

- 속성

  - **이동(Translate):** `x`, `y`, `z`
  - **확대/축소(Scale):** `scale`, `scaleX`, `scaleY`
  - **회전(Rotate):** `rotate`, `rotateX`, `rotateY`, `rotateZ`
  - **기울기(Skew):** `skew`, `skewX`, `skewY`
  - **원근(Perspective):** `transformPerspective`

- Motion 컴포넌트는 향상된 `style` props를 제공하여 개별 변형(transform)을 설정할 수 있습니다.

  ```tsx
  <motion.section style={{ x: -20 }} />
  ```

- transform을 독립적으로 애니메이션화하면 특히 제스처와 관련하여 높은 유연성을 제공합니다.

  ```tsx
  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
  ```

- 독립적인 변형도 성능이 뛰어나지만, Motion의 하이브리드 엔진은 transform을 직접 설정했을 때는 하드웨어 가속도 제공합니다.

  ```tsx
  <motion.li
    initial={{ transform: 'translateX(-100px)' }}
    animate={{ transform: 'translateX(0px)' }}
    transition={{ type: 'spring' }}
  />
  ```

- SVG 컴포넌트의 x 및 y 속성은 attrX 및 attrY로 설정할 수 있습니다.

### 회전축(transform-origin)

- `transform-origin`에는 개별적으로 설정하고 애니메이션화할 수 있는 세 가지 단축 값이 있습니다

  - `originX`
  - `originY`
  - `originZ`

- `originX`와 `originY`는 숫자로 설정할 경우 기본적으로 `0`에서 `1` 사이의 진행 값으로 설정됩니다.
- `originZ`는 기본적으로 픽셀 값으로 설정됩니다.

```tsx
<motion.div style={{ originX: 0.5 }} />
```

### css 변수

Motion for React는 CSS 변수의 값을 애니메이션화할 수 있으며, CSS 변수를 애니메이션 대상(target)으로 사용할 수 있습니다.

- 때로는 여러 자식 요소를 애니메이션화하기 위해 CSS 변수를 애니메이션화하는 것이 편리합니다.

  ```tsx
  <motion.ul
    initial={{ '--rotate': '0deg' }}
    animate={{ '--rotate': '360deg' }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <li style={{ transform: 'rotate(var(--rotate))' }} />
    <li style={{ transform: 'rotate(var(--rotate))' }} />
    <li style={{ transform: 'rotate(var(--rotate))' }} />
  </motion.ul>
  ```

  다만 **CSS 변수의 값을 애니메이션화하면 항상 페인트(paint)가 트리거**되므로, 이러한 종류의 애니메이션을 설정할 때 MotionValues를 사용하는 것이 더 성능 면에서 유리할 수 있습니다.

- HTML `motion` 컴포넌트는 CSS 변수를 애니메이션 대상으로 사용할 수 있습니다.

  ```tsx
  <motion.li animate={{ backgroundColor: 'var(--action-bg)' }} />
  ```

### SVG 그리기

- 선 그리기 애니메이션은 세 가지 특수 속성인 `pathLength`, `pathSpacing`, `pathOffset`을 사용하여 여러 SVG 요소로 만들 수 있습니다.
- 세 가지 속성 모두 `0`과 `1` 사이의 진행 값으로 설정되며, `1`은 경로의 전체 길이를 나타냅니다.
- 경로 애니메이션은 `circle`, `ellipse`, `line`, `path`, `polygon`, `polyline`, `rect` 요소와 호환됩니다.

## transition

기본적으로, Motion은 애니메이션되는 값의 유형에 따라 적절한 전환을 생성하여 빠르고 반응적인 애니메이션을 만듭니다.  
예를 들어, `x`나 `scale`과 같은 물리적 속성은 spring 물리학을 사용하여 애니메이션화되고, `opacity`나 `color`와 같은 값은 시간 기반의 easing 곡선을 사용하여 애니메이션화됩니다.  
그러나 `transition` prop을 통해 자신만의 애니메이션을 정의할 수 있습니다.

```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{ ease: 'easeOut', duration: 2 }}
/>
```

## Enter animations

- 모션 컴포넌트가 처음 생성될 때, 만약 `animate`에 지정된 값이 처음 렌더링된 값과 다르면 자동으로 애니메이션이 실행됩니다. 이는 CSS나 `initial` prop을 통해 설정할 수 있습니다.

  ```tsx
  <motion.li
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
  />
  ```

- `initial={false}`를 설정하여 진입 애니메이션을 완전히 비활성화할 수도 있습니다. 이렇게 하면 요소는 `animate`에서 정의된 값으로 렌더링됩니다.

  ```tsx
  <motion.div initial={false} animate={{ y: 100 }} />
  ```

## Exit animations

DOM에서 제거될 때도 `AnimatePresence` 컴퍼넌트를 활용하여서 exit animation을 줄 수 있다.

```tsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

## Keyframes

- `animate`의 값은 일련의 키프레임으로 설정할 수 있습니다. 이를 통해 각 값을 순차적으로 애니메이션화할 수 있습니다.

  ```tsx
  <motion.div animate={{ x: [0, 100, 0] }} />
  ```

- 초기 상태를 첫 번째 키프레임으로 사용하려면 `null`로 설정할 수 있습니다.

  ```tsx
  <motion.div animate={{ x: [null, 100, 0] }} />
  ```

  이렇게 하면 키프레임 애니메이션이 다른 애니메이션을 방해할 때 전환이 더 자연스럽게 느껴집니다.

- 기본적으로 각 키프레임은 애니메이션 전체에서 균등하게 배치됩니다.  
  이를 변경하려면 `transition`의 `times` 옵션을 설정하면 됩니다.

- `times`는 `0`에서 `1` 사이의 진행률 값을 가진 배열로, 각 키프레임이 애니메이션에서 어디에 위치해야 하는지를 정의합니다.
  진행률로 이해하면 편하다. duration이 주어졌을 때 index에 해당하는 애니메이션이 1을 기준으로 얼만큼 왔는지를 times 배열에 담으면 됨
  ```
  <motion.div
  animate={{
    x: [0, 100, 0],
    transition: {duration : 3,   times: [0, 0.3, 1] }
  }}
  />
  ```
  처음 x: 100으로 갈떄는 3\*0.3 인 0.9초가 걸리고 되돌아 올 떄는 2.1초가 걸림

## Gesture animations

- React Motion은 제스처가 `시작되거나 끝`날 때 `특정 대상에서 혹은 까지` 애니메이션할 수 있도록 하는 단축 속성을 제공합니다.

  ```tsx
  <motion.button
    initial={{ opacity: 0 }}
    whileHover={{ backgroundColor: 'rgba(220, 220, 220, 1)' }} // 마우스를 올렸을 때 색 변경
    whileTap={{ backgroundColor: 'rgba(255, 255, 255, 1)' }} // 클릭했을 때 색 변경
    whileInView={{ opacity: 1 }} // 화면에 보일 때 투명도를 1로 변경
  />
  ```

- hover (호버)
- tap (클릭)
- drag (드래그)
- focus (포커스)
- inView (화면에 보일 때)

## Variants

간단한 애니메이션은 `animate`로 지정할 수 있다. 하지만 복잡한 애니메이션을 줄 때 편의를 위해 사용할 수 있는게 `Variants`다
`variants`는 타겟들의 이름의 집합이다.

- variants은 애니메이션 대상이 정의될 수 있는 모든 곳에서 라벨로 참조할 수 있습니다.

```tsx
const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

<motion.div variants={variants} initial="hidden" whileInView="visible" />;
```

- 또한 복수의 variant를 쓰려면 배열을 통해 사용할 수 있다.

```tsx
animate={["visible", "danger"]}
```

### Propagation

Variants(변형)는 motion 컴포넌트를 통해 전파됩니다.
즉, 부모 요소(motion.ul)에 whileInView="visible"을 설정하면, 자식 요소(motion.li)들도 visible 변형을 자동으로 적용받아 애니메이션됩니다.

```tsx
const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

return (
  <motion.ul initial="hidden" whileInView="visible" variants={list}>
    <motion.li variants={item} />
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
);
```

### Orchestration

기본적으로 자식 요소의 애니메이션은 부모 요소와 동시에 시작됩니다.
하지만 Variants(변형)를 사용하면 when, delayChildren, staggerChildren, staggerDirection 같은 새로운 transition 속성을 활용할 수 있습니다.

- when: 자식 애니메이션이 부모보다 먼저 시작할지, 나중에 시작할지 결정
- delayChildren: 자식 요소들의 애니메이션을 지연(초 단위)
- staggerChildren: 자식 요소들의 애니메이션을 일정한 간격으로 순차적으로 실행
- staggerDirection: 자식 요소의 애니메이션 순서를 정방향(1) 또는 역방향(-1)으로 설정

```tsx
const list = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3, // Stagger children by .3 seconds
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};
```

### Dynamic variants

- Variant는 함수로 정의할 수 있으며, 해당 Variant가 활성화될 때 실행됩니다.
  아래 함수는 index 값을 받아서, 각 요소의 애니메이션을 개별적으로 다르게 설정할 수 있도록 합니다.

  ```tsx

  const variants = {
  hidden: { opacity: 0 },
  visible: (index: number) => ({
  opacity: 1,
  transition: { delay: index \* 0.3 }, // index에 따라 지연 시간 조정
  }),
  }
  ```

- `custom` prop을 활용한 개별 애니메이션 적용

  ```tsx
  {
    items.map((item, index) => (
      <motion.div custom={index} variants={variants} />
    ));
  }
  ```

  custom={index}를 전달하면 variants.visible(index)에서 index 값을 사용할 수 있습니다.
  즉, 리스트의 각 요소가 순차적으로 나타나도록 delay 값을 조정할 수 있습니다.

## Animation controls

선언적인 애니메이션은 대부분의 UI 상호작용에 적합하지만, 때때로 애니메이션 재생을 수동으로 제어해야 할 때가 있습니다.

- `useAnimate hook`

  - motion 컴포넌트뿐만 아니라 모든 HTML/SVG 요소에 애니메이션 적용
  - 복잡한 애니메이션 시퀀스 구현
  - 시간, 속도, play(), pause() 등 재생 컨트롤을 통한 애니메이션 제어

  ```tsx
  function MyComponent() {
    const [scope, animate] = useAnimate();

    useEffect(() => {
      const controls = animate([
        [scope.current, { x: '100%' }],
        ['li', { opacity: 1 }],
      ]);

      controls.speed = 0.8;

      return () => controls.stop();
    }, []);

    return (
      <ul ref={scope}>
        <li />
        <li />
        <li />
      </ul>
    );
  }
  ```

##

motion 컴포넌트의 자식으로 `MotionValue`를 전달하면 해당 값을 HTML에 최신 상태로 렌더링할 수 있다.

```tsx
import { useMotionValue, motion, animate } from 'motion/react';

function Counter() {
  const count = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, 100, { duration: 5 });
    return () => controls.stop();
  }, []);

  return <motion.pre>{count}</motion.pre>;
}
```

이 방식은 motion 컴포넌트가 innerHTML을 직접 설정하므로, React 상태를 사용하는 것보다 성능이 좋습니다.
