<template>
  <component :is='layout'>
  </component>
</template>

<script>
  import AuthorizationLayout from '@/layouts/AuthorizationLayout.vue'
  import MainLayout from '@/layouts/MainLayout.vue'
  export default {
    computed: {
      layout() {
        const layout = (this.$route.meta.layout || 'main') + '-layout'
        console.log(layout)
        return layout
      }
    },
    components: {
      AuthorizationLayout, MainLayout
    },
  }
</script>

<style lang='scss'>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
