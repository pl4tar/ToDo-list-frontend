import { createRouter, createWebHistory } from 'vue-router'
import AllTasks from '@/views/AllTasks.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AllTasks,
    },
  ],
});

export default router
