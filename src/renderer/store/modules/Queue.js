import { download } from '../../services/download'

const state = {
  queue: []
}

const getItem = (state, item) => state.queue.find((q) => q.feedId === item.feedId && q.postId === item.postId)

const mutations = {
  queueItem (state, item) {
    state.queue.push(item)
  },
  downloadItem (state, item) {
    const toDownload = getItem(state, item)
    const cancel = new Promise((resolve) => {
      toDownload.cancel = resolve
    })
    download(toDownload, cancel)
  },
  updateStatus (state, status) {
    let item = getItem(state, status)
    Object.assign(item, status)
  },
  clearFinished (state) {
    state.queue = state.queue.filter((q) => ['FINISHED', 'CANCELED'].indexOf(q.downloadState) === -1)
  }
}

const actions = {
  cancelDownload: function ({state}, cancelItem) {
    let item = getItem(state, cancelItem)
    item.cancel(true)
  }
}

export default {
  state,
  mutations,
  actions
}
