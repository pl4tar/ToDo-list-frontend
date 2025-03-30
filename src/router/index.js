import { createRouter, createWebHistory } from 'vue-router';
import TasksPage from '@/pages/TasksPage.vue';
import AppFeedback from '@/components/AppFeedback.vue';
import RegistrationPage from '@/pages/RegistrationPage.vue';
import { useAuthStore } from '@/stores/firebase/AuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth',
    },
    {
      path: '/auth',
      component: RegistrationPage,
    },
    {
      path: '/tasks/:filter',
      component: TasksPage,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/feedback',
      component: AppFeedback,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.user) {
    next('/auth');
  } else {
    next();
  }
});

export default router;
