<template>
  <div class='room rounded-shadow'>
    <div class='room__header'>
      <h2>{{ roomName }}</h2>
      <BasicButton
        @click='copyId'
        v-tooltip.click='tooltipOptions'
      >Copy id
        <input ref='roomIdInput' class='visually-hidden' :value='roomId' type='text' aria-hidden='true' tabindex='-1'>
      </BasicButton>
    </div>
    <div class='room__body'>
      <RoomMessageList :roomId='roomId'></RoomMessageList>
      <teleport to='.nav' :disabled='!teleported'>
        <RoomUsersList :roomId='roomId'></RoomUsersList>
      </teleport>
    </div>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router'
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  import { useStore } from 'vuex'
  import { socket } from '@/services/socketService'
  import RoomMessageList from '@/components/Room/RoomMessageList'
  import RoomUsersList from '@/components/Room/RoomUsersList'

  export default {
    name: 'RoomContainer',
    components: { RoomUsersList, RoomMessageList },
    setup() {
      const route = useRoute()
      const store = useStore()
      const roomIdInput = ref(null)
      const roomId = route.params.roomId
      const roomName = route.query.roomName
      const teleported = ref(false)

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
      const resizeListener = () => {
        teleported.value = window.innerWidth < 1025
      }
      onMounted(() => {
        connectToRoom()
        resizeListener()
        window.addEventListener('resize', resizeListener)
      })
      onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeListener)
        teleported.value = false
      })

      const copyId = () => {
        if (!navigator.clipboard) {
          roomIdInput.value.select()
          document.execCommand('copy')
        } else {
          navigator.clipboard.writeText(roomId)
        }
      }

      const tooltipOptions = {
        top: '-40px',
        left: '50%',
        text: 'Done✔'
      }

      return { roomId, roomName, copyId, roomIdInput, teleported, tooltipOptions }
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

    @media (max-width: $mobile-breakpoint) {
      grid-template-columns: 1fr;
    }
  }

  .room__header {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin-bottom: 10px;

    h2 {
      margin-right: 5px;
    }

    button {
      font-size: 0.7em;
      padding: 5px;
    }
  }
</style>