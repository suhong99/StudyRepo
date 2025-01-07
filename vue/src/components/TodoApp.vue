<template>
  <div>
    <div class="input-container">
      <input
        type="text"
        v-model="newTodo"
        placeholder="할 일을 입력하세요"
        @keyup.enter="addTodo"
      />
      <button @click="addTodo">추가</button>
    </div>
    <ul>
      <li
        v-for="(todo, index) in todos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <span @click="toggleComplete(index)">{{ todo.text }}</span>
        <button @click="removeTodo(index)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// Todo 타입 정의
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default defineComponent({
  name: 'TodoApp',
  setup() {
    // 상태 정의
    const newTodo = ref<string>(''); // 입력 필드 상태
    const todos = ref<Todo[]>([]); // 투두리스트 배열

    // 할 일 추가
    const addTodo = () => {
      if (newTodo.value.trim() === '') return;
      todos.value.push({
        id: Date.now(), // 고유 ID 생성
        text: newTodo.value.trim(),
        completed: false,
      });
      newTodo.value = '';
    };

    // 할 일 삭제
    const removeTodo = (index: number) => {
      todos.value.splice(index, 1);
    };

    // 할 일 완료/미완료 토글
    const toggleComplete = (index: number) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    return {
      newTodo,
      todos,
      addTodo,
      removeTodo,
      toggleComplete,
    };
  },
});
</script>

<style scoped>
.input-container {
  margin-bottom: 20px;
}
input {
  padding: 10px;
  width: 300px;
  font-size: 16px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 5px;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
  display: flex;
  align-items: center;
}
li span {
  flex-grow: 1;
  cursor: pointer;
}
li.completed span {
  text-decoration: line-through;
  color: gray;
}
</style>
