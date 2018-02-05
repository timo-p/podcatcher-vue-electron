const refreshFeedPlugin = store => {
  store.subscribe((mutation, state) => {
    if (state.RefreshQueue.queue.length > 0 && !state.RefreshQueue.queue.find((q) => q.state === 'REFRESHING')) {
      const item = state.RefreshQueue.queue.find(q => q.state === 'QUEUED')
      if (item) {
        store.commit('markAsRefreshing', item)
        store.dispatch('startNewRefresh', item)
      }
    }
  })
}

export default refreshFeedPlugin
