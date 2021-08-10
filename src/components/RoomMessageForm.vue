<template>
  <form @submit.prevent class='message__form'>
    <BasicInput v-model='message' class='message__form-input' placeholder='Enter message'></BasicInput>
    <BasicButton @click='sendMessage' type='submit'>Send message</BasicButton>
  </form>
</template>

<script>
  import { socket } from '../services/socketService'
  import { ref } from 'vue'

  export default {
    name: 'RoomMessageForm',
    setup() {
      const message = ref('')
      const sendMessage = () => socket.emit('message', message.value)
      return { message, sendMessage }
    },
  }
</script>

<style>
  .message__form {
    display: flex;
    max-width: 75%;
    justify-content: space-between;
  }

  .message__form-input {
    height: 100% !important;
    flex: 1 1 auto;
  }
</style>