<template>
  <div class='room__main'>
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
    <RoomMessageForm :roomId='roomId'></RoomMessageForm>
  </div>
</template>

<script>
  import { socket } from '../../services/socketService'
  import { computed, onBeforeUnmount, onMounted, ref, onUpdated } from 'vue'
  import MessageListItem from './MessageListItem'
  import RoomMessageForm from './RoomMessageForm'
  import { useStore } from 'vuex'

  export default {
    name: 'RoomMessageList',
    components: { MessageListItem, RoomMessageForm },
    props: {
      roomId: { type: String, required: true },
    },
    setup(props) {
      const store = useStore()
      const messages = computed(() => store.state.room.messages)
      const messageContainer = ref(null)

      const scrollToBottom = () => messageContainer.value.scrollTo({
        top: messageContainer.value.scrollHeight,
        behavior: 'smooth'
      })
      onUpdated(scrollToBottom)

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
  .room__main {
    display: flex;
    flex-direction: column;
  }

  .room__message-container {
    flex: 1 1 auto;
    overflow-y: scroll;
    padding-right: 5px;
    margin-bottom: 5px;
    max-height: calc(100vh - 180px);

    .messages {
      list-style: none;
      display: grid;
      row-gap: 5px;
      max-width: 100%;
    }
  }
</style>