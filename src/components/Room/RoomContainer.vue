<template>
  <!--  <transition name='fade' mode='out-in'>-->
  <div class='room rounded-shadow'>
    <div class='room__header'>
      <div class='room__info'>
        <h2>{{ roomName }}</h2>
        <BasicButton @click='copyId'>Copy id
          <input ref='roomIdInput' class='visually-hidden' :value='roomId' type='text' aria-hidden='true' tabindex='-1'>
        </BasicButton>
      </div>
      <h3>Users</h3>
    </div>
    <div class='room__body'>
      <RoomMessageList :roomId='roomId'></RoomMessageList>
      <RoomUsersList :roomId='roomId'></RoomUsersList>
    </div>
    <RoomMessageForm :roomId='roomId'></RoomMessageForm>
  </div>
  <!--  </transition>-->
</template>

<script>
  import { useRoute } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { socket } from '@/services/socketService'
  import RoomMessageList from '@/components/Room/RoomMessageList'
  import RoomUsersList from '@/components/Room/RoomUsersList'
  import RoomMessageForm from './RoomMessageForm'

  export default {
    name: 'RoomContainer',
    components: { RoomMessageForm, RoomUsersList, RoomMessageList },
    setup() {
      const route = useRoute()
      const store = useStore()
      const roomIdInput = ref(null)
      const roomId = route.params.roomId
      const roomName = route.query.roomName

      const connectToRoom = () => {
        const { userId } = store.state.auth
        store.dispatch('room/fetchUsers', roomId)
          .then(() => socket.emit('connect to room', userId, roomId, (activeUsers) => {
            activeUsers.forEach(userId => store.commit('room/SET_USER_STATUS', {
              userId,
              status: true,
            }))
          }))
      }
      onMounted(connectToRoom)

      const copyId = () => {
        if (!navigator.clipboard) {
          roomIdInput.value.select()
          document.execCommand('copy')
        } else {
          navigator.clipboard.writeText(roomId)
        }
      }

      return { roomId, roomName, copyId, roomIdInput }
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

    .room__info {
      display: flex;
      align-items: center;

      h2 {
        margin-right: 5px;
      }

      button {
        font-size: 0.7em;
        padding: 5px;
      }
    }
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