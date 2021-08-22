import axios from 'axios'
import authApiService  from './authApiService'
import roomApiService from './roomApiService'
import userApiService from './userApiService'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.50.251:3000' : window.location.origin

const apiClient = axios.create({
  baseURL,
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