import request from '@/api/index.js'

export default {
  namespaced: true,
  state: {
    data: [],
    meta: {
      isLoading: false
    }
  },
  mutations: {
    saveUsers: (state, users) => state.data = users,
    setMeta: (state, isLoading) => {
      state.meta.isLoading = isLoading
    }
  },
  actions: {
    async fetch({ commit }) {
      commit('setMeta', true)
      try {
        commit('saveUsers', await request.getUsers())
        commit('setMeta', false)
      } catch(error) {
        commit('setMeta', true)
        throw new Error('Произошла ошибка')
      }
    }
  },
  getters: {
    getUsers: state => state.data,
    getMeta: state => state.meta
  }
}
