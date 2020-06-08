import VueRouter, { NavigationGuard } from 'vue-router'

const nameMap: Record<string, any> = {
  animation: '动画控',
  comic: '漫画控',
  game: '游戏控'
}

function setTitle(title = '', type: string) {
  let mTitle = nameMap[type] || 'ACG控'
  if (title) {
    mTitle = title + ' - ' + mTitle
  }
  document.title = mTitle
}

const beforeEach: NavigationGuard = (to, from, next) => {
  setTitle(to.meta.title, to.params.acgType)
  next()
}

export default function(router: VueRouter) {
  router.beforeEach(beforeEach)
}
