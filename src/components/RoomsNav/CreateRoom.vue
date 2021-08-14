<template>
  <ModalWindow classValue='create-room' @close='$emit("close")'>
    <template v-slot:header>
      <h3>Create of join the existing room</h3>
    </template>
    <template v-slot:body>
      <form class='modal-inputs'>
        <BasicInput placeholder='Enter room name'></BasicInput>
        <BasicInput placeholder='Enter room id'></BasicInput>
      </form>
    </template>
    <template v-slot:footer>
      <div class='modal-buttons'>
        <BasicButton>Create room</BasicButton>
        <BasicButton>Join room</BasicButton>
      </div>
    </template>
  </ModalWindow>
</template>

<script>
  import ModalWindow from '../ModalWindow'

  export default {
    name: 'CreateRoom',
    emits: ['close'],
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