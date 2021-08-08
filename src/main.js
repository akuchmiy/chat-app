import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BasicInput from './components/BasicInput'

createApp(App)
  .use(store)
  .use(router)
  .component("BasicInput", BasicInput)
  .mount("#app");
