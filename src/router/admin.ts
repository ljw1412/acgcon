import { RouteConfig } from 'vue-router'

export default [
  {
    path: '/admin',
    name: 'admin',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Admin/index.vue')
  }
] as RouteConfig[]
