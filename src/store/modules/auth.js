// import apiService from '../../services/apiService'

export default {
  namespaced: true,
  state: {
    userId: null,
    token: null,
  },
  mutations: {
    SET_USER_ID(state, userId) {
      state.userId = userId
    },
    SET_BEARER_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    setUserData({commit}, data) {
      if (!(data.id && data.token)) return
        commit('SET_USER_ID', data.id)
        commit('SET_BEARER_TOKEN', data.token)
    }
  },
  getters: {
    hasAccess(state) {
      return state.userId && state.token
    }
  }
}