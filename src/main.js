import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mint-ui/lib/style.css'
import './common/js/plugins/flexible.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
