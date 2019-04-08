import Vue from 'vue'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import BootstrapVue from 'bootstrap-vue'
import infiniteScroll from 'vue-infinite-scroll'
import unhandled from 'electron-unhandled'
import log from 'electron-log'
import Toasted from 'vue-toasted'

import App from './App'
import router from './router'
import store from './store'

unhandled({
  logger: log.info,
  showDialog: false
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

library.add(fas)
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon)

Vue.use(BootstrapVue)

Vue.use(infiniteScroll)

Vue.use(Toasted)

store.dispatch('cleanOldPosts')

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
