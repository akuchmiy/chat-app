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
  .main__header {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 0 0 20px 20px;
    font-size: 2em;
    background-color: #fff;
  }

  main {
    /*display: flex;*/
    flex: 1 1 auto;
  }
</style>