# [Layout animations](https://motion.dev/docs/react-layout-animations#group-layout-animations)

Motion의 업계 최고 수준의 레이아웃 애니메이션을 사용하면, 서로 다른 두 레이아웃 간 또는 다른 요소 간에도 손쉽게 애니메이션을 적용할 수 있습니다.
이는 `layout` prop을 사용하는 것만큼 간단합니다.

```tsx
<motion.div layout />
```

이 작은 `layout` prop은 기존에는 애니메이션할 수 없었던 CSS 값도 애니메이션할 수 있습니다.
예를 들어, justify-content 값을 flex-start에서 flex-end로 변경하는 것도 애니메이션이 가능합니다.

또한 `layoutId` prop을 사용하면 두 개의 요소를 매칭하여 애니메이션을 적용할 수 있어, 더욱 고급스러운 애니메이션이 가능합니다.

이 기능을 활용하면 마이크로 인터랙션부터 전체 페이지 전환까지 다양한 애니메이션을 구현할 수 있습니다.

## 사용처(Usage)

React의 리렌더링으로 인해 발생하는 모든 레이아웃 변경은 애니메이션할 수 있습니다.

```tsx
<motion.div layout style={{ width: isOpen ? "80vw" : 0 }} />
```

- ⚠️ 주의
  CSS 변경은 animate가 아니라 style을 통해 즉시 적용해야 합니다.
  레이아웃 애니메이션은 layout이 자동으로 처리합니다.

- 레이아웃 변경 예시:
  - width / height 변경
  - 그리드 열(column) 수 변경
  - 리스트 항목 재정렬
  - 요소 추가/삭제

### Shared layout animations

새로운 컴포넌트가 추가될 때, 해당 컴포넌트의 layoutId prop이 기존 컴포넌트와 일치하면, 자동으로 기존 컴포넌트에서 새로운 컴포넌트로 애니메이션이 전환됩니다.

```tsx
isSelected && <motion.div layoutId="underline" />;
```

기존 컴포넌트가 새로운 컴포넌트가 들어올 때까지 마운트된 상태라면, 두 요소는 자동으로 크로스페이드됩니다.
요소를 제거할 때 원래 레이아웃으로 부드럽게 애니메이션하려면, `AnimatePresence`를 사용하여 exit 애니메이션이 끝날 때까지 DOM에 유지할 수
있습니다.

```tsx
<AnimatePresence>{isOpen && <motion.div layoutId="modal" />}</AnimatePresence>
```

### Setting a transition

레이아웃 애니메이션은 `transition` prop을 사용하여 커스터마이즈 할 수 있습니다.

```tsx
<motion.div layout transition={{ duration: 0.3 }} />
```

레이아웃 애니메이션에만 특정한 transition을 설정하려면, 레이아웃 전용 layout transition을 지정할 수 있습니다.

```tsx
<motion.div
  layout
  animate={{ opacity: 0.5 }}
  transition={{
    default: { ease: "linear" },
    layout: { duration: 0.3 },
  }}
/>
```

공유 레이아웃 애니메이션을 수행할 때, 애니메이션의 대상이 되는 요소에 정의된 transition이 적용됩니다.

```tsx
<>
  <motion.button
    layoutId="modal"
    onClick={() => setIsOpen(true)}
    // This transition will be used when the modal closes
    transition={{ type: "spring" }}
  >
    Open
  </motion.button>
  <AnimatePresence>
    {isOn && (
      <motion.dialog
        layoutId="modal"
        // This transition will be used when the modal opens
        transition={{ duration: 0.3 }}
      />
    )}
  </AnimatePresence>
</>
```

### Animating within scrollable element(스크롤 가능한 요소와의 애니메이션 주기)

스크롤 가능한 요소 내에서 레이아웃을 올바르게 애니메이션하려면, 해당 요소에 `layoutScroll` prop을 제공해야 합니다.

```tsx
<motion.div layoutScroll style={{ overflow: "scroll" }} />
```

이렇게 하면 Motion이 자식 요소를 측정할 때 요소의 스크롤 오프셋을 고려할 수 있습니다.

### Animating within fixed containers

고정된 요소 내에서 레이아웃을 올바르게 애니메이션하려면, 해당 요소에 `layoutRoot` prop을 제공해야 합니다.

```tsx
<motion.div layoutRoot style={{ position: "fixed" }} />
```

이렇게 하면 Motion이 페이지의 스크롤 오프셋을 고려하여 자식 요소를 측정할 수 있습니다.

### Group layout animations

레이아웃 애니메이션은 컴포넌트가 리렌더링되면서 레이아웃이 변경될 때 트리거됩니다.

```tsx
function Accordion() {
  const [isOpen, setOpen] = useState(false);

  return (
    <motion.div
      layout
      style={{ height: isOpen ? "100px" : "500px" }}
      onClick={() => setOpen(!isOpen)}
    />
  );
}
```

두 개 이상의 컴포넌트가 동시에 리렌더링되지 않지만 서로의 레이아웃에 영향을 미칠 때는 어떻게 될까요?
하나의 컴포넌트가 리렌더링되면, 성능상 이유로 다른 컴포넌트는 자신의 레이아웃 변경을 감지할 수 없습니다.
여러 컴포넌트 간 레이아웃 변경을 동기화하려면, 이들을 LayoutGroup 컴포넌트로 감싸면 됩니다.

```tsx
import { LayoutGroup } from "motion/react";

function List() {
  return (
    <LayoutGroup>
      <Accordion />
      <Accordion />
    </LayoutGroup>
  );
}
```

이렇게 하면, 그룹화된 motion 컴포넌트에서 레이아웃 변경이 감지될 때, 모든 컴포넌트에서 레이아웃 애니메이션이 트리거됩니다.

### Scale correction

모든 레이아웃 애니메이션은 transform 스타일을 사용하여 수행되므로 부드러운 프레임 속도를 제공합니다.

그러나 transform을 사용하여 레이아웃을 애니메이션하면 자식 요소가 시각적으로 왜곡될 수 있습니다. 이를 수정하려면, 해당 요소의 첫 번째 자식 요소에도 layout 속성을 추가해주면 됩니다.

[예시 샌드박스](https://codesandbox.io/p/sandbox/framer-motion-2-scale-correction-z4tgr?file=%2Fsrc%2FApp.js%3A14%2C42&from-embed)를 열고 핑크 점에서 layout을 제거해보면, 이 변경이 어떤 차이를 만드는지 확인할 수 있습니다.

transform은 boxShadow와 borderRadius에도 왜곡을 일으킬 수 있습니다. 하지만, motion 컴포넌트는 이 두 속성에 대해 자동으로 왜곡을 수정해줍니다. 단, 이 속성들이 motion 값으로 설정되어 있어야 합니다.

이 값들을 애니메이션하지 않는 경우, 가장 쉬운 방법은 스타일을 통해 설정하는 것입니다.

```tsx
<motion.div layout style={{ borderRadius: 20 }} />
```

## Troubleshooting

- 컴포넌트가 애니메이션되지 않는 문제

  **display: inline**이 설정되어 있는지 확인하세요. 브라우저는 inline 요소에 transform을 적용하지 않으므로, 이 설정을 block이나 flex와 같은 다른 값으로 변경해야 합니다.

  컴포넌트가 예상대로 리렌더링되고 있는지 확인하세요. 레이아웃 애니메이션이 시작되려면 해당 컴포넌트가 리렌더링되어야 합니다.

- SVG 레이아웃 애니메이션이 작동하지 않는 문제

  현재 SVG 컴포넌트는 레이아웃 애니메이션을 지원하지 않습니다. SVG는 자체적인 레이아웃 시스템을 갖추고 있지 않으므로, SVG 요소의 애니메이션을 처리할 때는 **cx, cy, width, height**와 같은 속성들을 직접 애니메이션하는 것이 좋습니다.

- 내용이 원하지 않게 늘어나는 문제
  이는 width와 height를 scale로 애니메이션할 때 발생하는 자연스러운 부작용입니다.
  종종, 이 문제는 해당 요소에 레이아웃 애니메이션을 제공함으로써 해결할 수 있으며, 그러면 스케일이 자동으로 수정됩니다.

  ```tsx
  <motion.section layout>
    <motion.img layout />
  </motion.section>
  ```

  이미지나 다른 종횡비로 변환되는 텍스트와 같은 일부 요소는 `layout="position"`을 사용하여 애니메이션하는 것이 더 나을 수 있습니다.

- **border-radius**나 **box-shadow**가 이상하게 동작하는 문제
  scale을 애니메이션할 때 성능은 좋지만, **border-radius**와 **box-shadow**와 같은 스타일이 왜곡될 수 있습니다.

  Motion은 이러한 속성의 스케일 왜곡을 자동으로 수정하지만, 해당 속성들은 스타일을 통해 요소에 설정되어야 합니다.

  ```tsx
  <motion.div layout style={{ borderRadius: 20 }} />
  ```

- 애니메이션 중 테두리가 늘어나는 문제
  테두리가 있는 요소는 애니메이션 중에 늘어나 보일 수 있습니다. 그 이유는 두 가지입니다

  1. 테두리를 변경하면 레이아웃 재계산이 발생하여, transform을 통한 애니메이션 성능 이점이 떨어집니다. 대신 너비와 높이를 전통적인 방식으로 애니메이션하는 것이 나을 수 있습니다.
  2. 테두리는 1px보다 작게 렌더링할 수 없기 때문에 Motion이 이 스타일에 대해 수행할 수 있는 스케일 수정에 한계가 있습니다.

  해결 방법은 테두리를 패딩을 추가한 부모 요소로 대체하는 것입니다.

  ```tsx
  <motion.div layout style={{ borderRadius: 10, padding: 5 }}>
    <motion.div layout style={{ borderRadius: 5 }} />
  </motion.div>
  ```
