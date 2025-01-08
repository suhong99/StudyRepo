<script setup lang="ts">
import { ref, shallowReactive, toRaw } from 'vue';

// Circle 타입 정의
interface Circle {
  cx: number;
  cy: number;
  r: number;
}

// History 타입 정의
type History = Circle[][];

// 상태 정의
const history = shallowReactive<History>([[]]);
const index = ref<number>(0);
const circles = ref<Circle[]>([]);
const selected = ref<Circle | null>(null);
const adjusting = ref<boolean>(false);

// 캔버스 클릭 핸들러
function onClick(event: MouseEvent): void {
  const { clientX: x, clientY: y } = event;

  if (adjusting.value) {
    adjusting.value = false;
    selected.value = null;
    push();
    return;
  }

  selected.value =
    [...circles.value].reverse().find(({ cx, cy, r }) => {
      const dx = cx - x;
      const dy = cy - y;
      return Math.sqrt(dx * dx + dy * dy) <= r;
    }) || null;

  if (!selected.value) {
    circles.value.push({
      cx: x,
      cy: y,
      r: 50,
    });
    push();
  }
}

// 반지름 조정 핸들러
function adjust(circle: Circle): void {
  selected.value = circle;
  adjusting.value = true;
}

// 기록 저장
function push(): void {
  history.length = ++index.value;
  history.push(clone(circles.value));
  console.log(toRaw(history));
}

// 실행 취소
function undo(): void {
  if (index.value > 0) {
    circles.value = clone(history[--index.value]);
  }
}

// 다시 실행
function redo(): void {
  if (index.value < history.length - 1) {
    circles.value = clone(history[++index.value]);
  }
}

// 원본 배열 복제
function clone(circles: Circle[]): Circle[] {
  return circles.map((c) => ({ ...c }));
}
</script>

<template>
  <svg @click="onClick">
    <foreignObject x="0" y="40%" width="100%" height="200">
      <p class="tip">
        Click on the canvas to draw a circle. Click on a circle to select it.
        Right-click on the canvas to adjust the radius of the selected circle.
      </p>
    </foreignObject>
    <circle
      v-for="circle in circles"
      :key="circle.cx + '-' + circle.cy"
      :cx="circle.cx"
      :cy="circle.cy"
      :r="circle.r"
      :fill="circle === selected ? '#ccc' : '#fff'"
      @click="selected = circle"
      @contextmenu.prevent="adjust(circle)"
    ></circle>
  </svg>

  <div class="controls">
    <button @click="undo" :disabled="index <= 0">Undo</button>
    <button @click="redo" :disabled="index >= history.length - 1">Redo</button>
  </div>

  <div class="dialog" v-if="adjusting" @click.stop>
    <!-- null 체크 추가 -->
    <p v-if="selected">
      Adjust radius of circle at ({{ selected.cx }}, {{ selected.cy }})
    </p>
    <!-- null 체크 및 v-model 바인딩 -->
    <input
      v-if="selected"
      type="range"
      v-model="selected.r"
      min="1"
      max="300"
    />
  </div>
</template>

<style>
body {
  margin: 0;
  overflow: hidden;
}

svg {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}

circle {
  stroke: #000;
}

.controls {
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
}

.controls button + button {
  margin-left: 6px;
}

.dialog {
  position: fixed;
  top: calc(50% - 50px);
  left: calc(50% - 175px);
  background: #fff;
  width: 350px;
  height: 100px;
  padding: 5px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.dialog input {
  display: block;
  width: 200px;
  margin: 0px auto;
}

.tip {
  text-align: center;
  padding: 0 50px;
  color: #bbb;
}
</style>
