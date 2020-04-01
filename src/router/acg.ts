import { RouteConfig } from 'vue-router'

export default [
  {
    path: '/v1',
    redirect: { name: 'home' },
    component: () =>
      import(/* webpackChunkName: "acghome" */ '@/views/Main/index.vue'),
    children: [
      {
        path: ':acgType(animation|comic|game)',
        name: 'subHome',
        components: {
          animation: () =>
            import(/* webpackChunkName: "acghome" */ '@a/Home/index.vue'),
          comic: () =>
            import(/* webpackChunkName: "acghome" */ '@c/Home/index.vue'),
          game: () =>
            import(/* webpackChunkName: "acghome" */ '@g/Home/index.vue')
        }
      },
      {
        path: ':acgType(animation|comic|game)/information',
        name: 'information',
        component: () =>
          import(/* webpackChunkName: "baike" */ '@~/Information/index.vue'),
        meta: { title: '资讯' }
      },
      {
        path: ':acgType(animation|comic|game)/baike/:baikeType?',
        name: 'baike',
        component: () =>
          import(/* webpackChunkName: "baike" */ '@~/Baike/List/index.vue'),
        meta: { title: '百科' }
      }
    ]
  }
] as RouteConfig[]
