import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMoment from 'vue-moment'
import VueLazyload from 'vue-lazyload'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(VueMoment)
// const loadimage = require('/images/gameLoading.gif')
// const errorimage = require('/images/gameLoading.gif')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: errorimage,
  // loading: loadimage,
  attempt: 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
