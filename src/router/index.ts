import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import acgRoutes from './acg'
import baikeRoutes from './baike'
import addListener from './_listener'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Home/index.vue')
  },
  ...acgRoutes,
  ...baikeRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

addListener(router)

export default router
