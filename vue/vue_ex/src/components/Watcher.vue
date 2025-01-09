<script setup>
import { ref, watch } from 'vue';

const question = ref('');
const answer = ref('질문에는 보통 물음표가 포함됩니다. ;-)');
const loading = ref(false);

// watch는 ref에 직접 작동합니다
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true;
    answer.value = '생각 중...';
    try {
      const res = await fetch('https://yesno.wtf/api');
      answer.value = (await res.json()).answer;
    } catch (error) {
      answer.value = '오류! API에 도달할 수 없습니다. ' + error;
    } finally {
      loading.value = false;
    }
  }
});

const x = ref(0);
const y = ref(0);

// 단일 ref
watch(x, (newX) => {
  console.log(`x는 ${newX}입니다`);
});

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`x와 y의 합은: ${sum}입니다`);
  }
);

// 여러 소스의 배열
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x는 ${newX}이고 y는 ${newY}입니다`);
});
</script>

<template>
  <p>
    예/아니오 질문을 하세요:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
