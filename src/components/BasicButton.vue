<template>
  <button role='button'>
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'BasicButton',
  }
</script>

<style lang='scss' scoped>
  button {
    display: inline-block;
    background: #ffc3a0;
    padding: 10px 15px;
    border-radius: 5px;
    transition: all .4s;
    cursor: pointer;
    border: 1px solid transparent;

    &:focus, &:hover {
      outline: none;
      transform: translate(0, -4px);
      border: 1px solid black;
    }
  }
</style>