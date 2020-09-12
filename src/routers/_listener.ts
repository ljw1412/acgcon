import VueRouter, { NavigationGuard } from 'vue-router'
import store from '@/stores/index'

const nameMap: Record<string, any> = {
  animation: '动画控',
  comic: '漫画控',
  game: '游戏控',
  admin: 'ACG控后台管理'
}

function setTitle(title = '', type: string) {
  let mTitle = nameMap[type] || 'ACG控'
  if (title) {
    mTitle = title + ' - ' + mTitle
  }
  store.commit('setTitle', title)
  document.title = mTitle
}

const beforeEach: NavigationGuard = (to, from, next) => {
  let type = to.params.acgType
  if (to.path.startsWith('/admin')) type = 'admin'
  setTitle(to.meta.title, type)
  next()
}

export default function(router: VueRouter) {
  router.beforeEach(beforeEach)
}
