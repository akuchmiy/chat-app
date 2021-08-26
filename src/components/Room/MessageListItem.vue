<template>
  <div class='user-message' :class='{own: currentUser}'>
    <h5 class='user-name'>{{ currentUser ? "You" : message?.user?.username }}
      <time>{{ dateTimeFilter(message.date) }}</time>
    </h5>
    <p class='user__message-text'>{{ message.text }}</p>
  </div>
</template>

<script>
  import { dateTimeMixin } from '../../mixins/dateTimeMixin'
  export default {
    name: 'MessageListItem',
    props: {
      message: {
        type: Object,
        required: true,
      },
      currentUser: {
        type: Boolean,
        required: true,
      },
    },
    setup() {
      const filter = dateTimeMixin('ru-RU')
      const dateTimeFilter = (date) => {
        const newDate = Date.parse(date)
        return filter(newDate)
      }

      return { dateTimeFilter }
    }
  }
</script>

<style>
  .user-message {
    padding: 5px;
    background-color: #ffafbd;
    border-radius: 10px;
    justify-self: start;
    max-width: 70%;
    overflow-wrap: anywhere;
  }

  .user-message .user-name time {
    color: #7c7c7c;
    font-size: 0.8em;
  }

  .user-message.own {
    background-color: #ffc3a0;
    justify-self: end;
  }
</style>