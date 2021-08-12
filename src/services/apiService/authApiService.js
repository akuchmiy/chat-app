export default function authApiService(apiClient) {
  return {
    registerUser(data) {
      return apiClient.post('/auth/register', data).then(data => data.data)
    },
    loginUser(data) {
      return apiClient.post('/auth/login', data).then(data => data.data)
    }
  }
}