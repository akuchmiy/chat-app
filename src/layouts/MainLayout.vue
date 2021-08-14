<template>
  <div class='wrapper'>
    <TheHeader></TheHeader>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import TheHeader from '../components/TheHeader'

  export default {
    name: 'MainLayout',
    components: { TheHeader },
  }
</script>

<style lang='scss' scoped>
  .wrapper {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
  main {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }
</style>