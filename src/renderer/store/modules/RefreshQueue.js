import Vue from 'vue'
import log from 'electron-log'

const state = {
  queue: []
}

const getQueueItem = (feed) => ({
  title: feed.title,
  feedId: feed.id,
  state: 'QUEUED'
})

const mutations = {
  queueFeedRefresh (state, feed) {
    if (!state.queue.some(q => q.feedId === feed.id)) {
      state.queue.push(getQueueItem(feed))
    }
  },
  queueFeedRefreshForAllFeeds (state, feeds) {
    const queueIds = state.queue.map(q => q.feedId)
    feeds
      .filter(feed => !queueIds.includes(feed.id))
      .forEach(feed => state.queue.push(getQueueItem(feed)))
  },
  markAsRefreshing (state, item) {
    state.queue.find(q => q.feedId === item.feedId).state = 'REFRESHING'
  },
  removeFromQueue (state, item) {
    state.queue = state.queue.filter(q => q.feedId !== item.feedId)
  },
  clearQueue (state) {
    state.queue = []
  }
}

const actions = {
  startNewRefresh: ({commit, dispatch}, item) => {
    dispatch('refreshFeed', item.feedId)
      .then(() => {
        commit('removeFromQueue', item)
      })
      .catch((error) => {
        log.error('Failed to load feed', error)
        Vue.toasted.show(`Failed to load ${item.title}`, {
          duration: 10000
        })
        commit('removeFromQueue', item)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
