import setAuthHeader from '../helpers/setAuthHeader'

export default function roomApiService(apiClient) {
  return {
    getAllUserRooms(userId, token) {
      return apiClient.get(`/users/${userId}/rooms`, setAuthHeader(token)).then((data) => data.data)
    },
    getRoom(roomId, token) {
      return apiClient.get(`/rooms/${roomId}`, setAuthHeader(token)).then(data => data.data)
    },
    getRoomMessages(roomId, token) {
      return apiClient.get(`rooms/${roomId}/messages`, setAuthHeader(token)).then(data => data.data)
    },
    postRoomMessage(data, roomId, token) {
      return apiClient.post(`rooms/${roomId}/messages`, data, setAuthHeader(token)).then(data => data.data)
    },
    getRoomUsers(roomId, token) {
      return apiClient.get(`rooms/${roomId}/users`, setAuthHeader(token)).then(data => data.data)
    }
  }
}