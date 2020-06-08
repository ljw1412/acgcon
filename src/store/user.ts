import { get as $get, post as $post } from '../utils/api'
import { StoreOptions } from 'vuex'

export default {
  namespaced: true,
  state: { _id: '' },
  getters: {
    isLogined: state => !!state._id
  },
  mutations: {
    setCurrentUser(state, user) {
      Object.assign(state, user)
    },
    clear(state) {
      Object.keys(state).forEach(key => {
        if (typeof state[key] === 'string') state[key] = ''
      })
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      const res = await $get('user/whoami')
      commit('setCurrentUser', res)
    },
    async logout({ commit }) {
      const res = await $post('user/logout')
      commit('clear')
    }
  },
  modules: {}
} as StoreOptions<Record<string, any>>
