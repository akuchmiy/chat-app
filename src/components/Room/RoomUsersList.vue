<template>
  <div class='room__users'>
    <h3>Users</h3>
    <ul>
      <!--  TODO - User component    -->
    </ul>
  </div>
</template>

<script>
  // import apiService from '../services/apiService'

  export default {
    name: 'RoomUsersList',
    props: {
      roomId: {
        type: String,
        required: true
      }
    },
    // setup(props) {
    //   const roomId = props.roomId
    //
    //   apiService.getRoom(roomId, token).then((data) => roomName.value = data.data.name)
    // }
  }
</script>

<style lang='scss'>
  .room__users {
    ul {
      list-style: none;
    }
  }
</style>