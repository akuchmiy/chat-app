import apiService from '../../services/apiService'

export default {
  namespaced: true,
  state: {
    messages: [],
    users: [],
  },
  mutations: {
    SET_MESSAGES(state, messages) {
      state.messages = messages
    },
    PUSH_MESSAGE(state, message) {
      state.messages.push(message)
    },
  },
  actions: {
    fetchMessages({ commit, rootState }, roomId) {
      return apiService.getRoomMessages(roomId, rootState.auth.token).then((data) => {
        commit('SET_MESSAGES', data.data)
      })
    },
    pushMessage({ commit, rootState }, { data, roomId }) {
      return apiService.postRoomMessage(data, roomId, rootState.auth.token).then((serverData) => {
        commit('PUSH_MESSAGE', serverData)
      })
    },
    pushMessageSocket({commit}, data) {
      if (!(data && data.text && data.username)) return
      commit('PUSH_MESSAGE', {
        user: {username: data.username},
        text: data.text,
        date: new Date(data.date).toUTCString()
      })
    }
  },
}