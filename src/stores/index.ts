import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import admin from './admin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { title: '' },
  mutations: {
    setTitle(state, title: string) {
      state.title = title
    }
  },
  actions: {},
  modules: { user, admin }
})
