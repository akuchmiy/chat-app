<template>
  <div class='room__users'>
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
  // import apiService from '../services/apiService'
  import UserListItem from './UserListItem'
  import { reactive } from 'vue'

  export default {
    name: 'RoomUsersList',
    props: {
      roomId: {
        type: String,
        required: true,
      },
    },
    setup() {
      // const roomId = props.roomId
      const users = reactive([
        {id: 1, username: 'Vasya', online: true},
        {id: 2, username: 'Petya', online: false},
        {id: 3, username: 'Dima', online: true},
      ])

      // apiService.getRoom(roomId, token).then((data) => roomName.value = data.data.name)
      return { users }
    },
    components: { UserListItem },
  }
</script>

<style lang='scss'>
  .room__users {
    ul {
      list-style: none;
    }
  }
</style>