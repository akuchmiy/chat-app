<template>
  <div class='home'>
    <RoomsNav></RoomsNav>
    <router-view :key='$route.fullPath'></router-view>
  </div>
</template>

<script>
  import RoomsNav from '@/components/RoomsNav/RoomsNav.vue'

  export default {
    name: 'Home',
    components: { RoomsNav },
  }
</script>

<style lang='scss'>
  .home {
    flex: 1 1 auto;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 10px;
  }
</style>
