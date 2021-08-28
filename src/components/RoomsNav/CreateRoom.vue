<template>
  <ModalWindow classValue='create-room' @close='$emit("close")'>
    <template v-slot:header>
      <h3>Create or join an existing room</h3>
    </template>
    <template v-slot:body>
      <form class='modal-inputs'>
        <BasicInput v-focus v-model.trim='roomName' placeholder='Enter room name'></BasicInput>
        <BasicInput v-model.trim='roomId' placeholder='Enter room id'></BasicInput>
      </form>
      <p v-if='errorMessage' class='create-error'>{{ errorMessage }}</p>
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
  import { validationWrapper } from '@/services/validationService'

  export default {
    name: 'CreateRoom',
    emits: ['close'],
    setup(props, { emit }) {
      const store = useStore()
      const roomName = ref('')
      const roomId = ref('')

      const errorMessage = ref('')

      const validateRoomName = validationWrapper('Name', [
        { regexp: /^.{1,18}$/, message: 'Room name can be a maximum of 18 characters long' },
      ])
      const validateId = validationWrapper('Room id', [
        { regexp: /^.{24}$/, message: 'Room id must be a 24 character string' },
      ])

      const createRoom = () => {
        errorMessage.value = validateRoomName(roomName.value, 3)
        if (!roomName.value || errorMessage.value) return
        if (roomName.value.length > 18) return
        store.dispatch('createRoom', roomName.value).then(() => emit('close'))
      }
      const addRoom = () => {
        errorMessage.value = validateId(roomId.value, 24)
        if (!roomId.value || errorMessage.value) return
        store.dispatch('addRoom', roomId.value)
          .then(() => emit('close'))
          .catch(() => errorMessage.value = 'Room id is invalid, or you already a participant of the room')
      }

      return { roomName, roomId, createRoom, addRoom, errorMessage }
    },
    components: { ModalWindow },
  }
</script>

<style lang='scss'>
  .create-room {
    .modal-container {
      .modal-inputs {
        margin-bottom: 10px;
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

      @media (max-width: 400px) {
        width: 300px;
        .modal-inputs input,
        .modal-buttons button {
          width: 110px;
        }
      }
    }

    .modal-header {
      text-align: center;
    }

    .create-error {
      font-size: .8em;
      color: #ff738d;
      text-align: center;
    }

  }
</style>