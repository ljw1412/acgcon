import VueRouter, { NavigationGuard } from 'vue-router'

const beforeEach: NavigationGuard = (to, from, next) => {
  document.title = to.meta.title || 'ACG控'
  next()
}

export default function(router: VueRouter) {
  router.beforeEach(beforeEach)
}
