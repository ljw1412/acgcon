import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/comic',
    name: 'comicHome',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Comic/index.vue')
  }
]

export default routes
