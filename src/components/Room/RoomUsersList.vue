<template>
  <div class='room__users'>
    <h3>
      <font-awesome-icon :icon="['fas', 'users']"></font-awesome-icon>
      Users
    </h3>
    <div class='room__users-container hidden-scroll'>
      <ul class='users'>
        <UserListItem
          v-for='user of users'
          :key='user.id'
          :username='user.username'
          :online='user.online'
        ></UserListItem>
      </ul>
    </div>
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
        store.dispatch('room/setUserStatus', { userId, status: true })
      }

      function userDisconnectedHandler(userId) {
        store.commit('room/SET_USER_STATUS', { userId, status: false })
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
    margin-right: -10px;
    overflow: hidden;

    h3 {
      margin-bottom: 5px;
    }

    @media (max-width: $mobile-breakpoint) {
      margin: 10px 0 10px 10px;
    }
  }

  .room__users-container {
    padding-right: 10px;
    overflow-y: auto;
    overflow-x: visible;
    height: calc(100% - 27px);
    max-height: calc(100vh - 199px);

    ul {
      list-style: none;
    }
  }
</style>