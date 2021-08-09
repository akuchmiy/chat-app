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
    border-radius: 0 0 20px 20px;
    font-size: 36px;
    font-size: 2.5vw;
    background-color: #fff;

    @media (max-width: 768px) {
      font-size: 4vw;
    }

    @media (max-width: 420px) {
      font-size: 6vw;
    }
  }

  main {
    /*display: flex;*/
    flex: 1 1 auto;
  }
</style>