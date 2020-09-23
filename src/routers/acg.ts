import { RouteConfig } from 'vue-router'

export default [
  {
    path: '/v1',
    redirect: { name: 'Home' },
    component: () =>
      import(/* webpackChunkName: "main" */ '@/views/Main/index.vue'),
    children: [
      {
        path: ':acgType(animation|comic|game)',
        name: 'SubHome',
        components: {
          animation: () =>
            import(
              /* webpackChunkName: "main" */ '@/views/Main/Home/Animation.vue'
            ),
          comic: () =>
            import(
              /* webpackChunkName: "main" */ '@/views/Main/Home/Comic.vue'
            ),
          game: () =>
            import(/* webpackChunkName: "main" */ '@/views/Main/Home/Game.vue')
        }
      },
      {
        path: ':acgType(animation|comic|game)/information',
        name: 'Information',
        component: () =>
          import(
            /* webpackChunkName: "main" */ '@/views/Main/Information/index.vue'
          ),
        meta: { title: '资讯' }
      },
      {
        path: ':acgType(animation|comic|game)/baike/:subType?',
        name: 'Baike',
        component: () =>
          import(
            /* webpackChunkName: "main" */ '@/views/Main/Baike/List/index.vue'
          ),
        meta: { title: '百科' }
      }
    ]
  }
] as RouteConfig[]
