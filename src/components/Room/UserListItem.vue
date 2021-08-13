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

    .status {
      color: red;
    }
    .online {
      color: green;
    }
  }
</style>