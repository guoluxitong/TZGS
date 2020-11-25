import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/', redirect: '/login', hidden: true },
    {
        path: '/', component: Layout,
        children: [{
            path: 'index',
            component: () => import('@/views/home/index'),
            name: 'home',
            meta: { title: '首页', noCache: true }
        }]
    },
  {
    path: '/', component: Layout,
    children: [{
      path: 'device',
      component: () => import('@/views/device/index'),
      name: 'device',
      meta: { title: '拉伸', noCache: true }
    }]
  },
]

export default new Router({
    routes: constantRouterMap
})
