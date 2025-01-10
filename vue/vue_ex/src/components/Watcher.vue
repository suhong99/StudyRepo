<script setup>
import { reactive, ref, watch } from 'vue';

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

// 반응형 객체
const obj = reactive({ count: 0 });

watch(
  // obj.count 대신 콜백함수형식의 getter를 사용함 0을 감시하는게 아니라 obj.count의 결과물을 감시
  () => obj.count,
  (count) => {
    console.log(`Count는: ${count}입니다`);
  }
);

const obj2 = reactive({ count: 0 });

watch(obj2, (newValue, oldValue) => {
  // 중첩된 속성 변경 시 실행됩니다
  // 참고: `newValue`는 여기서 `oldValue`와 동일합니다.
  // 두 값 모두 동일한 객체를 가리키기 때문입니다!
  console.log(newValue, oldValue);
});

obj2.count++;

const testRef = ref(1);

// case 비교
watch(testRef, (newValue, oldValue) => {
  console.log(newValue, oldValue, 'test'); // 2 ,1
});

testRef.value += 1;

const state = reactive({ count: 2 });

watch(
  () => state.count,
  () => {
    // state.someObject가 교체될 때만 실행됩니다.
    console.log('실행되야지?');
  }
  // 3번쨰로 deep : 깊은 순회, immediate : 초기 데이터 가져오는 등 지연모드 사용 안할 떄 , once : 한번만 가 있음
);

state.count++;

// watchEffect

const todoId = ref(1);
const data = ref(null);

// watch(
//   todoId,
//   async () => {
//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
//     );
//     data.value = await response.json();

//     console.log(data.value);
//   },
//   { immediate: true }
// );

// 동일한 콜백 위와
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  );
  data.value = await response.json();
});

// watchEffect는 동기적 실행 동안에만 종속성을 추적합니다. 비동기 콜백과 함께 사용할 때는 첫 번째 await 틱 전에 접근한 속성만 추적됩니다.
// 감시자는 동기적으로 생성되어야 함
</script>

<template>
  <p>
    예/아니오 질문을 하세요:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
