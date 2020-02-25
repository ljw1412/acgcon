import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import bindEvents from './_event'
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

bindEvents(router)

export default router
