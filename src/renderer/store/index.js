import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createLogger from 'vuex/dist/logger'
import modules from './modules'
import downloadPlugin from './downloadPlugin'
import refreshFeedPlugin from './refreshFeedPlugin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [downloadPlugin, refreshFeedPlugin, createPersistedState(), createLogger()],
  strict: process.env.NODE_ENV !== 'production'
})
