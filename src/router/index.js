import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue')
      },
      ]
    },
    {
      path: '/pages/404',
      name: 'notfound',
      component: () => import('@/views/pages/NotFound.vue')
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import('@/views/pages/auth/Login.vue')
    },
    {
      path: '/user/signup',
      name: 'signup',
      component: () => import('@/views/pages/auth/Signup.vue')
    },
    {
      path: '/user/accessdenied',
      name: 'accessdenied',
      component: () => import('@/views/pages/auth/AccessDenied.vue')
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/pages/Welcome.vue')
    }
  ]
})

export default router
