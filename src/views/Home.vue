<template>
  <div id='home' class='home'>
    <RoomsNav :class='{visible: visibleNav}' :aria-expanded='visibleNav'></RoomsNav>
    <router-view v-slot='{ Component, route }'>
      <transition name='fade' mode='out-in'>
        <component :is='Component' :key='route.path'></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
  import RoomsNav from '@/components/RoomsNav/RoomsNav.vue'
  import { useStore } from 'vuex'
  import { computed } from 'vue'

  export default {
    name: 'Home',
    setup() {
      const store = useStore()
      const visibleNav = computed(() => store.state.visibleNav)

      return { visibleNav }
    },
    components: { RoomsNav },
  }
</script>

<style lang='scss'>
  .home {
    position: relative;
    flex: 1 1 auto;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 10px;

    @media (max-width: $mobile-breakpoint) {
      grid-template-columns: 1fr;
      .nav {
        //z-index: -1;
        z-index: 1;
        position: absolute;
        left: -110%;
        transition: all .5s;
      }
      .nav.visible {
        left: 0;
      }
    }
  }

  .fade-enter-active {
    opacity: 0.7;
    transition: .3s;
    transform: scale(0.85);
  }

  .fade-leave-active {
    transition: .3s;
  }

  .fade-enter-to {
    opacity: 1;
    transform: scale(1);
  }

  .fade-leave-to {
    opacity: 0.7;
    transform: scale(0.85);
  }
</style>
