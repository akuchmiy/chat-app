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
    background: linear-gradient(135deg, #ffafbd, #ffc3a0);
    flex: 1 1 auto;
  }
</style>