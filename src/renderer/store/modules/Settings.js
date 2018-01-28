import os from 'os'
import path from 'path'

const state = {
  downloadDir: path.join(os.tmpdir(), 'podcasts')
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
