import 'bulma-fluent/bulma.sass'
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: (h) => h(App),
})
