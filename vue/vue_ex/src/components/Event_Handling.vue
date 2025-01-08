<script setup lang="ts">
import { ref } from 'vue';

const name = ref('Vue.js');

function greet(event: MouseEvent) {
  alert(`안녕 ${name.value}!`);
  // 'event'는 네이티브 DOM 이벤트 객체입니다.
  if (event) {
    alert(
      event.target instanceof HTMLElement ? event.target.tagName : 'Unknown'
    );
  }
}
function say(message: string) {
  alert(message);
}

// console.log(say('결과값')); // undefined

function warn(message: string, event: MouseEvent) {
  // 이제 네이티브 이벤트 객체에 접근할 수 있습니다.

  //   console.log(event); // pointer이벤트
  if (event) {
    event.preventDefault();
  }
  alert(message);
}

// .stop : 이벤트 전파가 중지됩니다.
// .prevent : preventDefault
// @submit.stop.prevent = "onSubmit" : 이와 같이 수식어 연결도 가능
// @submit.stop : 이벤트에 핸들러 없이 수식어만 사용할 수 있음
// .self : event.target이 엘리먼트 자신일 경우에만 핸들러가 실행
// .capture : 이벤트 리스너를 추가할 때 캡처 모드 사용
// .once : 이벤트는 단 한 번만 실행
// .passive : `event.preventDefault()`가 포함되었더라도 기본 동작이 발생

function 제출(message: string, event: KeyboardEvent) {
  if (event) {
    event.preventDefault();
  }
  alert(message);
}
</script>
<template>
  <div>
    <button @click="greet">환영하기</button>

    <button @click="say('안녕')">안녕이라고 말하기</button>
    <button @click="say('잘가')">잘가라고 말하기</button>

    <!-- 특수한 키워드인 $event 사용 -->
    <button @click="warn('아직 양식을 제출할 수 없습니다.', $event)">
      제출하기
    </button>

    <!-- 인라인 화살표 함수 사용 -->
    <button @click="(event) => warn('아직 양식을 제출할 수 없습니다.', event)">
      제출하기
    </button>

    <!-- https://ko.vuejs.org/guide/essentials/event-handling.html -->
    <input @keyup.enter="제출('제출', $event)" />
  </div>
</template>
