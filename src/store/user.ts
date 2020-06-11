import { get as $get, post as $post } from '../utils/api'
import { StoreOptions } from 'vuex'
import router from '@/router/index'
import adminRoute from '@/router/admin'

export default {
  namespaced: true,
  state: { _id: '', role: '' },
  getters: {
    isLogined: state => !!state._id,
    nickname: (state, getter) => (getter.isLogined ? state.nickname : '未登录'),
    isAdmin: state => state.role.includes('admin')
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
      if (res.role && res.role.includes('admin')) router.addRoutes(adminRoute)
      commit('setCurrentUser', res)
    },
    async logout({ commit }) {
      const res = await $post('user/logout')
      commit('clear')
    }
  },
  modules: {}
} as StoreOptions<Record<string, any>>
