import { createRouter, createWebHistory } from 'vue-router';
import AllTasks from '@/views/AllTasks.vue';
import CalendarView from '@/views/CalendarView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AllTasks,
    },
    {
      path: '/calendarView',
      component: CalendarView,
    },
  ],
});

export default router;
