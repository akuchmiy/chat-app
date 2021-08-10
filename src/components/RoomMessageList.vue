<template>
  <div class='room__message-container'>
    <ul class='messages'>
      <li v-for='message of messages' :key='message.date'>
        {{ message.username }} - {{ message.text }} - {{message.date}}
      </li>
      <!--     TODO - Message component   -->
    </ul>
  </div>
</template>

<script>
  import { socket } from '../services/socketService'
  import { onBeforeUnmount, onMounted, reactive } from 'vue'

  export default {
    name: 'RoomMessageList',
    props: {
      roomId: { type: Number, required: true },
    },
    setup() {
      const messages = reactive([
        { text: 'Dima 1 2 3', username: 'Vasya', date: new Date().toDateString() },
        { text: 'Rita 1 2 3', username: 'Kira', date: new Date().toDateString() },
        { text: 'Kostia 1 2 3', username: 'Natasha', date: new Date().toDateString() },
      ])
      const onMessageHandler = (message) => console.log(message)

      onMounted(() => socket.on('message', onMessageHandler))
      onBeforeUnmount(() => socket.off('message', onMessageHandler))

      return { messages }
    },
  }
</script>

<style lang='scss'>
  .room__message-container {
    border-right: 2px solid #ffc3a0;
    .messages {
      list-style: none;
    }
  }
</style>