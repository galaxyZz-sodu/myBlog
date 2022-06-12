import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {keepAlive: true},
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/BlogManage.vue')
  },
  {
    path: '/images',
    name: 'images',
    component: () => import('../views/Img.vue')
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
