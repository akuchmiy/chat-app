<template>
  <transition name='slide' mode='out-in'>
    <component :is='layout'></component>
  </transition>
</template>

<script>
  import AuthorizationLayout from '@/layouts/AuthorizationLayout.vue'
  import MainLayout from '@/layouts/MainLayout.vue'

  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || 'main') + '-layout'
      },
    },
    components: {
      AuthorizationLayout, MainLayout,
    },
  }
</script>

<style lang='scss'>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    height: 100vh;
    overflow: hidden;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #ffafbd, #ffc3a0);
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all .5s;
    //opacity: 1;
  }

  .slide-enter-from {
    transform: translate(-100%, 0);
    opacity: 0;
  }

  .slide-leave-to {
    transform: translate(100%, 0);
    opacity: 0;
  }

</style>
