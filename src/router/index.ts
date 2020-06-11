import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import admin from './admin'
import acg from './acg'
import bindEvents from './_event'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Home/index.vue')
  },
  // TODO: 鉴权, router.addRoutes 动态加载
  // ...admin,
  ...acg
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

bindEvents(router)

export default router
