import Vue from 'vue'
import axios from 'axios'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fafree from '@fortawesome/fontawesome-free-solid'
import BootstrapVue from 'bootstrap-vue'
import infiniteScroll from 'vue-infinite-scroll'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

fontawesome.library.add(fafree)
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon)

Vue.use(BootstrapVue)

Vue.use(infiniteScroll)

store.dispatch('cleanOldPosts')

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
