import { StoreOptions } from 'vuex'
import { whoami, logout } from '@/services/user'
import router from '@/routers/index'
import adminRoutes from '@/routers/admin'
import LOCAL_USER from '@/mocks/user'

const isDev = process.env.NODE_ENV === 'development'

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
      const res = isDev ? LOCAL_USER : await whoami()
      if (res.role && res.role.includes('admin')) {
        router.addRoutes(adminRoutes)
      }
      commit('setCurrentUser', res)
    },
    async logout({ commit }) {
      await logout()
      commit('clear')
    }
  }
} as StoreOptions<Record<string, any>>
