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
        path: ':acgType(animation|comic|game)/baike/:subType?',
        name: 'baike',
        component: () =>
          import(/* webpackChunkName: "baike" */ '@~/Baike/List/index.vue'),
        meta: { title: '百科' }
      }
    ]
  },
  {
    path: '/baike/:acgType(animation|comic|game)/:subType?/detail/:id',
    name: 'baikeDetail',
    component: () =>
      import(/* webpackChunkName: "baike" */ '@~/Baike/Detail/index.vue'),
    meta: { title: '百科' }
  },
  {
    path: '/baike/editor',
    name: 'baikeEditor',
    component: () =>
      import(/* webpackChunkName: "baike" */ '@~/Baike/Editor2/index.vue'),
    meta: { title: '百科编辑器' }
  },
  {
    path: '/search',
    name: 'search',
    component: () =>
      import(/* webpackChunkName: "baike" */ '@~/Search/Home.vue'),
    meta: { title: '搜索' }
  }
] as RouteConfig[]
