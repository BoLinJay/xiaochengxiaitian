import { createRouter, createWebHashHistory } from 'vue-router'
import { h } from 'vue'
import store from '@/store'
const routes = [
    {
      path: '/',
      component: () => import('@/views/Layout'),
      children: [
        { path: '/', component: () => import('@/views/Home')},
        { path: 'category/:id', component: () => import('@/views/Category') },
        { path: 'category/sub/:id', component: () => import('@/views/Category/Sub') },
        { path: 'product/:id', component: () => import('@/views/Goods') },
        { path: 'pay/callback', component: () => import('@/views/Member/result.vue') },
        { path: 'cart', component: () => import('@/views/Cart') }, 
        { path: 'member/checkout', component: () => import('@/views/Pay') },
        { path: 'member/pay', component: () => import('@/views/Member') },
        { 
          path: '/member', 
          component: () => import('@/views/Member/home/layout'),
          children: [
            { path: '/member', component: () => import('@/views/Member/home')},
            {
              path: '/member/order',
              component: { render: () => h(<RouterView/>) } ,
              children: [
              { path: '', component: () => import('@/views/Member/order')},
              { path: ':id', component: () => import('@/views/Member/order/component/orderDetail')}

              ]
                
            }
          ]
        }
      ]
    }, 
    { path: '/login', component: () => import('@/views/Login')},
    { path: '/login/callback', component: () => import('@/views/Login/component/LoginCallback.vue') },
  
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次路由跳转回到顶端
  scrollBehavior () {
       return { left: 0, top: 0 }
  }
})
// 路由拦截
router.beforeEach(( to, from, next) => {
  const { token } = store.state.user.profile
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})

export default router
