<template>
<!--  <transition name='fade' mode='out-in'>-->
    <div class='room rounded-shadow'>
      <h2 class='room__header'>Room name</h2>
      {{ roomId }}
    </div>
<!--  </transition>-->
</template>

<script>
  import { useRoute } from 'vue-router'

  export default {
    name: 'RoomContainer',
    setup() {
      const route = useRoute()
      const roomId = route.params.roomId
      console.log(roomId)

      return { roomId }
    },
  }
</script>

<style lang='scss'>
  .room {
    background-color: #fff;
    padding: 10px;
  }

  .room__header {
    margin-bottom: 10px;
  }

  //.fade-enter-active,
  //.fade-leave-active {
  //  transition: .3s;
  //}
  //
  //.fade-enter-to,
  //.fade-leave-to {
  //  opacity: 0.5;
  //}
</style>