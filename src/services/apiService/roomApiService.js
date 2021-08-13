import setAuthHeader from '../helpers/setAuthHeader'

export default function roomApiService(apiClient) {
  return {
    getAllUserRooms(userId, token) {
      return apiClient.get(`/users/${userId}/rooms`, setAuthHeader(token)).then((data) => data.data)
    },
    getRoom(roomId, token) {
      return apiClient.get(`/rooms/${roomId}`, setAuthHeader(token)).then(data => data.data)
    }
  }
}