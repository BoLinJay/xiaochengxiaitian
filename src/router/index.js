import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
      path: '/',
      component: () => import('@/views/Layout'),
      children: [
        {
          path: '/',
          component: () => import('@/views/Home')
        },
        {
          path: 'category/:id',
          component: () => import('@/views/Category')
        },
        {
          path: 'category/sub/:id',
          component: () => import('@/views/Category/Sub')
        },
        { 
          path: '/product/:id', 
          component: () => import('@/views/Goods') 
        }
      ]
    }, 
    {
      path: '/login',
      component: () => import('@/views/Login')
    },
    {
      path: '/login/callback',
      component: () => import('@/views/Login/component/LoginCallback.vue')
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次路由跳转回到顶端
  scrollBehavior () {
       return { left: 0, top: 0 }
  }
})

export default router
