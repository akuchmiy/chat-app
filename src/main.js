import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BasicInput from './components/BasicInput'
import BasicButton from './components/BasicButton'
import './services/socketService'

createApp(App)
  .use(store)
  .use(router)
  .component("BasicInput", BasicInput)
  .component('BasicButton', BasicButton)
  .mount("#app");
