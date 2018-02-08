import os from 'os'
import Vue from 'Vue'
import { DateTime } from 'luxon'

const state = {
  downloadDir: os.tmpdir(),
  ignoreOlderThan: 1,
  ignoreOlderThanUnit: 'years'
}

const mutations = {
  saveSettings (state, settings) {
    Object.keys(settings)
      .forEach((key) => {
        Vue.set(state, key, settings[key])
      })
  }
}

const getters = {
  getIgnoreOlderThanDateTime: state =>
    DateTime.local()
      .startOf('day')
      .minus({[state.ignoreOlderThanUnit]: state.ignoreOlderThan})
}

export default {
  state,
  mutations,
  getters
}
