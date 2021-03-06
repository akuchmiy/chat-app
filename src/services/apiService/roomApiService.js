import setAuthHeader from '../helpers/setAuthHeader'

export default function roomApiService(apiClient) {
  return {
    postRoom(roomName, token) {
      return apiClient.post(`/rooms`, { name: roomName }, setAuthHeader(token))
    },
    getAllUserRooms(userId, token) {
      return apiClient.get(`/users/${userId}/rooms`, setAuthHeader(token))
    },
    getRoom(roomId, token) {
      return apiClient.get(`/rooms/${roomId}`, setAuthHeader(token))
    },
    getRoomMessages(roomId, token) {
      return apiClient.get(`/rooms/${roomId}/messages`, setAuthHeader(token)).then(data => data.data)
    },
    postRoomMessage(data, roomId, token) {
      return apiClient.post(`/rooms/${roomId}/messages`, data, setAuthHeader(token))
    },
    getRoomUsers(roomId, token) {
      return apiClient.get(`/rooms/${roomId}/users`, setAuthHeader(token)).then(data => data.data)
    },
    postRoomUser(roomId, token) {
      return apiClient.post(`/rooms/${roomId}/users`, {}, setAuthHeader(token))
    }
  }
}