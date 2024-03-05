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
          'guest',
        ]
      },
      component: HomeView
    },
    {
      path: '/404',
      name: 'not-found',
      meta: {
        middleware: [
          'guest',
        ]
      },
      component: () => import('../views/UI/404View.vue'),
    },
    {
      path:'/auth',
      name: 'auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: '/auth/login',
          name: 'auth.login',
          props: {
            heading: 'Iniciar Sesion',
          },
          meta: {
            middleware: [
              'guest',
              'to-auth'
            ]
          },
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: '/auth/register',
          name: 'auth.register',
          props: {
            heading: 'Crear Cuenta',
          },
          meta: {
            middleware: [
              'guest',
              'to-auth'
            ]
          },
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: '/auth/notification-email',
          name: 'auth.notification-email',
          props: {
            heading: 'Verificar Email',
          },
          meta: {
            middleware: [
              'auth',
              'no-verified',
            ]
          },
          component: () => import('../views/auth/NotificationEmailView.vue'),
        },
        {
          path: '/auth/verify-email/:id/:hash',
          name: 'auth.verify-email',
          props: {
            heading: 'Cuenta Verificada',
          },
          meta: {
            middleware: [
              'auth',
              'no-verified',
            ]
          },
          component: () => import('../views/auth/VerifyEmailView.vue'),
        },
      ]
    },
    {
      path: '/home/tests',
      name: 'home.tests',
      meta: {
        middleware: [
          'auth',
          'verified'
        ]
      },
      component: () => import('../views/home/HomeView.vue'),
    },
    {
      path: '/home/salas',
      name: 'home.salas',
      meta: {
        middleware: [
          'auth',
          'verified'
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
          'verified'
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
          path: '/dashboard/salas/:id/alumnos',
          name: 'dashboard.salas.alumnos',
          component: () => import('../views/dashboard/salas/AlumnosSalaView.vue'),
        },
        {
          path: '/dashboard/salas/:id/profesores',
          name: 'dashboard.salas.profesores',
          component: () => import('../views/dashboard/salas/ProfesoresSalaView.vue'),
        },
        {
          path: '/dashboard/salas/:id/tests',
          name: 'dashboard.salas.tests',
          component: () => import('../views/dashboard/salas/TestsSalaView.vue'),
        },
        {
          path: '/dashboard/salas/:id/profesores/add',
          name: 'dashboard.salas.profesores.add',
          component: () => import('../views/dashboard/salas/AgregarProfesorView.vue'),
        },
        {
          path: '/dashboard/salas/:salaId/solicitud/:solicitudId',
          name: 'dashboard.salas.solicitud',
          component: () => import('../views/dashboard/salas/AceptarSolicitudView.vue'),
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
          'verified',
        ]
      },
      component: () => import('../layouts/PrincipalLayout.vue'),
      children: [
        {
          path: '/edu/test/:id',
          name: 'edu.test',
          component: () => import('../views/edu/TestView.vue'),
        },
        {
          path: '/edu/sala/:salaId/test/:testId',
          name: 'edu.sala.test',
          component: () => import('../views/edu/TestView.vue'),
        },
        {
          path: '/edu/sala/:id',
          name: 'edu.sala',
          component: () => import('../layouts/SalaEduLayout.vue'),
          children: [
            {
              path: '/edu/sala/:id/alumnos',
              name: 'edu.sala.alumnos',
              component: () => import('../views/edu/sala/AlumnosView.vue'),
            },
            {
              path: '/edu/sala/:id/profesores',
              name: 'edu.sala.profesores',
              component: () => import('../views/edu/sala/ProfesoresView.vue'),
            },
            {
              path: '/edu/sala/:id/tests',
              name: 'edu.sala.tests',
              component: () => import('../views/edu/sala/TestsView.vue'),
            },
            {
              path: '/edu/sala/:id/tests/add',
              name: 'edu.sala.tests.add',
              component: () => import('../views/edu/sala/NuevoTestView.vue'),
            },
          ],
        },
      ],
    }, 
    {
      path: '/:user',
      name: 'user',
      meta: {
        middleware: [
          'auth',,
          'verified'
        ]
      },
      component: () => import('../layouts/PrincipalLayout.vue'),
      children: [
        {
          path: '/:user/perfil',
          name: 'user.perfil',
          component: () => import('../views/users/PerfilView.vue'),
        },
        {
          path: '/:user/salas',
          name: 'user.salas',
          component: () => import('../views/users/SalasView.vue'),
        },
        {
          path: '/:user/visitas',
          name: 'user.visitas',
          component: () => import('../views/users/VisitasView.vue'),
        },
        {
          path: '/:user/admin',
          name: 'user.admin',
          component: () => import('../views/users/AdminView.vue'),
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
    const {data: {data: [user]}} = await AuthService.user(AUTH_TOKEN);
    authStore.user = user;
  } catch {
    authStore.user = null;
  }

  if(authStore.isAuth && middleware?.includes('auth')) {
    if(!authStore.isVerificado && middleware.includes('verified')) {
      next({name: 'auth.notification-email'});
      return;
    }

    if(authStore.isVerificado && middleware.includes('no-verified')) {
      next({name: 'home.tests'});
    }

    if(!authStore.isTeacher && middleware?.includes('teacher')) {
      next({name: 'home.tests'});
      return;
    } 

    next();
  } else if(middleware?.includes('guest')) {
    if(authStore.isAuth && middleware?.includes('to-auth')) {
      next({name: 'home.tests'})
      return;
    }

    next();
  } else {
    next({name: 'auth.login'})
  }
});

export default router;