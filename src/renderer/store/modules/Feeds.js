const state = {
  feeds: []
}

const getters = {
  feedById: (state) => (feedId) =>
    state.feeds.find((feed) => feed.id === feedId)
}

const mutations = {
  addFeed (state, feed) {
    state.feeds.push(feed)
  },
  togglePostAsRead (state, {feedId, postId}) {
    const post = state.feeds
      .find((f) => f.id === feedId)
      .posts.find((p) => p.id === postId)
    post.isRead = !post.isRead
  }
}

const actions = {
  addFeed ({ commit }, feed) {
    // do something async
    commit('addFeed', feed)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
