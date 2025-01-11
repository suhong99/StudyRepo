<script setup lang="ts">
import { store, useStore } from '../state/store';
const { getCount, increment } = useStore();
console.log('리렌더1');
</script>

<template>
  A 컴포넌트에서 상태1: {{ store.count }}
  <button @click="store.increment()">B 컴포넌트에서: {{ store.count }}</button>
  B 컴포넌트에서 캡슐화된 상태2 {{ getCount() }}
  <button @click="increment">B 컴포넌트에서 1: {{ getCount() }}</button>
</template>
