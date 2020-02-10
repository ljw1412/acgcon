import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/global.scss'
import createAxios from '@/utils/api'

Vue.config.productionTip = false

Vue.prototype.$axios = createAxios()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
