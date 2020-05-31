import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import createAxios, { get, post } from '@/utils/api'
import { getLogger } from '@/utils/logger'
import manzhaiUI from 'manzhai-ui'
import '@ljw1412/icon'

import '@/styles/global.scss'
import controllers from '@/controllers/index'
import AcgTitleCard from '@/components/AcgTitleCard/index.vue'

Vue.config.productionTip = false

Vue.use(manzhaiUI)

Vue.component('AcgTitleCard', AcgTitleCard)

Vue.prototype.$axios = createAxios()
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$getAcgLogger = getLogger
Vue.prototype.$acg = controllers

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(
  '夜间模式: window.$acg.changeTheme("dark")\n还原: window.$acg.changeTheme("")'
)

window.$acg = {
  changeTheme: Vue.prototype.$changeTheme
}
