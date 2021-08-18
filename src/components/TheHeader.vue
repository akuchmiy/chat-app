<template>
  <header class='main__header'>
    <font-awesome-icon
      @click='toggleNav'
      class='menu-bar'
      tabindex='1'
      :icon='faIcon'
      role='button'
      :aria-label='visibleNav ? "Close rooms menu" : "Open rooms menu"'
      :aria-hidden='!visibleNav'
      focusable='true'
    />
    <div class='main__header-info'>
      <h1>Chat app</h1>
      <div class='user-info'>
        <span><i>{{ username }}</i></span>
      </div>
    </div>
  </header>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed } from 'vue'

  export default {
    name: 'TheHeader',
    setup() {
      const store = useStore()
      const visibleNav = computed(() => store.state.visibleNav)
      const username = computed(() => store.state.auth.username)
      const faIcon = computed(() => visibleNav.value ? ['fas', 'times'] : ['fas', 'bars'])
      const toggleNav = () => store.commit('SET_NAV_STATUS', !visibleNav.value)

      return { toggleNav, faIcon, username, visibleNav }
    },
  }
</script>

<style lang='scss'>
  .main__header {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 0 0 20px 20px;
    background-color: #fff;
    flex: 0 0 auto;

    .main__header-info {
      font-size: 2em;

      h1 {
        font-size: inherit;
      }

      display: flex;
      flex: 1 1 auto;
      justify-content: space-between;
    }

    .menu-bar {
      width: 2em;
      height: 2em;
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