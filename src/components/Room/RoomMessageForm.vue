<template>
  <form @submit.prevent='sendMessage' class='room__message-form'>
    <BasicInput
      ref='input'
      v-model='message'
      class='room__message-form-input'
      placeholder='Enter message'
    ></BasicInput>
    <BasicButton @click='focusInput' type='submit'>Send</BasicButton>
  </form>
</template>

<script>
  import { socket } from '../../services/socketService'
  import { ref } from 'vue'
  import { useStore } from 'vuex'

  export default {
    name: 'RoomMessageForm',
    props: {
      roomId: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const store = useStore()
      const input = ref(null)

      const focusInput = () => input.value.focus()

      const message = ref('')
      const sendMessage = () => {
        if (!message.value) return
        const data = {
          username: store.state.auth.username,
          text: message.value,
          date: Date.now(),
        }
        store.dispatch('room/pushMessage', { data, roomId: props.roomId }).then(() => {
          socket.emit('message', data)
        })

        message.value = ''
      }

      return { message, sendMessage, input, focusInput }
    },
  }
</script>

<style lang='scss'>
  .room__message-form {
    display: flex;
    justify-content: space-between;
  }

  .room__message-form-input {
    height: 100% !important;
    flex: 1 1 auto;
  }
</style>