import {io} from 'socket.io-client'

const PORT = process.env.PORT || 3000
const url = process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}` : window.location.origin
export const socket = io(url)

socket.on('connect', () => {
  console.log("Socket connected")
})