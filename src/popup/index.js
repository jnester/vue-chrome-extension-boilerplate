import 'bulma-fluent/bulma.sass'
import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
.use(store)


// eslint-disable-next-line
new Vue({
  el: '#app',
  store: store,
  render: (h) => h(App),
})
