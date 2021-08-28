import setAuthHeader from '../helpers/setAuthHeader'

export default function userApiService(apiClient) {
  return {
    getUser(userId, token) {
      return apiClient.get(`/users/${userId}`, setAuthHeader(token)).then(data => data.data)
    },
  }
}