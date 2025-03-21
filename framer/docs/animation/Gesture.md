# [Gestures](https://motion.dev/docs/react-gestures#motion-examples)

Motion은 React의 기본 이벤트 리스너를 확장하여 간단하면서도 강력한 UI 제스처 기능을 제공합니다.
현재 motion 컴포넌트는 hover, tap, pan, drag, inView 제스처를 지원합니다.
각 제스처는 이벤트 리스너와 `while-` 애니메이션 prop을 모두 제공합니다.

## Animation props

Motion 컴포넌트는 여러 동작 애니메이션 속성을 제공합니다:
`whileHover`, `whileTap`, `whileFocus`, `whileDrag`, `whileInView`

이 속성들은 특정 동작이 활성 상태일 때 임시로 적용할 애니메이션 대상을 정의할 수 있습니다.

```tsx
<motion.button
  whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }}
  whileTap={{ scale: 0.9 }}
/>
```

모든 prop은 애니메이션할 값의 대상(target)으로 설정할 수도 있고, `variants` prop을 통해 변수의 이름으로 설정할 수도 있습니다.
Variants는 일반적으로 자식 요소에도 자연스럽게 전달됩니다.

```tsx
<motion.button whileTap="tap" whileHover="hover" variants={buttonVariants}>
  <svg>
    <motion.path variants={iconVariants} />
  </svg>
</motion.button>
```

## Gestures

- **Hover**
  Hover 동작은 마우스 포인터가 컴포넌트 위로 올라가거나 벗어날 때 이를 감지합니다.

  이는 onMouseEnter 및 onMouseLeave와 다릅니다.
  Hover는 실제 마우스 이벤트에 대해서만 실행되며, 터치 입력에서 에뮬레이션된 브라우저 생성 마우스 이벤트에는 반응하지 않습니다.

  ```tsx
  <motion.a
    whileHover={{ scale: 1.2 }}
    onHoverStart={(event) => {}}
    onHoverEnd={(event) => {}}
  />
  ```

- **Tap**
  Tap 동작은 기본 마우스 포인터(예: 왼쪽 클릭 또는 첫 번째 터치 포인트)가 컴포넌트를 누르고 뗄 때 이를 감지합니다.

  ```tsx
  <motion.button whileTap={{ scale: 0.9, rotate: 3 }} />
  ```

  탭 또는 클릭이 시작된 동일한 컴포넌트에서 종료되면 `tap` 이벤트가 실행되며, 컴포넌트 외부에서 종료되면 `tapCancel` 이벤트가 실행됩니다.
  탭 가능한 컴포넌트가 드래그 가능한 컴포넌트의 자식 요소인 경우, 포인터가 동작 중 3픽셀 이상 이동하면 자동으로 탭 동작이 취소됩니다

  - 접근성(Accessibility)
    탭 동작이 있는 요소는 키보드 접근성을 지원합니다.

    `tab` prop이 설정된 모든 요소는 포커스를 받을 수 있으며, Enter 키로 탭 이벤트를 트리거할 수 있습니다.

        1. Enter 키를 누르면 onTapStart 및 whileTap이 실행됩니다.
        2. Enter 키를 떼면 onTap이 실행됩니다.
        3. Enter 키를 누른 상태에서 요소가 포커스를 잃으면 onTapCancel이 실행됩니다.

- **Pan**

  Pan 동작은 포인터가 컴포넌트를 누른 상태에서 3픽셀 이상 이동할 때 이를 감지합니다. 포인터가 떨어지면 Pan 동작이 종료됩니다.

  ```tsx
  <motion.div onPan={(e, pointInfo) => {}} />
  ```

  Pan 동작에는 현재 관련된 while- prop이 없습니다.
  터치 입력에서 Pan 동작이 올바르게 작동하려면, [CSS의 touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action) 속성을 사용하여 x/y 축 또는 둘 다에서 터치 스크롤을 비활성화해야 합니다.

- **Drag**

  Drag 동작은 포인터 이동을 컴포넌트의 x축과/또는 y축에 적용합니다.

  ```tsx
  <motion.div drag whileDrag={{ scale: 1.2, backgroundColor: "#f00" }} />
  ```

  기본적으로 드래그가 끝나면 요소는 끝난 속도를 바탕으로 관성 애니메이션을 수행합니다.
  이 동작은 `dragMomentum`을 false로 설정하거나, `dragTransition` prop을 통해 변경할 수 있습니다.

  - Constraints
    또한 `dragConstraints`을 pixcel 단위로 top, left, reft, bottom값을 설정할 수 있다.

    ```tsx
    <motion.div drag="x" dragConstraints={{ left: 0, right: 300 }} />
    ```

    또는, React의 useRef 훅으로 생성된 다른 컴포넌트의 ref를 받을 수 있습니다. 이 ref는 드래그 가능한 컴포넌트의 dragConstraints prop과 **제약을 사용할 컴포넌트의 ref**에 모두 전달되어야 합니다.

    ```tsx
    const MyComponent = () => {
      const constraintsRef = useRef(null);

      return (
        <motion.div ref={constraintsRef}>
          <motion.div drag dragConstraints={constraintsRef} />
        </motion.div>
      );
    };
    ```

        기본적으로, 제약 범위를 벗어나서 요소를 드래그하면 탄성이 적용되어 튕기는 효과가 발생합니다.
        이 동작은 dragElastic을 0과 1 사이의 값으로 설정하여 변경할 수 있습니다.

        0 : 움직이지 않음을 의미함
        1 : 제약 범위를 완전히 벗어나서 움직임을 의미함

    - Direction locking
      `dragDirectionLock`을 설정하면, 요소가 드래그되는 첫 번째 축에 잠겨서 해당 축만 따라 움직이게 할 수 있습니다.
      ```tsx
      <motion.div drag dragDirectionLock onDirectionLock={callback} />
      ```
      드래그 동작이 시작될 때마다, 포인터의 이동 방향이 감지되고, 요소는 이 방향으로만 드래그가 가능하게 됩니다.

- **Focus**

Focus 동작은 컴포넌트가 포커스를 얻거나 잃을 때를 감지합니다. 이는 [CSS의 :focus-visible ](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)선택자와 동일한 규칙을 따릅니다.

일반적으로, 입력 요소가 어떤 방법으로 포커스를 받을 때와, 다른 요소들이 접근 가능한 방법(예: 키보드 네비게이션)을 통해 포커스를 받을 때 발생합니다.

```tsx
<motion.a whileFocus={{ scale: 1.2 }} href="#" />
```

## Event propagation

자식 요소는 `Capture` React props를 사용하여 포인터 이벤트가 부모 Motion 컴포넌트로 전파되는 것을 막을 수 있습니다.

예를 들어, 자식 요소는 `onPointerDownCapture`에 e.stopPropagation()을 전달하여 드래그와 탭 동작 및 관련된 while 애니메이션이 부모에서 실행되지 않도록 할 수 있습니다.

```tsx
<motion.div whileTap={{ scale: 2 }}>
  <button onPointerDownCapture={(e) => e.stopPropagation()} />
</motion.div>
```

## SVG filters

`SVG filter` 컴포넌트에서는 제스처가 인식되지 않습니다. 이 요소들은 물리적인 존재가 없기 때문에 이벤트를 받지 않습니다.

대신, 부모 요소에 `while-` props와 이벤트 핸들러를 추가하고, variants를 사용하여 이러한 요소들을 애니메이션할 수 있습니다.

```tsx
const MyComponent = () => {
  return (
    <motion.svg whileHover="hover">
      <filter id="blur">
        <motion.feGaussianBlur
          stdDeviation={0}
          variants={{ hover: { stdDeviation: 2 } }}
        />
      </filter>
    </motion.svg>
  );
};
```
