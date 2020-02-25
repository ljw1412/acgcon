import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/comic',
    name: 'comicHome',
    component: () =>
      import(/* webpackChunkName: "acg" */ '@/views/SubHome/Comic/index.vue'),
    meta: { title: '漫画 - ACG控' }
  }
]

export default routes
