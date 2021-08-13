import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BasicInput from './components/Basic/BasicInput'
import BasicButton from './components/Basic/BasicButton'
import './services/socketService'

createApp(App)
  .use(store)
  .use(router)
  .component("BasicInput", BasicInput)
  .component('BasicButton', BasicButton)
  .mount("#app");
