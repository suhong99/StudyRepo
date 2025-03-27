# motion
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

### props


