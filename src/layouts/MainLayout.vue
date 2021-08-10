<template>
  <main>
    <h1 class='main__header'>Chat app</h1>
    <router-view></router-view>
  </main>
</template>

<script>
  export default {
    name: 'MainLayout',
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
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 0 0 20px 20px;
    font-size: 2em;
    background-color: #fff;
    flex: 0 0 auto;
  }
</style>