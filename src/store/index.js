import { createStore } from "vuex";
import auth from './modules/auth'
import room from './modules/room'

export default createStore({
  state: {
    visibleNav: true
  },
  mutations: {
    SET_NAV_STATUS(state, status) {
      state.visibleNav = status
    }
  },
  actions: {},
  modules: {
    auth,
    room
  },
});
