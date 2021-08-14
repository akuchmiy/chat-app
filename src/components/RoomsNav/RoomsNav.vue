<template>
  <nav class='nav rounded-shadow'>
    <div class='nav__header'>
      <h2>Rooms</h2>
      <BasicButton @click='changeModalVisibility' class='nav__new-room'>
        <font-awesome-icon :icon="['fas', 'plus']" />
      </BasicButton>
    </div>
    <hr>
    <RoomsList></RoomsList>

    <CreateRoom v-if='visibleModal' @close='changeModalVisibility'></CreateRoom>
  </nav>
</template>

<script>
  import RoomsList from '@/components/RoomsNav/RoomsList.vue'
  import { ref } from 'vue'
  import CreateRoom from './CreateRoom'

  export default {
    name: 'RoomsNav',
    setup() {
      const visibleModal = ref(false)
      const changeModalVisibility = () => visibleModal.value = !visibleModal.value

      return { visibleModal, changeModalVisibility }
    },
    components: {
      CreateRoom,
      RoomsList,
    },
  }
</script>

<style>
  .nav {
    background-color: #fff;
    padding: 10px;
    overflow: hidden;
  }

  .nav__header, hr {
    margin-bottom: 10px;
  }

  .nav__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav__new-room {
    align-items: center;
  }
</style>