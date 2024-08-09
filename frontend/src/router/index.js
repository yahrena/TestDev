import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import Home from '../views/Home.vue';
import AdminPage from '../pages/AdminPage.vue';
import UserPage from '../pages/UserPage.vue';
import NotFound from '../pages/NotFound.vue';
import LoginForm from '../components/LoginForm.vue';
import TaskPage from '@/pages/TaskPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: LoginForm },
  { path: '/admin', component: AdminPage, meta: { requiresAdmin: true } },
  { path: '/tasks', component: TaskPage },
  { path: '/users', component: UserPage },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.fetchCurrentUser();

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (authStore.isAuthenticated && authStore.user.role === 'admin') {
      next();
    } else {
      next('/login');
    }
  } else if (to.path !== '/login' && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
