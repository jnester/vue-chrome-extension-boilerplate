import { createStore } from "vuex";
import { auth } from "./auth.module";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
  },
});

export default store;
