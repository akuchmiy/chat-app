<template>
  <div class='users-item'>
    <span class='username'>{{ username }}</span>
    <span class='status' :class='{online}'>{{online ? 'online' : 'offline'}}</span>
  </div>
</template>

<script>
  export default {
    name: 'UserListItem',
    props: {
      username: {
        type: String,
      },
      online: {
        type: Boolean,
      },
    },
  }
</script>

<style lang='scss'>
  .users-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 1.3em;
    margin-bottom: 5px;

    .username {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .status {
      color: #c37575;
    }
    .online {
      color: #66b066;
    }
  }
</style>