<template>
  <div class='authorization'>
    <form class='authorization__form' @submit.prevent>
      <h1 class='authorization__title'>Please log in</h1>
      <div class='authorization__fields'>
        <label for='name'>Username:<abbr title='required' aria-label='required'>*</abbr></label>
        <input v-model.trim='username' id='name' type='text' name='username'>

        <label for='password'>Password:<abbr title='required' aria-label='required'>*</abbr></label>
        <input v-model.trim='password' id='password' type='password' name='password'>
      </div>
      <div class='authorization__submit'>
        <button @click='register' type='submit'>Register</button>
        <button @click='login' type='submit'>Log in</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      register() {
      },
      login() {
      },
    },
  }
</script>

<style lang='scss'>
  .authorization {
    min-width: 300px;
    width: 40%;
    border-radius: 5px;
    box-shadow: 3px 3px 8px #2c3e50;
    background-color: white;
    padding: 10px;
  }

  .authorization__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .authorization__title {
    margin-bottom: 15px;
  }

  .authorization__fields {
    display: grid;
    //width: 300px;
    row-gap: 10px;
    //column-gap: 5px;
    align-items: center;
    grid-template-columns: 0.8fr 1fr;
    margin-bottom: 20px;
    label {
      justify-self: start;
    }
    input {
      justify-self: end;
    }
  }

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

  .authorization__submit {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    button {
      display: inline-block;
      background: #ffc3a0;
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      transition: all .4s;

      &:focus, &:hover {
        outline: none;
        transform: translate(0, -4px);
      }
    }
  }

</style>