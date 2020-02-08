import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/game',
    name: 'gameHome',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Game/index.vue')
  }
]

export default routes
