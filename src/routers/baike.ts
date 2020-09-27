import { RouteConfig } from 'vue-router'

export default [
  {
    path: '/baike/:acgType(animation|comic|game)/:subType?/detail/:id',
    name: 'BaikeDetail',
    props: route => ({ id: route.params.id }),
    component: () =>
      import(
        /* webpackChunkName: "baike" */ '@/views/Main/Baike/Detail/index.vue'
      ),
    meta: { title: '百科' }
  }
] as RouteConfig[]
