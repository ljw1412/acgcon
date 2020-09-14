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
        name: 'subHome',
        components: {
          animation: () =>
            import(
              /* webpackChunkName: "main" */ '@/views/Main/AnimationHome/index.vue'
            ),
          comic: () =>
            import(
              /* webpackChunkName: "main" */ '@/views/Main/ComicHome/index.vue'
            ),
          game: () =>
            import(
              /* webpackChunkName: "main" */ '@/views/Main/GameHome/index.vue'
            )
        }
      }
    ]
  }
] as RouteConfig[]
