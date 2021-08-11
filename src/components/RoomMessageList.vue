<template>
  <div class='room__message-container hidden-scroll'>
    <ul class='messages'>
      <MessageItem
        v-for='message of messages'
        :key='messageKey(message)'
        :message='message'
        :current-user='isCurrentUser(message.username)'
      ></MessageItem>
    </ul>
  </div>
</template>

<script>
  import { socket } from '../services/socketService'
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import MessageItem from './MessageItem'

  export default {
    name: 'RoomMessageList',
    components: { MessageItem },
    props: {
      roomId: { type: Number, required: true },
    },
    setup() {
      const isCurrentUser = (username) => username === 'Vasya'
      const messageKey = (message) => message.username + message.date
      const messages = ref([
        {
          text: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet \n ' +
            'lorem ipsum dolor sit amet' +
            'lorem ipsum dolor sit amet', username: 'Vasya', date: Date.now() + 1000,
        },
        // {
        //   text: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet \n ' +
        //     'lorem ipsum dolor sit amet' +
        //     'lorem ipsum dolor sit amet', username: 'Dima', date: Date.now() + 2000,
        // },
        {
          text: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet \n ' +
            'lorem ipsum dolor sit amet' +
            'lorem ipsum dolor sit amet', username: 'Dima', date: Date.now() + 2000,
        },
        {
          text: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet \n ' +
            'lorem ipsum dolor sit amet' +
            'lorem ipsum dolor sit amet', username: 'Dima', date: Date.now() + 2000,
        },
        {
          text: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet \n ' +
            'lorem ipsum dolor sit amet' +
            'lorem ipsum dolor sit amet', username: 'Dima', date: Date.now() + 2000,
        },
        { text: 'Kostia 1 2 3', username: 'Natasha', date: Date.now() + 3000 },
      ])
      const onMessageHandler = (data) => {
        messages.value.push(data)
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