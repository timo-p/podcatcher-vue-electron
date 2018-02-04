const state = {
  stagingQueue: [],
  currentlyRefreshing: []
}

const mutations = {
  queueFeedRefresh (state, feedId) {
    if (state.stagingQueue.indexOf(feedId) === -1) {
      state.stagingQueue.push(feedId)
    }
  },
  queueFeedRefreshForAllFeeds (state, feedIds) {
    feedIds
      .filter(feedId => state.stagingQueue.indexOf(feedId) === -1)
      .filter(feedId => state.currentlyRefreshing.indexOf(feedId) === -1)
      .forEach(feedId => state.stagingQueue.push(feedId))
  },
  addToCurrentlyRefreshingList (state, feedId) {
    state.currentlyRefreshing.push(feedId)
    state.stagingQueue = state.stagingQueue.filter(i => i !== feedId)
  },
  removeFromCurrentlyRefreshingList (state, feedId) {
    state.currentlyRefreshing = state.currentlyRefreshing.filter(i => i !== feedId)
  }
}

const actions = {
  startNewRefresh: ({commit, dispatch}, feedId) => {
    dispatch('refreshFeed', feedId)
      .then(() => {
        commit('removeFromCurrentlyRefreshingList', feedId)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
