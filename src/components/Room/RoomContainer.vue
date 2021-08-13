<template>
  <!--  <transition name='fade' mode='out-in'>-->
  <div class='room rounded-shadow'>
    <div class='room__header'>
      <h2>{{ roomName }}</h2>
      <h3>Users</h3>
    </div>
    <div class='room__body'>
      <RoomMessageList :roomId='roomId'></RoomMessageList>
      <RoomUsersList :roomId='roomId'></RoomUsersList>
    </div>
    <RoomMessageForm></RoomMessageForm>
  </div>
  <!--  </transition>-->
</template>

<script>
  import { useRoute } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { socket } from '@/services/socketService'
  import apiService from '../../services/apiService'
  import RoomMessageList from '@/components/Room/RoomMessageList'
  import RoomUsersList from '@/components/Room/RoomUsersList'
  import RoomMessageForm from './RoomMessageForm'

  export default {
    name: 'RoomContainer',
    components: { RoomMessageForm, RoomUsersList, RoomMessageList },
    setup() {
      const route = useRoute()
      const store = useStore()
      const roomId = route.params.roomId
      const roomName = ref('')

      const connectToRoom = () => {
        const { userId, token } = store.state.auth
        apiService.getRoom(roomId, token).then((data) => roomName.value = data.data.name)
        socket.emit('connect to room', userId, roomId, (activeUsers) => {
          console.log('Param - ', activeUsers)
        })

      }

      onMounted(connectToRoom)

      return { roomId, roomName }
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
    display: grid;
    grid-template-columns: 3fr 1fr;
    column-gap: 10px;
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