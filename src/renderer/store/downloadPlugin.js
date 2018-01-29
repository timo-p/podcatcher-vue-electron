const downloaderPlugin = store => {
  store.subscribe((mutation, state) => {
    if (state.Queue.queue.length > 0 && !state.Queue.queue.find((q) => q.downloadState === 'DOWNLOADING')) {
      const item = state.Queue.queue.find(q => q.downloadState === 'QUEUED')
      if (item) {
        store.dispatch('downloadItem', item)
      }
    }
  })
}

export default downloaderPlugin
