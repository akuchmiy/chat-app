<template>
  <div ref='messageContainer' class='room__message-container hidden-scroll'>
    <ul class='messages'>
      <MessageListItem
        v-for='message of messages'
        :key='messageKey(message)'
        :message='message'
        :current-user='isCurrentUser(message.user.username)'
      ></MessageListItem>
    </ul>
  </div>
</template>

<script>
  import { socket } from '../../services/socketService'
  import { computed, onBeforeUnmount, onMounted, ref, onUpdated } from 'vue'
  import MessageListItem from './MessageListItem'
  import { useStore } from 'vuex'

  export default {
    name: 'RoomMessageList',
    components: { MessageListItem },
    props: {
      roomId: { type: String, required: true },
    },
    setup(props) {
      const store = useStore()
      const messages = computed(() => store.state.room.messages)
      const messageContainer = ref(null)

      onUpdated(() => messageContainer.value.scrollTo({top: messageContainer.value.scrollHeight, behavior: 'smooth'}))
      const isCurrentUser = (username) => username === store.state.auth.username
      const messageKey = (message) => message.user.username + message.date

      const onMessageHandler = (data) => {
        store.dispatch('room/pushMessageSocket', data)
      }

      onMounted(() => {
        store.dispatch('room/fetchMessages', props.roomId)
        socket.on('message', onMessageHandler)
      })
      onBeforeUnmount(() => {
        socket.off('message', onMessageHandler)
        store.commit('room/CLEAR_MESSAGES')
      })

      return { messages, isCurrentUser, messageKey, messageContainer }
    },
  }
</script>

<style lang='scss'>
  .room__message-container {
    overflow-y: scroll;
    padding-right: 5px;
    max-height: calc(100vh - 172px);

    .messages {
      list-style: none;
      display: grid;
      row-gap: 5px;
      max-width: 100%;
    }
  }
</style>