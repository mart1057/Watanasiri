import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is_login: false,
    drawer: false,
  },
  getters: {
  },
  mutations: {
    doLogin(state, data) {
      state.is_login = true;
      state.userInfo = data;
    },
    doLogout(state, data) {
    },
    changeDrawer(state, data) {
      state.drawer = data;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin]
})
