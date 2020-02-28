import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import bindEvents from './_event'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Home/index.vue')
  },
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
          import(/* webpackChunkName: "baike" */ '@~/Baike/index.vue'),
        meta: { title: '百科' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

bindEvents(router)

export default router
