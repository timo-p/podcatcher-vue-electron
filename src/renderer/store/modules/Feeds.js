import { fetchFeed, sortPosts } from '../../services/feeds'

const state = {
  feeds: []
}

const getters = {
  feedById: state => feedId => state.feeds.find(feed => feed.id === feedId)
}

const mutations = {
  addFeed (state, feed) {
    const feeds = [].concat(state.feeds).concat(feed)
    feeds.sort((a, b) => a.title === b.title ? 0 : a.title < b.title ? -1 : 1)
    state.feeds = feeds
  },
  togglePostAsRead (state, { feedId, postId }) {
    const post = state.feeds
      .find(f => f.id === feedId)
      .posts.find(p => p.id === postId)
    post.isRead = !post.isRead
  },
  markAllAsRead (state, { feedId }) {
    const posts = state.feeds.find(f => f.id === feedId).posts
    posts.forEach(p => {
      p.isRead = true
    })
  },
  updatePosts (state, newFeed) {
    const feed = state.feeds.find(f => f.id === newFeed.id)
    const postIds = feed.posts.map(p => p.id)
    const newPosts = newFeed.posts.filter(p => postIds.indexOf(p.id) === -1)
    if (newPosts.length > 0) {
      let posts = [].concat(feed.posts).concat(newPosts)
      sortPosts(posts)
      feed.posts = posts
    }
  }
}

const actions = {
  addFeed ({ commit }, feed) {
    // do something async
    commit('addFeed', feed)
  },
  refreshFeed ({ state, commit }, feedId) {
    const feed = state.feeds.find(f => f.id === feedId)
    fetchFeed(feed.url).then(updatedFeed => {
      commit('updatePosts', updatedFeed)
    })
  },
  refreshAll ({ state, dispatch }) {
    state.feeds.forEach((feed) => {
      dispatch('refreshFeed', feed.id)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
