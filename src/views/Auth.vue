<template>
  <div class='authorization'>
    <form class='authorization__form' @submit.prevent>
      <h1 class='authorization__title'>Please log in</h1>
      <div class='authorization__fields'>
        <label for='username'>Username:<abbr title='required' aria-label='required'>*</abbr></label>
        <BasicInput id='username' v-model.trim='username' name='username' placeholder='Enter username'></BasicInput>
        <p v-show='usernameMessage' class='validation-error'>{{ usernameMessage }}</p>

        <label for='password'>Password:<abbr title='required' aria-label='required'>*</abbr></label>
        <BasicInput id='password' v-model.trim='password' type='password' name='passport'
                    placeholder='Enter password'></BasicInput>
        <p v-show='passwordMessage' class='validation-error'>{{ passwordMessage }}</p>
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
  import { validationWrapper } from '../services/validationService'

  export default {
    name: 'Auth',
    setup() {
      const username = ref('')
      const password = ref('')
      const store = useStore()
      const router = useRouter()
      const usernameMessage = ref('')
      const passwordMessage = ref('')
      const validatePassword = validationWrapper('Password', [
        { regexp: /\d/, message: 'Password must contain at least one number'}
      ])
      const validateUsername = validationWrapper('Username')

      function validateFields() {
        usernameMessage.value = validateUsername(username.value, 4)
        passwordMessage.value = validatePassword(password.value, 8)
        return passwordMessage.value || usernameMessage.value
      }

      function register() {
        const error = validateFields()
        if (error) return

        apiService.registerUser({
          username: username.value,
          password: password.value,
        }).catch(() => {
          usernameMessage.value = ''
          passwordMessage.value = 'User with such username is already exist'
        })
      }

      function login() {
        const error = validateFields()
        if (error) return

        apiService.loginUser({
          username: username.value,
          password: password.value,
        }).then((data) => {
          store.dispatch('auth/setUserData', { ...data, username: username.value })
          router.push('/')
        })
          .catch(() => {
            usernameMessage.value = ''
            passwordMessage.value = 'Invalid username or password'
          })
      }

      return { username, password, register, login, usernameMessage, passwordMessage }
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
    row-gap: 5px;
    column-gap: 5px;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      margin-bottom: 20px;
    }

    .validation-error {
      font-size: .8em;
      color: #ff738d;
      text-align: center;
      grid-column: span 2;
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