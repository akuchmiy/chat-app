<template>
  <div>{{ roomId }}</div>
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

<style scoped>

</style>