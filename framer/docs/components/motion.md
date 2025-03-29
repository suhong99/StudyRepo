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

- **onPanEnd**  
  팬 제스처가 끝날 때 실행되는 콜백 함수입니다. 이 함수는 트리거된 `PointerEvent`와 `info` 객체를 인자로 받습니다.

  ```tsx
  <motion.div onPanEnd={(event, info) => console.log(info.delta.x)} />
  ```

### Drag

- **drag**  
  기본값: `false`  

  이 요소에 드래그 기능을 활성화합니다. `true`로 설정하면 모든 방향으로 드래그할 수 있습니다. `"x"` 또는 `"y"`로 설정하면 특정 방향으로만 드래그할 수 있습니다.

  ```tsx
  <motion.div drag />
  ```

- **whileDrag**  
  드래그 제스처가 활성화되는 동안 적용할 대상 또는 변수(variants)입니다.  

  ```tsx
  // 대상(Target)으로 사용  
  <motion.div drag whileDrag={{ scale: 0.9 }} />
  // 변수(variants)로 사용
  <motion.div drag whileDrag="dragging" />
  ```

- **dragConstraints**  
  드래그 가능한 영역에 대한 제약을 적용합니다.  

  ```tsx
  // 픽셀 단위의 제약 설정  
  <motion.div
    drag="x"
    dragConstraints={{ left: 0, right: 300 }}
  />
  // 다른 요소의 바운딩 박스를 제약으로 사용
  const MyComponent = () => {
  const constraintsRef = useRef(null)

  return (
    <motion.div ref={constraintsRef}>
      <motion.div drag dragConstraints={constraintsRef} />
    </motion.div>
    )
  }
  ```

- **dragSnapToOrigin**  
  기본값: `false`  

  `true`로 설정하면 드래그 가능한 요소가 해제될 때 중심/원점으로 애니메이션됩니다.  

  ```tsx
  <motion.div drag dragSnapToOrigin />
  ```

- **dragElastic**  
  기본값: `0.5`  

  제약을 초과하여 이동할 수 있는 정도를 설정합니다. `0`은 이동 없음, `1`은 완전한 이동을 의미합니다.  

  기본값은 `0.5`이며, `false`로 설정하면 이동이 비활성화됩니다.  

  개별 제약마다 다른 값을 적용하려면 `top` / `right` / `bottom` / `left` 속성을 포함하는 객체를 전달할 수 있습니다. 지정되지 않은 값은 `0`으로 설정됩니다.  

  ```tsx
  <motion.div
    drag
    dragConstraints={{ left: 0, right: 300 }}
    dragElastic={0.2}
  />
  ```

- **dragMomentum**  
  기본값: `true`  

  드래그 종료 시 팬(pan) 제스처에서 얻은 관성을 적용합니다. 기본적으로 `true`로 설정되어 있습니다.  

  ```tsx
  <motion.div
    drag
    dragConstraints={{ left: 0, right: 300 }}
    dragMomentum={false}
  />
  ```

- **dragTransition**  
  드래그 모멘텀 전환을 변경할 수 있습니다. 드래그 가능한 요소를 놓으면 `inertia` 타입의 애니메이션이 시작되며, 이는 드래그 속도를 기반으로 합니다. 이 속성을 사용하여 애니메이션을 사용자 정의할 수 있습니다.  

  ```tsx
  <motion.div
    drag
    dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
  />
  ```

- **dragDirectionLock**  
  드래그 방향을 가장 먼저 감지된 방향으로 고정합니다. 예를 들어, 드래그 제스처가 시작되기 전에 x 축으로 더 많이 이동했다면, 해당 제스처 동안에는 x 축으로만 드래그할 수 있습니다.  

  ```tsx
  <motion.div drag dragDirectionLock />
  ```

- **dragPropagation**  
  드래그 제스처가 자식 컴포넌트로 전파되도록 허용합니다.  

  ```tsx
  <motion.div drag="x" dragPropagation />
  ```

- **dragControls**  
  일반적으로 드래그는 컴포넌트를 누르고 이동할 때 시작됩니다. 하지만 비디오 스크러버에서 임의의 지점을 클릭하여 드래그를 시작하는 경우처럼, 드래그할 요소와 다른 요소에서 드래그를 시작해야 하는 상황이 있을 수 있습니다.  

  `useDragControls` 훅을 사용하여 `dragControls`를 생성하면, 이를 `dragControls` prop으로 전달하여 특정 이벤트에서 드래그를 시작할 수 있습니다.  

  ```tsx
  const dragControls = useDragControls()

  function startDrag(event: PointerEvent) {
    dragControls.start(event, { snapToCursor: true })
  }

  return (
    <>
      <div onPointerDown={startDrag} />
      <motion.div drag="x" dragControls={dragControls} />
    </>
  )
  ```
  > `dragControls를` 설정하면 드래그 제스처 시작을 직접 제어하게 되므로, 드래그 가능한 요소에서 기본적으로 드래그가 시작되지 않도록 하려면 `dragListener={false}`를 설정할 수 있습니다.

- **dragListener**  
  드래그 제스처를 이벤트 리스너에서 트리거할지 여부를 결정합니다. `dragControls`를 전달하는 경우, 이를 `false`로 설정하면 드래그가 드래그 가능한 요소에서 `pointerdown` 이벤트가 아닌 `dragControls`를 통해서만 시작될 수 있도록 보장됩니다.

- **onDrag**  
  드래그 제스처가 이 요소에서 인식될 때 실행되는 콜백 함수입니다.

  ```tsx
  function onDrag(event, info) {
    console.log(info.point.x, info.point.y)
  }

  <motion.div drag onDrag={onDrag} />
  ```
  팬 및 드래그 이벤트는 원본 `PointerEvent`와 함께 point (장치나 페이지에 상대적인 좌표), delta (마지막 이벤트 이후의 거리), offset (원래 이벤트로부터의 거리), velocity (포인터의 현재 속도) 정보를 포함하는 info 객체를 제공합니다.

- **onDragStart**  
  드래그 제스처가 시작될 때 실행되는 콜백 함수입니다. 트리거된 `PointerEvent`와 `info`가 제공됩니다.

  ```tsx
  <motion.div drag onDragStart={(event, info) => console.log(info.delta.x)} />
  ```
- **onDragEnd**  
  드래그 제스처가 끝날 때 실행되는 콜백 함수입니다. 트리거된 `PointerEvent`와 `info`가 제공됩니다.

  ```tsx
  <motion.div drag onDragEnd={(event, info) => console.log(info.delta.x)} />
  ```

- **onDirectionLock**  
  드래그 방향이 결정될 때 실행되는 콜백 함수입니다. 결정된 방향이 인자로 제공됩니다.

  ```tsx
  <motion.div
    drag
    dragDirectionLock
    onDirectionLock={axis => console.log(axis)}
  />
  ```

### Viewport

- **whileInView**  
  요소가 뷰포트에 보일 때 적용할 타겟이나 변수를 설정합니다.

  ```tsx
  // 타겟으로 사용
  <motion.div whileInView={{ opacity: 1 }} />
  // 변수를 사용
  <motion.div whileInView="visible" />
  ```

- **viewport**  
  요소가 뷰포트 내에서 어떻게 추적되는지 정의하는 옵션입니다.

  ```tsx
  <motion.section
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  />
  ```
  - 사용 가능한 옵션
   1. once: true일 경우, 요소가 뷰포트에 들어오면 이후의 진입/이탈 이벤트를 감지하지 않습니다.
   2. root: 교차점을 감지할 조상 스크롤 가능 요소의 ref입니다 (기본적으로는 window).
   3. margin: 뷰포트의 마진으로, 감지 영역을 변경합니다. 기본값은 "0px"입니다. 여러 값을 사용하여 위/오른쪽/아래/왼쪽을 조정할 수 있습니다. 예: "0px -20px 0px 100px".
   4. amount: 요소가 뷰포트에 들어와야 "들어갔다"고 간주되는 양입니다. "some", "all" 또는 0과 1 사이의 숫자일 수 있습니다. 기본값은 "some"입니다.

- **onViewportEnter**  
  요소가 뷰포트에 들어올 때 실행되는 콜백 함수입니다. 이 함수는 교차점 이벤트에 대한 세부 정보를 담은 `IntersectionObserverEntry`를 인자로 받습니다.

  ```tsx
  <motion.div onViewportEnter={(entry) => console.log(entry.isIntersecting)} />
  ```

- **onViewportLeave**  
  요소가 뷰포트를 떠날 때 실행되는 콜백 함수입니다. 이 함수는 교차점 이벤트에 대한 세부 정보를 담은 `IntersectionObserverEntry`를 인자로 받습니다.

  ```tsx
  <motion.div onViewportLeave={(entry) => console.log(entry.intersectionRect)} />
  ```

## Layout

- **layout**  
  기본값: false  
  이 값이 true로 설정되면, 컴포넌트의 레이아웃 변화가 애니메이션으로 처리됩니다.

  ```tsx
  <motion.div layout />
  ```
  "position" 또는 "size"로 설정하면, 각각 위치나 크기만 애니메이션으로 처리됩니다.
  ```tsx
  <motion.img layout="position" />
  ```

- **layoutId**  
  이 값을 설정하면, 해당 컴포넌트는 레이아웃 변화에 애니메이션을 적용합니다. 또한, 새 요소가 DOM에 추가될 때 이미 동일한 `layoutId`를 가진 요소가 존재하면, 이전 요소의 크기/위치에서 애니메이션이 시작되어 나타납니다.

  ```tsx
  {items.map(item => (
    <motion.li layout>
      {item.name}
      {item.isSelected && <motion.div layoutId="underline" />}
    </motion.li>
  ))}
  ```
  만약 이전 컴포넌트가 트리에 남아 있으면, 두 요소는 교차 페이드(교차되며 부드럽게 전환)됩니다.

- **layoutDependency**  
  기본적으로 레이아웃 변경은 매 렌더링마다 감지됩니다. 성능을 개선하기 위해 `layoutDependency` prop을 전달할 수 있습니다. 이 값을 변경할 때만 측정이 발생합니다.

  ```tsx
  <motion.nav layout layoutDependency={isOpen} />
  ```

- **layoutScroll**  
  레이아웃 애니메이션이 스크롤 가능한 요소 내에서 올바르게 작동하려면 해당 스크롤 오프셋을 측정해야 합니다. 성능을 고려하여, Framer Motion은 모든 상위 요소의 스크롤 오프셋을 측정하지 않습니다. 측정해야 할 요소에 `layoutScroll` prop을 추가하십시오.

  ```tsx
  <motion.div layoutScroll style={{ overflow: "scroll" }}>
    <motion.div layout />
  </motion.div>
  ```

- **layoutRoot**  
  `position: fixed` 요소 내에서 레이아웃 애니메이션이 올바르게 작동하려면 페이지 스크롤을 고려해야 합니다. `layoutRoot`를 추가하여 요소를 `position: fixed`로 표시합니다.

  ```tsx
  <motion.div layoutRoot style={{ position: "fixed" }}>
    <motion.div layout />
  </motion.div>
  ```

- **onLayoutAnimationStart**  
  레이아웃 애니메이션이 시작될 때 실행되는 콜백 함수입니다.

  ```tsx
  <motion.div onLayoutAnimationStart={() => console.log("Animation started")} />
  ```

- **onLayoutAnimationComplete**  
  레이아웃 애니메이션이 완료될 때 실행되는 콜백 함수입니다.

  ```tsx
  <motion.div onLayoutAnimationComplete={() => console.log("Animation completed")} />
  ```

### Advanced

- **inherit**  
  `false`로 설정하면 컴포넌트가 부모 변수(variants)의 변화를 상속하거나 전파하지 않도록 합니다.

  ```tsx
  <motion.div inherit={false} />
  ```

- **custom**  
  동적 변수(variants)로 전달할 사용자 정의 데이터를 설정합니다.

  ```tsx
  const variants = {
    visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom * 0.2 }
    })
  }

  return (
    <motion.ul animate="visible">
      <motion.li custom={0} variants={variants} />
      <motion.li custom={1} variants={variants} />
      <motion.li custom={2} variants={variants} />
    </motion.ul>
  )
  ```

- **transformTemplate**  
  기본적으로 변환은 translate, scale, rotate, skew 순서대로 적용됩니다. 이를 변경하려면 `transformTemplate`을 함수로 설정하여 최신 변환 값과 생성된 변환 문자열을 인자로 받아 새 변환 문자열을 반환할 수 있습니다.

  ```tsx
  // 최신 변환 값 사용
  <motion.div
    style={{ x: 0, rotate: 180 }}
    transformTemplate={
      ({ x, rotate }) => `rotate(${rotate}deg) translateX(${x}px)`
    }
  />
  // 생성된 변환 문자열 사용
  <motion.div
    style={{ x: 0, rotate: 180 }}
    transformTemplate={
      (latest, generated) => `translate(-50%, -50%) ${generated}`
    }
  />
  ```




