import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: []
    },
    {
      path: '/pages/404',
      name: 'notfound',
      component: () => import('@/views/pages/NotFound.vue')
    }
  ]
})

export default router
