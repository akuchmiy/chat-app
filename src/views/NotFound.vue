<template>
  <div class='not-found'>
    <h1>404</h1>
    <h2>There is no such page</h2>
    <h3>
      Please, visit
      <router-link to='/'>home page</router-link>
    </h3>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
  }
</script>

<style lang='scss'>
  .not-found {
    text-align: center;
    h1 {
      font-size: 5em;
    }
    h2 {
      font-size: 4em;
    }
  }
</style>