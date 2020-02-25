import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/game',
    name: 'gameHome',
    component: () =>
      import(/* webpackChunkName: "acg" */ '@/views/SubHome/Game/index.vue'),
    meta: { title: '游戏 - ACG控' }
  }
]

export default routes
