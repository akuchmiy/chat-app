import { createStore } from 'vuex'
import apiService from '../services/apiService'
import auth from './modules/auth'
import room from './modules/room'

export default createStore({
  state: {
    visibleNav: true,
    rooms: [],
  },
  mutations: {
    SET_NAV_STATUS(state, status) {
      state.visibleNav = status
    },
    SET_ROOMS(state, rooms) {
      state.rooms = rooms
    },
    PUSH_ROOM(state, room) {
      state.rooms.push(room)
    },
    CLEAR_ROOMS(state) {
      state.rooms = []
    }
  },
  actions: {
    fetchRooms({ commit, rootState }) {
      return apiService.getAllUserRooms(rootState.auth.userId, rootState.auth.token).then(roomsData => {
        roomsData?.data?.rooms.map(async room => {
          const data = await apiService.getRoom(room.id, rootState.auth.token)
          const usersCount = data.data.users.length
          console.log(room)
          commit('PUSH_ROOM', { ...room, users: usersCount })
        })
      })
    },
    createRoom({ commit, rootState }, roomName) {
      return apiService.postRoom(roomName, rootState.auth.token).then((data) => {
        const room = data.data
        commit('PUSH_ROOM', {id: room._id, name: room.name, users: room.users.length})
      })
    },
    addRoom({commit, rootState}, roomId) {
      return apiService.postRoomUser(roomId, rootState.auth.token).then((data) => {
        const room = data.data
        commit('PUSH_ROOM', {id: room._id, name: room.name, users: room.users.length})
      })
    }
  },
  modules: {
    auth,
    room,
  },
})
