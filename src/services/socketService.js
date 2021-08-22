import {io} from 'socket.io-client'

const url = process.env.NODE_ENV === 'development' ? 'http://192.168.50.251:3000' : window.location.origin
export const socket = io(url)

socket.on('connect', () => {
  console.log("Socket connected")
})