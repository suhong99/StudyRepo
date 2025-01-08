<script setup lang="ts">
import { ref } from 'vue';

//  v-show 와 v-if 차이 : 렌더링 여부.. v-if 는 렌더링 show는 display로 보여지는 것을 조절

const awesome = ref(false);
const secondCondi = ref(false);
</script>
<template>
  <button @click="awesome = !awesome">전환</button>

  <h1 v-if="awesome">
    Vue는 정말 멋지죠!
    <button @click="secondCondi = !secondCondi">전환</button>
    <h2 v-if="secondCondi">이중도 되나?</h2>
    <h2 v-else>된다고!?!?</h2>
  </h1>
  <h1 v-else>아닌가요? 😢</h1>
</template>
