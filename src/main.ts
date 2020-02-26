import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import createAxios, { get, post } from '@/utils/api'
import { getLogger } from '@/utils/logger'
import manzhaiUI from 'manzhai-ui'

import 'manzhai-ui/lib/manzhai-ui.css'
import '@/style/global.scss'

Vue.config.productionTip = false

Vue.use(manzhaiUI)

Vue.prototype.$axios = createAxios()
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$getAcgLogger = getLogger

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
