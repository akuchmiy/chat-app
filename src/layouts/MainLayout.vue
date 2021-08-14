<template>
  <main>
    <h1 class='main__header'>
      <font-awesome-icon
        @click='toggleNav'
        class='menu-bar'
        :icon="faIcon"
        role='button'
        aria-label='rooms-menu'
      />
     <div class='main__header-info'>
       <span>Chat app</span>
       <div class='user-info'>
         <span><i>{{username}}</i></span>
       </div>
     </div>
    </h1>
    <router-view></router-view>
  </main>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed } from 'vue'

  export default {
    name: 'MainLayout',
    setup() {
      const store = useStore()
      const visibleNav = computed(() => store.state.visibleNav)
      const username = computed(() => store.state.auth.username)
      const faIcon = computed(() => visibleNav.value ? ['fas', 'times'] : ['fas', 'bars'])
      const toggleNav = () => store.commit('SET_NAV_STATUS', !visibleNav.value)

      return {toggleNav, faIcon, username}
    }
  }
</script>

<style lang='scss' scoped>
  main {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 0 10px 10px;
  }

  .main__header {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 0 0 20px 20px;
    font-size: 2em;
    background-color: #fff;
    flex: 0 0 auto;
    .main__header-info {
      display: flex;
      flex: 1 1 auto;
      justify-content: space-between;
    }
    .menu-bar {
      width: 1em;
      height: 1em;
      display: none;
      margin-right: 10px;
      cursor: pointer;
      @media (max-width: 768px) {
        display: inline;
      }
      &:hover {
        transform: scale(1.1);
      }
    }
  }
</style>