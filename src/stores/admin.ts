import { StoreOptions } from 'vuex'

export default {
  namespaced: true,
  state: {
    // 是否标签组排序
    isGroupOrder: false
  },
  getters: {},
  mutations: {
    setGroupOrderState(state, value) {
      state.isGroupOrder = value
    }
  }
} as StoreOptions<Record<string, any>>
