import { RouteConfig } from 'vue-router'

export default [
  {
    path: '/admin',
    name: 'AdminWrapper',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/Admin/index.vue'),
    children: []
  }
] as RouteConfig[]
