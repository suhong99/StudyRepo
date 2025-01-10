<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 엘리먼트 참조를 위해 ref를 선언하십시오.
// 이름은 템플릿 ref 값과 일치해야 합니다.
const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
  input.value?.focus();
});
</script>

<template>
  <input ref="input" />
</template>
