// import apiService from '../../services/apiService'

export default {
  namespaced: true,
  state: {
    userId: '',
    token: '',
    username: '',
  },
  mutations: {
    SET_USER_DATA(state, {userId, token, username}) {
      state.userId = userId
      state.token = token
      state.username = username
      console.log(token)
    },
  },
  actions: {
    setUserData({ commit }, { id, token, username }) {
      if (!(id && token && username)) return
      commit('SET_USER_DATA', {userId: id, token, username})
    },
  },
  getters: {
    hasAccess(state) {
      return state.userId && state.token
    },
  },
}