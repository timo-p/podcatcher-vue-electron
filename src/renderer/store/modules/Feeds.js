import { fetchFeed, sortPosts } from '../../services/feeds'

const state = {
  feeds: {},
  feedIds: [],
  posts: {}
}

const getters = {
  sortedFeeds: state => state.feedIds.map(id => state.feeds[id]),
  feedPosts: state => feedId => state.feeds[feedId].posts.map(id => state.posts[id]),
  feedById: state => feedId => state.feeds[feedId]
}

const mutations = {
  addFeed (state, {feed, posts}) {
    if (!state.feedIds.includes(feed.id)) {
      feed.posts = posts.map(p => p.id)
      state.feeds = {...state.feeds, [feed.id]: feed}
      const postsMapped = posts.reduce((o, p) => ({...o, [p.id]: p}), {})
      state.posts = {...state.posts, ...postsMapped}
      const feedIds = Object.values(state.feeds)
        .sort((a, b) => a.title === b.title ? 0 : a.title < b.title ? -1 : 1)
        .map(f => f.id)
      state.feedIds = feedIds
    }
  },
  deleteFeed (state, feedId) {
    state.feedIds = state.feedIds.filter(id => id !== feedId)
    state.feeds[feedId].posts
      .forEach((id) => delete state.posts[id])
    delete state.feeds[feedId]
  },
  togglePostAsRead (state, postId) {
    state.posts[postId].isRead = !state.posts[postId].isRead
  },
  markAllAsRead (state, feedId) {
    this.getters.feedPosts(feedId)
      .filter(p => !p.isRead)
      .forEach(p => { p.isRead = true })
  },
  markAllFeedsAsRead (state) {
    Object.keys(state.posts)
      .filter(id => !state.posts[id].isRead)
      .forEach(id => { state.posts[id].isRead = true })
  },
  updatePosts (state, {feedId, posts}) {
    const currentPostIds = state.feeds[feedId].posts
    const newPosts = posts.filter(p => !currentPostIds.includes(p.id))
    if (newPosts.length > 0) {
      const postsMapped = newPosts.reduce((o, p) => ({...o, [p.id]: p}), {})
      state.posts = {...state.posts, ...postsMapped}
      const postIds = state.feeds[feedId].posts.concat(newPosts.map(p => p.id))
      let feedPosts = postIds.map(id => state.posts[id])
      sortPosts(feedPosts)
      state.feeds[feedId].posts = feedPosts.map(p => p.id)
    }
  }
}

const actions = {
  addFeed ({ commit }, feed) {
    // do something async
    commit('addFeed', feed)
  },
  refreshFeed ({ state, commit }, feedId) {
    const feed = state.feeds[feedId]
    return fetchFeed(feed.url).then(({posts}) => {
      commit('updatePosts', {feedId, posts})
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
