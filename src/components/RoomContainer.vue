<template>
  <!--  <transition name='fade' mode='out-in'>-->
  <div class='room rounded-shadow'>
    <h2 class='room__header'>Room name</h2>
    {{ roomId }}
    <BasicButton @click='sendMessage'>Send message</BasicButton>
  </div>
  <!--  </transition>-->
</template>

<script>
  import { useRoute } from 'vue-router'
  import { onMounted, onBeforeUnmount } from 'vue'
  import { socket } from '@/services/socketService'

  export default {
    name: 'RoomContainer',
    setup() {
      const route = useRoute()
      const roomId = +route.params.roomId
      console.log(roomId)

      const onMessageHandler = (message) => console.log(message)
      const sendMessage = () => socket.emit('message', `user${roomId}`)
      const connectToRoom = () => {
        socket.emit('connect to room', `user${roomId}`, roomId, (param) => {
          console.log('Param - ', param)
          socket.on('message', onMessageHandler)
        })
      }

      onMounted(() => {
        connectToRoom()
      })

      onBeforeUnmount(() => {
        socket.off('message', onMessageHandler)
      })

      return { roomId, sendMessage }
    },
  }
</script>

<style lang='scss'>
  .room {
    background-color: #fff;
    padding: 10px;
  }

  .room__header {
    margin-bottom: 10px;
  }

  //.fade-enter-active,
  //.fade-leave-active {
  //  transition: .3s;
  //}
  //
  //.fade-enter-to,
  //.fade-leave-to {
  //  opacity: 0.5;
  //}
</style>