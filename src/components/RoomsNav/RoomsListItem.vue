<template>
  <router-link :to='link' class='rooms__list-link'>
    <div class='rooms__list-item'>
      <div></div>
      <span><b>{{ room.users }}</b></span>
      <h4>{{ room.name }}</h4>
    </div>
  </router-link>
</template>

<script>
  import { computed } from 'vue'

  export default {
    name: 'RoomsListItem',
    props: {
      room: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const link = computed(() => ({
        path: `/rooms/${props.room.id}`,
        query: { roomName: props.room.name },
      }))

      return { link }
    },
  }
</script>

<style lang='scss'>

  .rooms__list-link {
    color: inherit;
    text-decoration: none;
  }

  .rooms__list-item {
    background-color: #fff;
    z-index: 100;
    position: relative;
    padding: 15px;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 5px rgba(51, 51, 51, 0.18);
    transition: .25s;
    cursor: pointer;

    &:hover {
      background-color: #eeeeee;
    }

    div {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #ffc3a0;
      width: 100%;
      height: 100%;
      clip-path: circle(40px at 20px 50%);
    }

    span, h4 {
      font-size: 24px;
      z-index: 2;
    }

    span {
      margin: 0 30px 0 10px;
    }
  }

  a.rooms__list-link.router-link-exact-active .rooms__list-item {
    background-color: #eeeeee;
  }
</style>