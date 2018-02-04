const refreshFeedPlugin = store => {
  store.subscribe((mutation, state) => {
    if (state.RefreshQueue.currentlyRefreshing.length === 0 && state.RefreshQueue.stagingQueue.length > 0) {
      const feedId = state.RefreshQueue.stagingQueue[0]
      store.commit('addToCurrentlyRefreshingList', feedId)
      store.dispatch('startNewRefresh', feedId)
    }
  })
}

export default refreshFeedPlugin
