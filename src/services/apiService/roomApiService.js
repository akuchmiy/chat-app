function setAuthHeader(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

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