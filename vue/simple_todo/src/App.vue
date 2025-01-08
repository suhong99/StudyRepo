<template>
  <div id="app">
    <h1>Todo List</h1>
    <TodoApp />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoApp from './components/TodoApp.vue';

export default defineComponent({
  components: {
    TodoApp,
  },
});
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}
</style>
