import { RouteConfig } from 'vue-router'

export default [
  {
    path: '/admin',
    name: 'admin',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/Admin/index.vue'),
    children: [
      {
        path: 'filter',
        name: 'adminFilter',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/views/Admin/Filter/index.vue'
          )
      },
      {
        path: 'cache',
        name: 'adminCache',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/views/Admin/Cache/index.vue'
          )
      },
      {
        path: 'crawler',
        name: 'adminCrawler',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/views/Admin/Crawler/index.vue'
          )
      }
    ]
  }
] as RouteConfig[]
