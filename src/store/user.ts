import { StoreOptions } from 'vuex'
import { whoami, logout } from '@/services/user'

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
      const res = await whoami()
      // if (
      //   process.env.NODE_ENV === 'development' ||
      //   (res.role && res.role.includes('admin'))
      // ) {
      //   router.addRoutes(adminRoute)
      // }
      commit('setCurrentUser', res)
    },
    async logout({ commit }) {
      await logout()
      commit('clear')
    }
  }
} as StoreOptions<Record<string, any>>
