import {io} from 'socket.io-client'

export const socket = io('localhost:3000')

socket.on('connect', () => {
  console.log("Socket connected")
})