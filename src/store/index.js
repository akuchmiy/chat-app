import { createStore } from "vuex";
import auth from './modules/auth'
import room from './modules/room'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    room
  },
});
