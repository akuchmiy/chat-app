// import apiService from '../../services/apiService'

export default {
  namespaced: true,
  state: {
    userId: '',
    token: '',
    username: '',
  },
  mutations: {
    SET_USER_DATA(state, { userId, token, username }) {
      state.userId = userId
      state.token = token
      state.username = username
    },
    CLEAR_USER_DATA(state) {
      state.username = state.token = ''
    },
  },
  actions: {
    setUserData({ commit }, { id, token, username }) {
      if (!(id && token && username)) return
      commit('SET_USER_DATA', { userId: id, token, username })
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
      commit('CLEAR_ROOMS', null, { root: true })
    },
  },
  getters: {
    hasAccess(state) {
      return state.userId && state.token
    },
  },
}