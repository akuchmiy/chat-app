<template>
  <!--  <transition name='fade' mode='out-in'>-->
  <div class='room rounded-shadow'>
    <h2 class='room__header'>Room name {{ roomName }}</h2>
    <div class='room__body'>
      <RoomMessageList :roomId='roomId'></RoomMessageList>
      <RoomUsersList :users='users'></RoomUsersList>
    </div>
    <RoomMessageForm></RoomMessageForm>
  </div>
  <!--  </transition>-->
</template>

<script>
  import { useRoute } from 'vue-router'
  import { onMounted, reactive, ref } from 'vue'
  import { useStore } from 'vuex'
  import { socket } from '@/services/socketService'
  import apiService from '../services/apiService'
  import RoomMessageList from '@/components/RoomMessageList'
  import RoomUsersList from '@/components/RoomUsersList'
  import RoomMessageForm from './RoomMessageForm'

  export default {
    name: 'RoomContainer',
    components: { RoomMessageForm, RoomUsersList, RoomMessageList },
    setup() {
      const route = useRoute()
      const store = useStore()
      const roomId = route.params.roomId

      const users = reactive([])
      const roomName = ref('')

      const connectToRoom = () => {
        const { userId, token } = store.state.auth
        socket.emit('connect to room', userId, roomId, (param) => {
          console.log('Param - ', param)
        })
        apiService.getRoom(roomId, token).then((data) => roomName.value = data.data.name)
      }

      onMounted(connectToRoom)

      return { roomId, users, roomName }
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