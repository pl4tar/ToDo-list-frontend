import { createRouter, createWebHistory } from 'vue-router';
import TasksPage from '@/pages/TasksPage.vue';
import AppFeedback from '@/components/AppFeedback.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tasks/all',
    },
    {
      path: '/tasks/:filter',
      component: TasksPage,
      props: true,
    },
    {
      path: '/feedback',
      component: AppFeedback,
    },
  ],
});

export default router;
