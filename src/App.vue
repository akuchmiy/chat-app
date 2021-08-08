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
        return (this.$route.meta.layout || 'main') + '-layout'
      }
    },
    components: {
      AuthorizationLayout, MainLayout
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
  }
</style>
