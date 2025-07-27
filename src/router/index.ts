import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import ComparisonView from '@/views/ComparisonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutDefault,
      children: [
        {
          path: '',
          name: 'comparison',
          component: ComparisonView,
        },
      ],
    },
  ],
})

export default router
