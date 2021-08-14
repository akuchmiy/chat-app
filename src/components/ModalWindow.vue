<template>
  <teleport to='#app'>
    <!--    <transition name='modal'>-->
    <div @click='closeModal' class='modal-mask' :class='classValue'>
      <div class='modal-wrapper'>
        <div @click.prevent class='modal-container rounded-shadow'>

          <div class='modal-header'>
            <slot name='header'>
              default header
            </slot>
          </div>

          <div class='modal-body'>
            <slot name='body'>
              default body
            </slot>
          </div>

          <div class='modal-footer'>
            <slot name='footer'>
              default footer
              <BasicButton class='modal-default-button' @click="$emit('close')">
                OK
              </BasicButton>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <!--    </transition>-->
  </teleport>
</template>

<script>
  export default {
    name: 'ModalWindow',
    props: ['classValue'],
    emits: ['close'],
    setup(props, { emit }) {
      const closeModal = (event) => {
        if (event.defaultPrevented) return
        emit('close')
      }

      return { closeModal }
    },
  }
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 400px;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    transition: all 0.3s ease;
  }

  .modal-header h3 {
    margin-top: 0;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*.modal-enter-to {*/
  /*  opacity: 0;*/
  /*}*/

  /*.modal-leave-from {*/
  /*  opacity: 0;*/
  /*}*/

  /*.modal-enter-active .modal-container,*/
  /*.modal-leave-active .modal-container {*/
  /*  transform: scale(1.1);*/
  /*}*/

</style>