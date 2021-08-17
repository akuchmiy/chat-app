<template>
  <ModalWindow classValue='create-room' @close='$emit("close")'>
    <template v-slot:header>
      <h3>Create or join the existing room</h3>
    </template>
    <template v-slot:body>
      <form class='modal-inputs'>
        <BasicInput v-model.trim='roomName' placeholder='Enter room name'></BasicInput>
        <BasicInput v-model.trim='roomId' placeholder='Enter room id'></BasicInput>
      </form>
    </template>
    <template v-slot:footer>
      <div class='modal-buttons'>
        <BasicButton @click='createRoom'>Create room</BasicButton>
        <BasicButton @click='addRoom'>Join room</BasicButton>
      </div>
    </template>
  </ModalWindow>
</template>

<script>
  import ModalWindow from '../ModalWindow'
  import { ref } from 'vue'
  import { useStore } from 'vuex'

  export default {
    name: 'CreateRoom',
    emits: ['close'],
    setup(props, {emit}) {
      const store = useStore()
      const roomName = ref('')
      const roomId = ref('')
      const createRoom = () => {
        if (!roomName.value) return
        if (roomName.value.length > 18) return
        store.dispatch('createRoom', roomName.value).then(() => emit('close'))
      }
      const addRoom = () => {
        if (!roomId.value) return
        store.dispatch('addRoom', roomId.value).then(() => emit('close'))
      }

      return { roomName, roomId, createRoom, addRoom }
    },
    components: { ModalWindow },
  }
</script>

<style lang='scss'>
  .create-room {
    .modal-header {
      text-align: center;
    }
    .modal-inputs,
    .modal-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      input, button {
        width: 150px;
      }
    }

  }
</style>