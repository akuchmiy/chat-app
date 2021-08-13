<template>
  <ul class='rooms__list hidden-scroll'>
    <li v-for='room of rooms' :key='room.id'>
      <RoomsListItem :room='room'></RoomsListItem>
    </li>
  </ul>
</template>

<script>
  import RoomsListItem from '@/components/RoomsListItem.vue'
  import apiService from '../services/apiService'
  import { reactive, onMounted } from 'vue'
  import { useStore } from 'vuex'

  export default {
    name: 'RoomsNavList',
    setup() {
      const store = useStore()
      const rooms = reactive([])

      onMounted(() => {
        const { userId, token } = store.state.auth

        apiService.getAllUserRooms(userId, token).then(roomsData => {
          roomsData?.data?.rooms.map(async room => {
            const data = await apiService.getRoom(room.id, token)
            const usersCount = data.data.users.length
            rooms.push({...room, users: usersCount})
          })
        })
      })

      return { rooms }
    },
    components: {
      RoomsListItem,
    },
  }
</script>

<style>
  .rooms__list {
    list-style: none;
    /*overflow-y: scroll;*/
  }

  .rooms__list > li {
    margin-bottom: 10px;
  }

  .rooms__list > li:last-child {
    margin-bottom: 0;
  }
</style>