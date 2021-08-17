<template>
  <nav class='nav rounded-shadow'>
    <div class='nav__header'>
      <h2>Rooms</h2>
      <BasicButton @click='changeModalVisibility' class='nav__new-room'>
        <font-awesome-icon :icon="['fas', 'plus']" />
      </BasicButton>
    </div>
    <hr>
    <div class='rooms hidden-scroll'>
      <RoomsList></RoomsList>
    </div>
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
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 10px;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .nav {
      max-width: 100%;
    }
  }

  .nav__header, hr {
    margin-bottom: 10px;
  }

  .nav__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rooms {
    flex: 1 1 auto;
    max-height: calc(100vh - 156px);
    overflow-y: scroll;
    padding-right: 5px;
    margin-right: -10px;
  }

  .nav__new-room {
    align-items: center;
  }
</style>