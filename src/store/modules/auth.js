import apiService from '../../services/apiService'

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
    async getUserData({commit}, data) {
      try {
        const { id, token } = await apiService.loginUser(data)
        commit('SET_USER_ID', id)
        commit('SET_BEARER_TOKEN', token)
      } catch(e) {
        console.log(e)
      }
    }
  }
}