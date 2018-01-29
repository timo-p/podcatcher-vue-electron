import { download } from '../../services/download'

const state = {
  queue: [],
  cancels: []
}

const mutations = {
  queueItem (state, item) {
    state.queue.push(item)
  },
  updateStatus (state, status) {
    let item = state.queue.find(q => q.postId === status.postId)
    Object.assign(item, status)
  },
  clearFinished (state) {
    state.queue = state.queue.filter((q) => ['FINISHED', 'CANCELED'].indexOf(q.downloadState) === -1)
  },
  cancelDownload (state, item) {
    state.cancels.push(item.postId)
  },
  removeCancel (state, postId) {
    state.cancels = state.cancels.filter(c => c !== postId)
  }
}

const actions = {
  cancelDownload: function ({commit}, item) {
    commit('cancelDownload', item)
  },
  downloadItem ({state}, item) {
    const toDownload = state.queue.find(q => q.postId === item.postId)
    download(toDownload)
  }
}

export default {
  state,
  mutations,
  actions
}
