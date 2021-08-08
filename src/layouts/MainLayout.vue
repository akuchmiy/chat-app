<template>
  <!-- TheNav component with rooms-->
  <main>
    Hi from main
    <router-view></router-view>
  </main>
  <!-- TheFooter component -->
</template>

<script>
  export default {
    name: 'MainLayout',
  }
</script>

<style scoped>
  main {
    display: flex;
    background: linear-gradient(135deg, #ffafbd, #ffc3a0);
    flex: 1 1 auto;
  }
</style>