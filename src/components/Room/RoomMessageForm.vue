<template>
  <form @submit.prevent='sendMessage' class='room__message-form'>
    <BasicInput v-model='message' class='room__message-form-input' placeholder='Enter message'></BasicInput>
    <BasicButton type='submit'>Send message</BasicButton>
  </form>
</template>

<script>
  import { socket } from '../../services/socketService'
  import { ref } from 'vue'
  import { useStore } from 'vuex'

  export default {
    name: 'RoomMessageForm',
    setup() {
      const store = useStore()

      const message = ref('')
      const sendMessage = () => {
        const { username } = store.state.auth
        socket.emit('message', {
          text: message.value,
          date: Date.now(),
          username,
        })
        message.value = ''
      }

      return { message, sendMessage }
    },
  }
</script>

<style>
  .room__message-form {
    display: flex;
    max-width: 75%;
    justify-content: space-between;
  }

  .room__message-form-input {
    height: 100% !important;
    flex: 1 1 auto;
  }
</style>