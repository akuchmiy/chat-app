import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import BasicInput from '@/components/Basic/BasicInput'
import BasicButton from '@/components/Basic/BasicButton'
import focusDirective from '@/directives/focus'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/services/socketService'
import '@/assets/fontAwesomeIcons'

createApp(App)
  .use(store)
  .use(router)
  .component('BasicInput', BasicInput)
  .component('BasicButton', BasicButton)
  .component('font-awesome-icon', FontAwesomeIcon)
  .directive('focus', focusDirective)
  .mount('#app')
