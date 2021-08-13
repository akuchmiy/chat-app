<template>
  <div class='room__message-container hidden-scroll'>
    <ul class='messages'>
      <MessageListItem
        v-for='message of messages'
        :key='messageKey(message)'
        :message='message'
        :current-user='isCurrentUser(message.username)'
      ></MessageListItem>
    </ul>
  </div>
</template>

<script>
  import { socket } from '../../services/socketService'
  import { onBeforeUnmount, onMounted, reactive } from 'vue'
  import MessageListItem from './MessageListItem'
  import { useStore } from 'vuex'

  export default {
    name: 'RoomMessageList',
    components: { MessageListItem },
    props: {
      roomId: { type: String, required: true },
    },
    setup() {
      const store = useStore()

      const isCurrentUser = (username) => username === store.state.auth.username
      const messageKey = (message) => message.username + message.date
      const messages = reactive([])

      const onMessageHandler = (data) => {
        messages.push(data)
      }

      onMounted(() => socket.on('message', onMessageHandler))
      onBeforeUnmount(() => socket.off('message', onMessageHandler))

      return { messages, isCurrentUser, messageKey }
    },
  }
</script>

<style lang='scss'>
  .room__message-container {
    border-right: 2px solid #ffc3a0;
    overflow-y: scroll;
    padding-right: 5px;
    max-height: calc(100vh - 172px);

    .messages {
      list-style: none;
      display: grid;
      row-gap: 10px;

    }
  }
</style>