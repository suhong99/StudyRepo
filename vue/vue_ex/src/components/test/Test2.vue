<script setup lang="ts">
import { store, useStore } from '../state/store';

console.log('리랜더2');
const { getCount, increment } = useStore();
</script>

<template>
  B 컴포넌트에서 상태1: {{ store.count }}
  <button @click="store.count++">B 컴포넌트에서 1: {{ store.count }}</button>
  B 컴포넌트에서 캡슐화된 상태2 {{ getCount() }}
  <button @click="increment">B 컴포넌트에서 2: {{ getCount() }}</button>
</template>
