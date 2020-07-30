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
          ),
        meta: { title: '筛选项管理' }
      },
      {
        path: 'cache',
        name: 'adminCache',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/views/Admin/Cache/index.vue'
          ),
        meta: { title: '缓存管理' }
      },
      {
        path: 'crawler',
        name: 'adminCrawler',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/views/Admin/Crawler/index.vue'
          )
      },
      {
        path: 'information',
        name: 'adminInformation',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/views/Admin/Information/index.vue'
          ),
        meta: { title: '资讯管理' }
      },
      {
        path: 'notice',
        name: 'adminNotice',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/views/Admin/Notice/index.vue'
          ),
        meta: { title: '站内公告' }
      }
    ]
  }
] as RouteConfig[]
