import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthService from '@/services/AuthService';
import {useAuthStore} from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bienvenida',
      meta: {
        middleware: [
          'guest'
        ]
      },
      component: HomeView
    },
    {
      path:'/auth',
      name: 'auth',
      meta: {
        middleware: [
          'guest',
          'to-auth'
        ]
      },
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: '/auth/login',
          name: 'auth.login',
          props: {
            heading: 'Iniciar Sesion',
          },
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: '/auth/register',
          name: 'auth.register',
          props: {
            heading: 'Crear Cuenta',
          },
          component: () => import('../views/auth/RegisterView.vue'),
        }
      ]
    },
    {
      path: '/home/tests',
      name: 'home.tests',
      meta: {
        middleware: [
          'auth'
        ]
      },
      component: () => import('../views/home/HomeView.vue'),
    },
    {
      path: '/home/salas',
      name: 'home.salas',
      meta: {
        middleware: [
          'auth'
        ]
      },
      component: () => import('../views/home/HomeSalasView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        middleware: [
          'auth',
          'teacher',
        ]
      },
      component: () => import('../layouts/DashboardLayout.vue'),
      children: [
        {
          path: '/dashboard/admin',
          name: 'dashboard.admin',
          component: () => import('../views/dashboard/AdminView.vue'),
        },
        {
          path: '/dashboard/tests',
          name: 'dashboard.tests',
          component: () => import('../views/dashboard/tests/TestsView.vue'),
        },
        {
          path: '/dashboard/tests/:id',
          name: 'dashboard.tests.index',
          component: () => import('../views/dashboard/tests/TestView.vue'),
        },
        {
          path: '/dashboard/tests/crear',
          name: 'dashboard.tests.crear',
          component: () => import('../views/dashboard/tests/CrearTestView.vue'),
        },
        {
          path: '/dashboard/tests/editar/:id',
          name: 'dashboard.tests.editar',
          component: () => import('../views/dashboard/tests/CrearTestView.vue'),
        },
        {
          path: '/dashboard/salas',
          name: 'dashboard.salas',
          component: () => import('../views/dashboard/salas/SalasView.vue'),
        },
        {
          path: '/dashboard/salas/:id',
          name: 'dashboard.salas.index',
          component: () => import('../views/dashboard/salas/SalaView.vue'),
        },
        {
          path: '/dashboard/salas/crear',
          name: 'dashboard.salas.crear',
          component: () => import('../views/dashboard/salas/CrearSalaView.vue'),
        },
      ]
    },
    {
      path: '/adu',
      name: 'edu',
      meta: {
        middleware: [
          'auth',
        ]
      },
      component: () => import('../layouts/EduLayout.vue'),
      children: [
        {
          path: '/edu/test/:id',
          name: 'edu.test',
          component: () => import('../views/edu/TestView.vue'),
        },
        {
          path: '/edu/sala/:id',
          name: 'edu.sala',
          component: () => import('../views/edu/SalaView.vue'),
        },
      ],
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN') ?? '';
  const authStore = useAuthStore();
  const middleware = to.meta?.middleware;

  try {
    const user = await AuthService.user(AUTH_TOKEN);
    authStore.user = user.data;
  } catch {
    authStore.user = null;
  }
  
  if(middleware.includes('teacher') && authStore.user && authStore.user.cargo_id === 1) {
    next({name: 'home.tests'})
  }

  if(middleware.includes('auth') && authStore.user) {
    next();
  }

  if(middleware.includes('to-auth') && authStore.user) {
    next({name: 'home.tests'})
  }

  if(middleware.includes('auth') && !authStore.user) {
    next({name: 'auth.login'})
  }

  if(middleware.includes('guest')) {
    next();
  }
});

export default router;