<template>
  <nav class='nav rounded-shadow'>
    <div class='nav__header'>
      <h2>
        <font-awesome-icon :icon="['fas', 'comment-alt']"></font-awesome-icon>
        Rooms
      </h2>
      <BasicButton
        @click='changeModalVisibility'
        class='nav__new-room'
        v-tooltip.hover.focus='tooltipOptions'
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </BasicButton>
    </div>
    <div class='rooms hidden-scroll'>
      <RoomsList></RoomsList>
    </div>
    <teleport to='#app'>
      <transition name='modal' mode='out-in'>
        <CreateRoom v-if='visibleModal' @close='changeModalVisibility'></CreateRoom>
      </transition>
    </teleport>
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

      const tooltipOptions = {
        top: '-30px',
        left: '-50px',
        text: "Create or join the room",
        duration: 3000
      }

      return { visibleModal, changeModalVisibility, tooltipOptions }
    },
    components: {
      CreateRoom,
      RoomsList,
    },
  }
</script>

<style lang='scss'>
  .nav {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    //overflow: hidden;
  }

  @media (max-width: $mobile-breakpoint) {
    .nav {
      display: grid;
      grid-template-rows: auto 1fr 1fr;
      width: 100%;
      height: calc(100vh - 76px);
    }
  }

  /*hr {*/
  /*  margin-bottom: 10px;*/
  /*}*/

  .nav__header {
    margin-bottom: 10px;
    padding: 10px;
  }

  .nav__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
  }

  .rooms {
    flex: 1 1 auto;
    max-height: calc(100vh - 156px);
    overflow-y: scroll;
    padding: 0 10px 10px 10px;
  }

  .nav__new-room {
    align-items: center;
  }

  .modal-enter-from {
    opacity: 0;
  }

  .modal-leave-to {
    opacity: 0;
  }

  .modal-leave-active .modal-container {
    transform: scale(1.1);
  }
</style>