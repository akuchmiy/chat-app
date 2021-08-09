<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
  export default {
    name: 'AuthorizationLayout',
  }
</script>

<style scoped>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
  }
</style>