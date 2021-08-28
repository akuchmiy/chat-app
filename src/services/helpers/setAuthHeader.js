export default function setAuthHeader(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}