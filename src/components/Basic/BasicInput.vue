<template>
  <input
    :value='modelValue'
    @input='$emit("update:modelValue", $event.target.value)'
    type='text'
    ref='input'
  >
</template>

<script>
  import { ref } from 'vue'
  export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    name: 'BasicInput.vue',
    setup() {
      const input = ref(null)
      const focus = () => input.value.focus()

      return { focus, input }
    }
  }
</script>

<style lang='scss' scoped>
  input[type="text"], input[type="password"] {
    box-sizing: border-box;
    height: 30px;
    display: inline-block;
    padding: 10px;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    transition: all .3s;

  &:focus {
     border-color: black;
   }
  }
</style>