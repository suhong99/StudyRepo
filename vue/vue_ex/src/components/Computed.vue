<script setup lang="ts">
import { reactive, computed, ref } from 'vue';

const count = ref(1);
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery',
  ],
});

// 계산된 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No';
});
</script>

<template>
  <p>책을 가지고 있다:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
