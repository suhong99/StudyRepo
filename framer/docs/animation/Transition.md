# Transitions

transition은 두 값 사이에서 변화할 때, 어떠한 애니메이션을 적용할지 정의한다.

```tsx
const transition = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
}

// Motion component
<motion.div
  animate={{ x: 100 }}
  transition={transition}
/>

// animate() function
animate(".box", { x: 100 }, transition)
```

## 애니메이션 세팅하기

`transition`은 모든 애니메이션 속성에서 설정할 수 있으며, 해당 애니메이션이 실행될 때 적용됩니다.

```tsx
<motion.div
  whileHover={{
    scale: 1.1,
    transition: { duration: 0.2 },
  }}
/>
```

### Value-specific transitions(특정 값 변이)

여러 값을 변화시킬 때, 각각의 변화를 다르게 변이 시킬 수 있습니다.

```tsx
// Motion component
<motion.li
  animate={{
    x: 0,
    opacity: 1,
    transition: {
      default: { type: 'spring' },
      opacity: { ease: 'linear' },
    },
  }}
/>;

// animate() function
animate(
  'li',
  { x: 0, opacity: 1 },
  {
    default: { type: 'spring' },
    opacity: { ease: 'linear' },
  }
);
```

### Default transitions (변이 기본값)

- `transition` props를 통해서 특정 컴퍼넌트에 대한 변이 기본값을 설정할 수 있습니다.

  ```tsx
  <motion.div
    animate={{ x: 100 }}
    transition={{ type: 'spring', stiffness: 100 }}
  />
  ```

- [MotionConfig](https://motion.dev/docs/react-motion-config#transition)를 통해서 특정 motion 컴포넌트에 대한 변이 기본값을 설정할 수 있습니다.
  ```tsx
  export const MyComponent = ({ isVisible }) => (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
    </MotionConfig>
  );
  ```

## Transition settings

- **type**
  - 기본값 : Dynamic
  - `type` 속성은 사용할 애니메이션 유형을 결정합니다. 가능한 값은 `"tween"`, `"spring"`, `"inertia"`입니다.

### Tween

`duration`과 `easing curve`(완화 곡선)를 사용하여 설정됩니다.

- duration

  - 기본값 : 0.3 (multiple keyframes가 적용됐으면 0.8)
  - 애니메이션의 지속시간 ( spring에도 bounce가 적용되어있으면 적용가능)

  ```tsx
  animate('ul > li', { opacity: 1 }, { duration: 1 });
  ```

- ease
  tween 애니메이션에서 사용할 easing function(속도 곡선을 조절하는 함수) 를 설정하는 속성입니다.

  - **지원하는 값**

    1. Easing function 이름
       "linear"
       "easeIn", "easeOut", "easeInOut"
       "circIn", "circOut", "circInOut"
       "backIn", "backOut", "backInOut"
       "anticipate"

    2. 4개의 숫자로 이루어진 Cubic Bezier 곡선
       ex transition: { ease:[0.17, 0.67, 0.83, 0.67] }

    3. JavaScript 이징 함수
       0~1 범위의 값을 받아 변환하는 함수

- Keyframe 애니메이션에서 ease 사용
  키프레임 애니메이션에서는 ease를 배열로 설정해 각 구간마다 다른 이징을 적용할 수 있습니다.

```tsx
<motion.div
  animate={{
    x: [0, 100, 0], // 0 → 100 → 0
    transition: { ease: ['easeIn', 'easeOut'] },
  }}
/>
```

- `times`는 `0`에서 `1` 사이의 진행률 값을 가진 배열로, 각 키프레임이 애니메이션에서 어디에 위치해야 하는지를 정의합니다.

```
<motion.div
animate={{
  x: [0, 100, 0],
  transition: {duration : 3,   times: [0, 0.3, 1] }
}}
/>
```

### Spring

Spring 애니메이션은 두 가지 방식으로 설정할 수 있습니다.

1. **물리 기반(Spring Physics) 애니메이션**

`stiffness`, `damping`, `mass` 속성을 사용하여 설정됩니다.
기존 제스처 또는 애니메이션의 속도(velocity)를 반영하여 자연스러운 피드백을 제공합니다.

- **damping**

  - 기본값 : 10
    스프링 애니메이션에서 **반대 방향으로 작용하는 힘**의 강도를 결정하는 속성입니다.
    값이 **0**이면 스프링이 **무한히 진동(oscillate indefinitely)** 합니다.

    ```tsx
    <motion.a
      animate={{ rotate: 180 }}
      transition={{ type: 'spring', damping: 300 }}
    />
    ```

- **mass**

  - 기본값 : 1
  - 이동하는 물체의 **질량(mass)** 을 결정하는 속성
  - 값이 클수록 **움직임이 둔해짐(lethargic movement).**

    ```tsx
    <motion.feTurbulence
      animate={{ baseFrequency: 0.5 }}
      transition={{ type: 'spring', mass: 0.5 }}
    />
    ```

- **stiffness**

  - 기본값 : 1
  - **스프링의 강성(stiffness)** 을 조절하는 속성입니다.
  - 값이 클수록 **움직임이 더 빠르고 갑작스럽게 변화** 합니다.

    ```tsx
    <motion.section
      animate={{ rotate: 180 }}
      transition={{ type: 'spring', stiffness: 50 }}
    />
    ```

- **velocity**

  - 기본값 : 현재 값의 속도(Current value velocity)
  - **스프링 애니메이션의 초기 속도(initial velocity)** 를 결정하는 속성입니다.
  - 초기 속도가 클수록 **더 빠르게 시작** 합니다.

    ```tsx
    <motion.div
      animate={{ rotate: 180 }}
      transition={{ type: 'spring', velocity: 2 }}
    />
    ```

- **restSpeed**

  - 기본값 : 0.1
  - 애니메이션 속도가 **이 값보다 낮아지면 애니메이션을 종료** 합니다.  
     단, `restDelta` 값보다 이동 거리가 작아야 종료됩니다.

    ```tsx
    <motion.div
      animate={{ rotate: 180 }}
      transition={{ type: 'spring', restSpeed: 0.5 }}
    />
    ```

- **restDelta**

  - 기본값 : 0.01
  - 애니메이션의 이동 거리가 이 값보다 작아지고, 속도가 `restSpeed` 이하로 떨어지면 **애니메이션이 종료** 됩니다.

    ```tsx
    <motion.div
      animate={{ rotate: 180 }}
      transition={{ type: 'spring', restDelta: 0.5 }}
    />
    ```

2. **시간 기반(Duration-based) 애니메이션**

`duration`과 `bounce` 속성을 사용하여 설정됩니다.
속도(velocity)는 반영되지 않지만, 더 이해하기 쉬운 방식입니다.

- **bounce**

  - **기본값:** `0.25`
  - `spring` 애니메이션의 **탄력도(bounciness)** 를 설정하는 속성입니다.
  - **값의 범위**

    - `0`: 바운스 없음 (즉, 부드럽게 정지)
    - `1`: 매우 탄력적인 움직임

    ```tsx
    <motion.div
      animate={{ y: 100 }}
      transition={{ type: 'spring', bounce: 0.8 }}
    />
    ```

- stiffness, damping or mass가 설정되면 bounce는 무시(overriden)됩니다.

- **visualDuration**
  - `spring` 애니메이션의 **시각적 지속 시간(visual duration)** 을 설정하는 속성입니다.
  - `visualDuration`을 설정하면 `duration` 값을 **무시(override)** 합니다.
  - `visualDuration`은 **애니메이션이 시각적으로 목표 지점에 도달하는 시간(초 단위)** 을 지정합니다.
  - 애니메이션의 **대부분(majority)** 은 이 시간 내에 완료되며,  
    **잔여(remaining) 바운스 효과**는 이후에 발생합니다.
  - 이를 통해 **스프링 애니메이션을 조정하기 쉽게 만들고**,  
    다른 시간 기반 애니메이션과 **동기화**하는 것이 용이합니다.
    ```tsx
    <motion.div
      animate={{ rotateX: 90 }}
      transition={{
        type: 'spring',
        visualDuration: 0.5,
        bounce: 0.25,
      }}
    />
    ```

### Inertia

- 관성은 초기 속도를 기반으로 값을 감속하는 애니메이션입니다. 선택적으로 최소 및 최대 경계를 설정할 수 있으며, 관성은 이 경계값에 스프링 애니메이션으로 스냅됩니다.
  스냅 : 애니메이션이나 인터랙션에서 값이 특정 위치나 기준에 자동으로 맞춰지는 것
- 이 애니메이션은 자동으로 목표값을 미리 계산하며, 이 값은 modifyTarget 속성으로 수정할 수 있습니다.
  이를 통해 그리드에 스냅하거나 유사한 기능을 추가할 수 있습니다.
- 관성은 또한 `dragTransition`에 사용되는 애니메이션이며, 해당 속성을 통해 설정할 수 있습니다.

- **power**

  - 기본값 : 0.8
  - **파워(power)** 값이 높을수록, 목표값이 더 멀리 계산됩니다.

    ```tsx
    <motion.div drag dragTransition={{ power: 0.2 }} />
    ```

- **timeConstant**

  - 기본값 : 700
  - **시간 상수(time constant)** 를 조정하면 감속(duration of deceleration) 시간에 영향을 주어 애니메이션의 느낌을 조절할 수 있습니다.

    ```tsx
    <motion.div drag dragTransition={{ timeConstant: 200 }} />
    ```

- **modifyTarget**

  - **타겟을 수정하는 함수**로, 자동으로 계산된 목표값을 받아 새로운 값을 반환합니다.  
    **그리드 스냅** 같은 기능에 유용합니다.

    ```tsx
    <motion.div
      drag
      // dragTransition은 항상 type: inertia
      dragTransition={{
        power: 0,
        // 계산된 타겟을 50픽셀 간격으로 스냅
        modifyTarget: (target) => Math.round(target / 50) * 50,
      }}
    />
    ```

- **min**

  - 최소 제한값을 설정합니다. 이 값이 설정되면, 값은 **이 값과 충돌(bump)** 하거나, 애니메이션이 이 값보다 작게 시작하면 바로 그 값으로 스프링됩니다.

    ```tsx
    <motion.div drag dragTransition={{ min: 0, max: 100 }} />
    ```

- **max**

  - 최대 제한값을 설정합니다. 이 값이 설정되면, 값은 **이 값과 충돌(bump)** 하거나, 초기 애니메이션 값이 이 값을 초과하면 바로 이 값으로 스냅됩니다.

    ```tsx
    <motion.div drag dragTransition={{ min: 0, max: 100 }} />
    ```

- **bounceStiffness**

  - 기본값 : 500
  - `min` 또는 `max`가 설정된 경우, **스프링의 강성(stiffness)** 을 조절하는 속성입니다. 값이 클수록 **갑작스러운 움직임**을 만듭니다.

    ```tsx
    <motion.div
      drag
      dragTransition={{
        min: 0,
        max: 100,
        bounceStiffness: 100,
      }}
    />
    ```

- **bounceDamping**

  - 기본값 : 10
  - `min` 또는 `max`가 설정된 경우, **스프링의 감쇠(damping)** 를 조절하는 속성입니다. 값이 0이면 스프링이 **무한히 진동(oscillate indefinitely)** 합니다.

    ```tsx
    <motion.div
      drag
      dragTransition={{
        min: 0,
        max: 100,
        bounceStiffness: 100,
      }}
    />
    ```

### Orchestration

- **delay**

  - 애니메이션 시작 전에 지연 시간(초 단위)을 설정합니다.
    예를 들어, delay를 0.3으로 설정하면, 애니메이션이 0.3초 후에 시작됩니다. 음수로 설정하면, 애니메이션이 해당 시간만큼 뒤로 밀리게 됩니다. 예를 들어, delay를 -1로 설정하면 1초 후에 애니메이션이 시작됩니다.

        ```tsx
          animate(element, { filter: "blur(10px)" }, { delay: 0.3 })
        ```

- **repeat**
  - 애니메이션을 반복할 횟수를 설정합니다. Infinity로 설정하면 애니메이션이 무한 반복됩니다.
  ```tsx
  <motion.div
    animate={{ rotate: 180 }}
    transition={{ repeat: Infinity, duration: 2 }}
  />
  ```
- **repeatType**
  - 애니메이션을 반복하는 방식을 설정합니다.
  - loop: 애니메이션을 처음부터 끝까지 반복합니다.
  - reverse: 애니메이션이 앞으로 갔다가 뒤로 돌아가며 반복합니다.
  - mirror: 애니메이션의 시작과 끝을 반복할 때마다 반전시킵니다.
    ```tsx
    <motion.div
      animate={{ rotate: 180 }}
      transition={{
        repeat: 1,
        repeatType: 'reverse',
        duration: 2,
      }}
    />
    ```
- **repeatDelay**
- 애니메이션을 반복할 때, 각 반복 사이의 지연 시간(초 단위)을 설정합니다.

```tsx
<motion.div
  animate={{ rotate: 180 }}
  transition={{ repeat: Infinity, repeatDelay: 1 }}
/>
```

- **when**
- variants와 함께 사용하며, 애니메이션이 언제 트리거될지를 자식 애니메이션과의 관계에서 설명합니다.
- 기본값: false
- 옵션
  - beforeChildren: 부모 애니메이션이 끝난 후에 자식 애니메이션이 실행됩니다.
  - afterChildren: 자식 애니메이션이 끝난 후에 부모 애니메이션이 실행됩니다.

```tsx
const list = {
  hidden: {
    opacity: 0,
    transition: { when: 'afterChildren' },
  },
};

const item = {
  hidden: {
    opacity: 0,
    transition: { duration: 2 },
  },
};

return (
  <motion.ul variants={list} animate="hidden">
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
);
```

- **delayChildren**
- variants와 함께 사용하며, 부모 애니메이션에 설정된 delayChildren은 자식 애니메이션의 지연 시간(초 단위)을 설정합니다.

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

return (
  <motion.ul variants={container} initial="hidden" animate="show">
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
);
```

- **staggerChildren**
  variants와 함께 사용하며, 부모 애니메이션에 설정된 staggerChildren을 통해 자식 애니메이션이 지연되는 시간(초 단위)을 설정합니다. 예를 들어, staggerChildren을 0.1로 설정하면 첫 번째 자식은 0초에 시작하고, 두 번째 자식은 0.1초 뒤에 시작하며, 세 번째 자식은 0.2초 뒤에 시작합니다. 계산된 지연 시간은 delayChildren에 추가됩니다.

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

return (
  <motion.ol variants={container} initial="hidden" animate="show">
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ol>
);
```

- **staggerDirection**
  자식 애니메이션의 지연 방향을 설정합니다. 1이면 처음부터 마지막 자식까지 순차적으로 지연시키고, -1이면 마지막 자식부터 처음 자식까지 순차적으로 지연시킵니다.

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerDirection: -1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

return (
  <motion.ul variants={container} initial="hidden" animate="show">
    <motion.li variants={item} size={50} />
    <motion.li variants={item} size={50} />
  </motion.ul>
);
```
