<template>
  <div class='room__users hidden-scroll'>
    <ul class='users'>
      <UserListItem
        v-for='user of users'
        :key='user.id'
        :username='user.username'
        :online='user.online'
      ></UserListItem>
    </ul>
  </div>
</template>

<script>
  import UserListItem from './UserListItem'
  import { computed, onMounted, onBeforeUnmount } from 'vue'
  import { useStore } from 'vuex'
  import { socket } from '../../services/socketService'

  export default {
    name: 'RoomUsersList',
    props: {
      roomId: {
        type: String,
        required: true,
      },
    },
    setup() {
      const store = useStore()
      const users = computed(() => store.state.room.users)

      function userConnectedHandler(userId) {
        store.commit('room/SET_USER_STATUS', {userId, status: true})
      }
      function userDisconnectedHandler(userId) {
        store.commit('room/SET_USER_STATUS', {userId, status: false})
      }

      onMounted(() => {
        socket.on('user connected', userConnectedHandler)
        socket.on('user leaving', userDisconnectedHandler)
      })
      onBeforeUnmount(() => {
        socket.off('user connected', userConnectedHandler)
        socket.off('user leaving', userDisconnectedHandler)
        socket.emit('user leaving', store.state.auth.userId)
      })

      return { users }
    },
    components: { UserListItem },
  }
</script>

<style lang='scss'>
  .room__users {
    overflow-y: scroll;
    overflow-x: visible;
    max-height: calc(100vh - 172px);
    @media (max-width: 769px) {
      padding-right: 10px;
      margin: 10px 0 10px 10px;
    }
    ul {
      list-style: none;
    }
  }
</style>