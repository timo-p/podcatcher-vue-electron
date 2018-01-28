import os from 'os'

const state = {
  downloadDir: os.tmpdir()
}

const mutations = {
  saveSettings (state, settings) {
    state.downloadDir = settings.downloadDir
  }
}

export default {
  state,
  mutations
}
