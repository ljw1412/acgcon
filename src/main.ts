import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import createAxios, { get, post, del, put } from '@/utils/api'
import { getLogger } from '@/utils/logger'
import * as directives from './directives'
import manzhaiUI from 'manzhai-ui'
import '@ljw1412/ionicons-sprite'

import '@/styles/global.scss'
import controllers from '@/controllers/index'
import AcgTitleCard from '@/components/AcgTitleCard/index.vue'
import AcgBaseLayout from '@/components/AcgLayout/BaseLayout'
import AcgImage from '@/components/AcgImage/index.vue'
import draggable from 'vuedraggable'

Vue.config.productionTip = false

Vue.use(manzhaiUI)

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key as keyof typeof directives])
})

Vue.component('draggable', draggable)
Vue.component('AcgTitleCard', AcgTitleCard)
Vue.component('AcgBaseLayout', AcgBaseLayout)
Vue.component('AcgImage', AcgImage)

Vue.prototype.$axios = createAxios()
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$del = del
Vue.prototype.$put = put
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
