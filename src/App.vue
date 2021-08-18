<template>
  <transition name='slide' mode='out-in'>
    <component :is='layout'></component>
  </transition>
</template>

<script>
  import AuthorizationLayout from '@/layouts/AuthorizationLayout.vue'
  import MainLayout from '@/layouts/MainLayout.vue'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  export default {
    setup() {
      const route = useRoute()
      const layout = computed(() => (route.meta.layout || 'main') + '-layout')

      return { layout }
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
    padding: 0 10px 10px;
  }

  .rounded-shadow {
    border-radius: 10px;
    box-shadow: 3px 3px 8px #7c7c7c;
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

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    border: 0;
    clip: rect(0 0 0 0)
  }

  .hidden-scroll {
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0.4rem;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(255, 195, 160, 0.5);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 195, 160, 1);
      outline: 1px solid #7c7c7c;
    }
  }
</style>
