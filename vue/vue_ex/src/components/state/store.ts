import { reactive } from 'vue';

export const store = reactive({
  count: 0,
  increment() {
    this.count++;
  },
});

const state = reactive({
  count: 0,
});

export const useStore = () => ({
  getCount: () => state.count, // Getter
  increment: () => state.count++, // Setter or Modifier
});
