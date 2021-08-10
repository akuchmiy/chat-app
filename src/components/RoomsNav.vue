<template>
  <nav class='nav rounded-shadow'>
    <h2 class='nav__header'>Rooms</h2>
    <hr>
    <RoomsList></RoomsList>
  </nav>
</template>

<script>
  import RoomsList from '@/components/RoomsList.vue'
  export default {
    name: 'RoomsNav',
    components: {
      RoomsList,
    }
  }
</script>

<style scoped>
  .nav {
    background-color: #fff;
    padding: 10px;
  }
  .nav__header, hr {
    margin-bottom: 10px;
  }
</style>