<template>
  <div class='home'>
    <RoomsNav></RoomsNav>
    <router-view></router-view>
  </div>
</template>

<script>
  import RoomsNav from '@/components/RoomsNav.vue'
  export default {
    name: 'Home',
    components: {RoomsNav},
  }
</script>

<style lang='scss' scoped>
  .home {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 10px;
    column-gap: 5px;
  }

  .rounded-shadow {
    border-radius: 10px;
    box-shadow: 3px 3px 8px #7c7c7c;
  }
</style>
