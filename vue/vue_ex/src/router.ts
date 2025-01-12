import { createMemoryHistory, createRouter } from 'vue-router';
import Circle from './components/Circle.vue';
import Forms from './components/Forms.vue';

const routes = [
  { path: '/', component: Circle },
  { path: '/docs', component: Forms },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
