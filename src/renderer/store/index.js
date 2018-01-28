import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import downloadPlugin from './downloadPlugin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [downloadPlugin],
  strict: process.env.NODE_ENV !== 'production'
})
