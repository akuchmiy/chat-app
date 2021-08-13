import axios from 'axios'
import authApiService  from './authApiService'
import roomApiService from './roomApiService'
import userApiService from './userApiService'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  ...authApiService(apiClient),
  ...roomApiService(apiClient),
  ...userApiService(apiClient)
}