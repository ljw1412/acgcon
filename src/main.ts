import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import createAxios from '@/utils/api'
import manzhaiUI from 'manzhai-ui'

import 'manzhai-ui/lib/manzhai-ui.css'
import '@/style/global.scss'

Vue.config.productionTip = false

Vue.use(manzhaiUI)

Vue.prototype.$axios = createAxios()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
