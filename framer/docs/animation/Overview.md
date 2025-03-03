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
