import os from 'os'
import Vue from 'Vue'
import { startOfDay, subYears, subMonths, subWeeks, subDays } from 'date-fns'

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
  getIgnoreOlderThanDateTime: state => {
    const start = startOfDay(new Date())
    switch (state.ignoreOlderThanUnit) {
      case 'years':
        return subYears(start, state.ignoreOlderThan)
      case 'months':
        return subMonths(start, state.ignoreOlderThan)
      case 'weeks':
        return subWeeks(start, state.ignoreOlderThan)
      case 'days':
        return subDays(start, state.ignoreOlderThan)
    }
  }
}

export default {
  state,
  mutations,
  getters
}
