<template>
  <ul class='rooms__list'>
    <li v-for='room of rooms' :key='room.id'>
      <RoomsListItem :room='room'></RoomsListItem>
    </li>
  </ul>
</template>

<script>
  import RoomsListItem from '@/components/RoomsListItem.vue'
  import { reactive } from 'vue'

  export default {
    name: 'RoomsNavList',
    setup() {
      const rooms = reactive([
        { id: 1, name: 'First', users: 5 },
        { id: 2, name: 'Second', users: 7 },
        { id: 3, name: 'Third', users: 3 },
      ])

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
  }

  .rooms__list > li {
    margin-bottom: 10px;
  }

  .rooms__list > li:last-child {
    margin-bottom: 0;
  }
</style>