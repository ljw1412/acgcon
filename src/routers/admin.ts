import { RouteConfig } from 'vue-router'

export default [
  {
    path: '/admin',
    name: 'AdminWrapper',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/Admin/index.vue'),
    children: [
      {
        path: 'cache',
        name: 'AdminCache',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/views/Admin/Cache/index.vue'
          )
      },
      {
        path: 'filter',
        name: 'AdminFilter',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/views/Admin/Filter/index.vue'
          )
      },
      {
        path: 'information',
        name: 'AdminInformation',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/views/Admin/Information/index.vue'
          )
      },
      {
        path: 'notice',
        name: 'AdminNotice',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/views/Admin/Notice/index.vue'
          )
      }
    ]
  }
]
