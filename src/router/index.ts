import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import animationRoutes from './animation'
import comicRoutes from './comic'
import gameRoutes from './game'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Home/index.vue')
  },
  ...animationRoutes,
  ...comicRoutes,
  ...gameRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
