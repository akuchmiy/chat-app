<template>
  <!--  <transition name='fade' mode='out-in'>-->
  <div class='room rounded-shadow'>
    <h2 class='room__header'>Room name {{ roomId }}</h2>
    <div class='room__body'>
      <RoomMessageList :roomId='roomId'></RoomMessageList>
      <RoomUsersList></RoomUsersList>
    </div>
    <RoomMessageForm></RoomMessageForm>
  </div>
  <!--  </transition>-->
</template>

<script>
  import { useRoute } from 'vue-router'
  import { onMounted } from 'vue'
  import { socket } from '@/services/socketService'
  import RoomMessageList from '@/components/RoomMessageList'
  import RoomUsersList from '@/components/RoomUsersList'
  import RoomMessageForm from './RoomMessageForm'

  export default {
    name: 'RoomContainer',
    components: { RoomMessageForm, RoomUsersList, RoomMessageList },
    setup() {
      const route = useRoute()
      const roomId = +route.params.roomId

      const connectToRoom = () => {
        socket.emit('connect to room', `user${roomId}`, roomId, (param) => {
          console.log('Param - ', param)
        })
      }

      onMounted(connectToRoom)

      return { roomId }
    },
  }
</script>

<style lang='scss'>
  .room {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 10px;
  }

  .room__body {
    display: grid;
    grid-template-columns: 3fr 1fr;
    column-gap: 10px;
    flex: 1 1 auto;
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