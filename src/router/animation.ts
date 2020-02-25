import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/animation',
    name: 'animationHome',
    component: () =>
      import(
        /* webpackChunkName: "acg" */ '@/views/SubHome/Animation/index.vue'
      ),
    meta: { title: '动画 - ACG控' }
  }
]

export default routes
