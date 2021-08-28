<template>
  <ul class='rooms__list hidden-scroll'>
    <li v-for='room of rooms' :key='room.id'>
      <RoomsListItem :room='room'></RoomsListItem>
    </li>
  </ul>
</template>

<script>
  import RoomsListItem from '@/components/RoomsNav/RoomsListItem.vue'
  import { onMounted, computed } from 'vue'
  import { useStore } from 'vuex'

  export default {
    name: 'RoomsNavList',
    setup() {
      const store = useStore()
      const rooms = computed(() => store.state.rooms)

      onMounted(() => {
        store.dispatch('fetchRooms')
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