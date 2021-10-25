import 'bulma-fluent/bulma.sass'
import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import Vuex from 'vuex'

import VueRouter from "vue-router";


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.use(VueRouter)

import router from "./router";

// eslint-disable-next-line
new Vue({
  el: '#app',
  store: store,
  router: router,
  render: (h) => h(App),
})
