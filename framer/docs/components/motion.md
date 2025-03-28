# [motion](https://motion.dev/docs/react-motion-component)
  React의 Motion에서 대부분의 애니메이션을 구동하는 핵심 요소입니다.  
  모든 HTML 및 SVG 요소에 대해 `motion` 컴포넌트가 제공됩니다.  
  예를 들어 `motion.div`, `motion.circle` 등이 있으며, 이는 일반적인 React 컴포넌트에  
  120fps 애니메이션과 동작(gesture) 기능이 추가된 형태로 생각할 수 있습니다.


## 사용법

Motion에서 `motion`을 import
```tsx
// React
import { motion } from "motion/react"

// React Server Components
import * as motion from "motion/react-client"
```
이제 `motion`을 일반 HTML/SVG 컴포넌트처럼 사용할 수 있습니다.

```tsx
<motion.div className="box" />
```
또한 motion을 사용하면 강력한 애니메이션 API도 활용할 수 있습니다.
```tsx
<motion.div
  className="box"
  // Animate when this value changes:
  animate={{ scale: 2 }}
  // Fade in when the element enters the viewport:
  whileInView={{ opacity: 1 }}
  // Animate the component when its layout changes:
  layout
  // Style now supports indepedent transforms:
  style={{ x: 100 }}
/>
```

### 성능
Motion 컴포넌트는 React의 렌더링 사이클 외부에서 값을 애니메이션하여 성능을 향상시킵니다.  
React 상태 대신 `motion` 값을 사용하여 `스타일`을 업데이트하면 불필요한 리렌더링을 방지할 수 있습니다.  
```tsx
const x = useMotionValue(0)

useEffect(() => {
  // Won't trigger a re-render!
  const timeout = setTimeout(() => x.set(100), 1000)

  return () => clearTimeout(timeout)
}, [])

return <motion.div style={{ x }} />
```

### SSR(Server-side rendering)
Motion 컴포넌트는 서버 사이드 렌더링(SSR)과 완전히 호환되므로, 초기 상태가 서버에서 생성된 출력에 반영됩니다.  

```tsx
// 서버에서 `translateX(100px)`을 출력합니다.
<motion.div initial={false} animate={{ x: 100 }} />
```
단, transform과 같은 일부 SVG 속성은 DOM 측정을 필요로 하므로 예외가 발생할 수 있습니다

### Custom components
모든 React 컴포넌트는 `motion.create()`를 사용하여 Motion 컴포넌트로 확장할 수 있습니다.
```tsx
const MotionComponent = motion.create(Component)
```

React 18 사용자는 `forwardRef`를 사용하여 컴포넌트를 감싸고, 애니메이션할 요소에 `ref`를 전달해야 합니다.
```tsx
const Component = React.forwardRef((props, ref) => {
  return <div ref={ref} />
})
```

React 19 사용자부터는 그냥 props에 전달하면 된다.
```tsx
const Component = (props) => {
  return <div ref={props.ref} />
})
```
- **중요: `motion.create()`를 React 렌더 함수 내에서 호출하지 마세요!**  
  이를 호출하면 매 렌더마다 새로운 컴포넌트가 생성되어 애니메이션이 깨질 수 있습니다.

또한, 문자열을 `motion.create`에 전달하여 사용자 정의 DOM 요소를 만들 수도 있습니다.
```tsx
// Will render <custom-element /> into HTML
const MotionComponent = motion.create('custom-element')

```
기본적으로 animate 등의 모든 motion 속성은 제공된 컴포넌트로 전달되는 속성에서 필터링됩니다. forwardMotionProps 설정을 제공하면, 해당 컴포넌트는 이러한 속성을 받게 됩니다.

```tsx
motion.create(Component, { forwardMotionProps: true })
```

## Props

### Animation

- **initial**  
  motion 컴포넌트의 초기 시각적 상태를 설정합니다.
  애니메이션 대상 값을 직접 지정할 수 있습니다.

  ```tsx
  <motion.section initial={{ opacity: 0, x: 0 }} />
  ```

  또는 변수를 사용할 수도 있습니다:

  ```tsx
  <motion.li initial="visible" />
  <motion.div initial={["visible", "active"]} />
  ```
  false로 설정하면 진입 애니메이션을 비활성화하고 animate에 지정된 값으로 초기 렌더링됩니다.

  ```tsx
    <motion.div initial={false} animate={{ opacity: 0 }} />
  ```

- **animate**  
  컴포넌트가 처음 렌더링될 때 및 업데이트될 때 적용할 애니메이션 목표 값을 설정합니다.
  애니메이션 대상 값을 직접 지정할 수 있습니다.

  ```tsx
  <motion.div
    initial={{ boxShadow: "0px 0px #000" }}
    animate={{ boxShadow: "10px 10px #000" }}
  />
  ```
  또는 변수를 사용할 수도 있습니다.
  
  ```tsx
    <motion.li animate="visible" />
    <motion.div initial="hidden" animate={["visible", "active"]} />
  ```

  - **exit**  
  컴포넌트가 트리에서 제거될 때 적용할 애니메이션 목표 값을 설정합니다. 애니메이션 대상 값을 직접 지정하거나 변수를 사용할 수 있습니다.

  > **참고:** React의 제한 사항으로 인해, 애니메이션을 적용하려면 제거되는 컴포넌트가 `AnimatePresence`의 직접적인 자식이어야 합니다.

  ```tsx
  <AnimatePresence>
    {isVisible && (
      <ul key="list">
        <motion.li exit={{ opacity: 0 }} />
      </ul>
    )}
  </AnimatePresence>
  ```

  - **transition**  
  `animate`, `whileHover` 등의 애니메이션 속성에 별도의 `transition`이 정의되지 않았을 때, 해당 컴포넌트에서 사용할 기본 전환 효과를 설정합니다.

  ```tsx
  <motion.div transition={{ type: "spring" }} animate={{ scale: 1.2 }} />
  ```

  - **variants**  
  해당 컴포넌트에서 사용할 변수(variant)를 정의합니다.

  ```tsx
  const variants = {
    active: {
      backgroundColor: "#f00"
    },
    inactive: {
      backgroundColor: "#fff",
      transition: { duration: 2 }
    }
  }

  return (
    <motion.div
      variants={variants}
      animate={isActive ? "active" : "inactive"}
    />
  )
  ```

- **style**  
  일반적인 React DOM의 `style` prop을 사용하며, motion 값과 독립적인 변환(transform)을 추가로 지원합니다.

  ```tsx
  const x = useMotionValue(30);

  return <motion.div style={{ x, rotate: 90, originX: 0.5 }} />;
  ```

- **onUpdate**  
  motion 컴포넌트의 값이 업데이트될 때마다 프레임마다 호출되는 콜백입니다.  
  최신 값을 인자로 제공합니다.

  ```tsx
  <motion.article
    animate={{ opacity: 1 }}
    onUpdate={latest => console.log(latest.opacity)}
  />
  ```

- **onAnimationStart**  
  레이아웃 애니메이션을 제외한 모든 애니메이션이 시작될 때 호출되는 콜백입니다.  
  시작된 애니메이션의 타겟 또는 변수(variant) 이름을 인자로 제공합니다.

  ```tsx
  <motion.circle
    animate={{ r: 10 }}
    onAnimationStart={latest => console.log(latest.r)}
  />
  ```

- **onAnimationComplete**  
  레이아웃 애니메이션을 제외한 모든 애니메이션이 완료될 때 호출되는 콜백입니다.  
  완료된 애니메이션의 타겟 또는 변수(variant) 이름을 인자로 제공합니다.

  ```tsx
  <motion.circle
    animate={{ r: 10 }}
    onAnimationComplete={latest => console.log(latest.r)}
  />
  ```

## Hover

- **whileHover**  
  호버 제스처가 활성화된 동안 적용될 타겟 또는 변수(variants).

  ```tsx
  // 타겟으로 사용
  <motion.button whileHover={{ scale: 1.2 }} />

  // 변수로 사용
  <motion.div whileHover="hovered" />
  ```

- **onHoverStart**  
  호버가 시작될 때 실행되는 콜백 함수입니다. 이 함수는 트리거된 `PointerEvent`를 인자로 받습니다.

  ```tsx
  <motion.div onHoverStart={(event) => console.log(event)} />
  ```

- **onHoverEnd**  
  호버가 끝날 때 실행되는 콜백 함수입니다. 이 함수는 트리거된 `PointerEvent`를 인자로 받습니다.

  ```tsx
  <motion.div onHoverEnd={(event) => console.log(event)} />
  ```

### Tap
- **whileTap**  
  탭 제스처가 활성화된 동안 적용할 타겟 또는 변수(variants)를 설정합니다.

  ```tsx
  // 타겟으로 사용
  <motion.button whileTap={{ scale: 0.9 }} />
  
  // 변수로 사용
  <motion.div whileTap="tapped" />
  ```

- **onTapStart**  
  사용자가 컴포넌트를 누르기 시작할 때 실행되는 콜백 함수입니다. 이 함수는 트리거된 `PointerEvent`를 인자로 받습니다.

  ```tsx
  <motion.div onTapStart={(event) => console.log(event)} />
  ```

- **onTapCancel**  
  사용자가 컴포넌스를 누르고 있다가, 포인터가 컴포넌스 밖으로 나가면서 눌렀던 것이 취소될 때 실행되는 콜백 함수입니다. 이 함수는 트리거된 `PointerEvent`를 인자로 받습니다.

  ```tsx
  <motion.div onTapCancel={(event) => console.log(event)} /
  ```

### Focus

- **whileFocus**  
  포커스가 활성화된 동안 적용되는 대상이나 변수입니다.

  ```tsx
  // 대상으로 사용
  <motion.button whileFocus={{ outline: "dashed #000" }} />
  // 변수로 사용
  <motion.div whileFocus="focused" />

  ```

### Pan

- **onPan**  
  이 요소에서 팬 제스처가 인식되었을 때 실행되는 콜백 함수입니다.
  > 팬 제스처가 터치 입력과 제대로 작동하려면 요소에서 x/y 축 또는 둘 다에 대해 [touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action) CSS 규칙으로 터치 스크롤링을 비활성화해야 합니다.

  ```tsx
  function onPan(event, info) {
    console.log(info.point.x, info.point.y)
  }

  <motion.div onPan={onPan} />
  ```

  팬과 드래그 이벤트는 원래 PointerEvent와 info 객체를 제공하며, info 객체는 다음 값을 포함합니다:
  - point: 장치나 페이지를 기준으로 한 상대적 좌표입니다.
  - delta: 마지막 이벤트 이후의 거리입니다.
  - offset: 원래 이벤트로부터의 거리입니다.
  - velocity: 포인터의 현재 속도입니다.

- **onPanStart**  
  팬 제스처가 시작될 때 실행되는 콜백 함수입니다. 이 함수는 트리거된 `PointerEvent`와 `info` 객체를 인자로 받습니다.

  ```tsx
  <motion.div onPanStart={(event, info) => console.log(info.delta.x)} />
  ```
