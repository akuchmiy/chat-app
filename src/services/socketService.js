import {io} from 'socket.io-client'

export const socket = io('http://192.168.50.251:3000')

socket.on('connect', () => {
  console.log("Socket connected")
})