<template>
  <div class='authorization'>
    <form class='authorization__form' @submit.prevent>
      <h1 class='authorization__title'>Please log in</h1>
      <div class='authorization__fields'>
        <label for='username'>Username:<abbr title='required' aria-label='required'>*</abbr></label>
        <BasicInput id='username' v-model.trim='username' name='username' placeholder='Enter username'></BasicInput>

        <label for='password'>Password:<abbr title='required' aria-label='required'>*</abbr></label>
        <BasicInput id='password' v-model.trim='password' type='password' name='passport'
                    placeholder='Enter password'></BasicInput>
      </div>
      <div class='authorization__submit'>
        <BasicButton @click='register' type='submit'>Register</BasicButton>
        <BasicButton @click='login' type='submit'>Log in</BasicButton>
      </div>
    </form>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import apiService from '../services/apiService'

  export default {
    name: 'Auth',
    setup() {
      const username = ref('')
      const password = ref('')
      const store = useStore()
      const router = useRouter()

      function register() {
        apiService.registerUser({
          username: username.value,
          password: password.value,
        }).then(() => {
          alert('User successfully created')
        }).catch((e) => console.dir(e))
      }

      function login() {
        apiService.loginUser({
          username: username.value,
          password: password.value,
        }).then((data) => {
          store.dispatch('auth/setUserData', {...data, username: username.value})
          router.push('/')
        })
          .catch((e) => console.log("In Auth.vue" + e))
      }

      return { username, password, register, login }
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
    padding: 40px 10px;
  }

  .authorization__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .authorization__title {
    margin-bottom: 30px;
  }

  .authorization__fields {
    display: grid;
    //width: 300px;
    row-gap: 10px;
    column-gap: 5px;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      margin-bottom: 20px;
    }

    label {
      justify-self: center;
    }

    input {
      justify-self: end;
    }
  }

  .authorization__submit {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

</style>