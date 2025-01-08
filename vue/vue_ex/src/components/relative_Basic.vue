<script setup lang="ts">
import { reactive, ref } from 'vue';

const books = reactive([ref('Vue 3 Guide')]);
// .value가 필요합니다
console.log(books[0].value);

const map = reactive(new Map([['count', ref(0)]]));
// .value가 필요합니다
console.log(map.get('count')?.value);

// https://ko.vuejs.org/guide/essentials/reactivity-fundamentals.html#caveat-when-unwrapping-in-templates
const count = ref(0);
const object = { id: ref(1) };
const { id } = object;
</script>
<template>
  <!-- object +1 -->
  <!-- <div>{{ object.id + 1 }}</div> -->
  <!-- 2 -->
  <div>{{ id + 1 }}</div>
</template>
