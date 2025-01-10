<script setup lang="ts">
import Alert from './test/Alert.vue';

defineProps<{
  title: string;
}>();
</script>

<template>
  <h4>{{ title }}</h4>
  <Alert> 문제발생 </Alert>
</template>
