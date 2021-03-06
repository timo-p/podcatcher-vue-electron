import Vue from 'vue'
import { format, isBefore } from 'date-fns'
import log from 'electron-log'

import { fetchFeed, sortPosts } from '../../services/feeds'

const state = {
  feeds: {},
  feedIds: []
}

const feedPostsKey = (feedId) => `posts_${feedId}`

const getters = {
  sortedFeeds: state => state.feedIds.map(id => state.feeds[id]),
  feedPosts: state => feedId => state.feeds[feedId].posts.map(id => state[feedPostsKey(feedId)][id]),
  feedById: state => feedId => state.feeds[feedId],
  allPosts: state => {
    let posts = state.feedIds.reduce((c, feedId) => {
      const feedPosts = Object.values(state[feedPostsKey(feedId)])
      return c.concat(feedPosts)
    }, [])
    sortPosts(posts)
    return posts
  },
  unreadPosts: (state, {allPosts}) => {
    return allPosts.filter(p => !p.isRead)
  }
}

const mutations = {
  addFeed (state, {feed, posts}) {
    if (!state.feedIds.includes(feed.id)) {
      feed.posts = posts.map(p => p.id)
      Vue.set(state.feeds, feed.id, feed)
      const postsMapped = posts.reduce((o, p) => ({...o, [p.id]: p}), {})
      Vue.set(state, feedPostsKey(feed.id), postsMapped)
      const feedIds = Object.values(state.feeds)
        .sort((a, b) => a.title === b.title ? 0 : a.title < b.title ? -1 : 1)
        .map(f => f.id)
      Vue.set(state, 'feedIds', feedIds)
    }
  },
  deleteFeed (state, feedId) {
    Vue.set(state, 'feedIds', state.feedIds.filter(id => id !== feedId))
    delete state[feedPostsKey(feedId)]
    delete state.feeds[feedId]
  },
  togglePostAsRead (state, {feedId, postId}) {
    const post = state[feedPostsKey(feedId)][postId]
    post.isRead = !post.isRead
  },
  markAllAsRead (state, feedId) {
    Object.values(state[feedPostsKey(feedId)])
      .filter(p => !p.isRead)
      .forEach(p => { p.isRead = true })
  },
  markAllFeedsAsRead (state) {
    state.feedIds
      .map(id => Object.values(state[feedPostsKey(id)]))
      .forEach(posts =>
        posts
          .filter(p => !p.isRead)
          .forEach(p => { p.isRead = true })
      )
  },
  updatePosts (state, {feedId, posts}) {
    const currentPostIds = Object.values(state[feedPostsKey(feedId)]).map(p => p.id)
    const newPosts = posts.filter(p => !currentPostIds.includes(p.id))
    if (newPosts.length > 0) {
      const postsMapped = newPosts.reduce((o, p) => ({...o, [p.id]: p}), {})
      Vue.set(state, feedPostsKey(feedId), {...state[feedPostsKey(feedId)], ...postsMapped})
      const postIds = state.feeds[feedId].posts.concat(newPosts.map(p => p.id))
      let feedPosts = postIds.map(id => state[feedPostsKey(feedId)][id])
      sortPosts(feedPosts)
      Vue.set(state.feeds[feedId], 'posts', feedPosts.map(p => p.id))
    }
  },
  removePosts (state, {feedId, postIds}) {
    const newPostsIds = state.feeds[feedId].posts.filter(p => !postIds.includes(p))
    Vue.set(state.feeds[feedId], 'posts', newPostsIds)
    const key = feedPostsKey(feedId)
    postIds.forEach(postId => {
      delete state[key][postId]
    })
  },
  updatePostDownloaded (state, {feedId, postId}) {
    const key = feedPostsKey(feedId)
    Vue.set(state[key][postId], 'downloaded', new Date().toString())
  }
}

const actions = {
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
  },
  markAllAsRead ({ commit }, feedId) {
    commit('markAllAsRead', feedId)
  },
  markAllFeedsAsRead: async ({ state, dispatch }) => {
    let ids = [].concat(state.feedIds)
    while (ids.length > 0) {
      await dispatch('markAllAsRead', ids.pop())
    }
  },
  addFeed ({ commit }, url) {
    return fetchFeed(url)
      .then((feed) => {
        commit('addFeed', feed)
      })
  },
  addBatch: async ({ state, dispatch }, urls) => {
    while (urls.length > 0) {
      const url = urls.shift()
      try {
        await dispatch('addFeed', url)
      } catch (error) {
        log.error('Failed to load feed', error)
        Vue.toasted.show(`Failed to load ${url}`, {
          duration: 10000
        })
      }
    }
  },
  cleanOldPosts ({ state, commit, getters }) {
    const min = getters.getIgnoreOlderThanDateTime
    state.feedIds.forEach(feedId => {
      let postIds = []
      const posts = state[feedPostsKey(feedId)]
      Object.keys(posts).forEach(postId => {
        const post = posts[postId]
        if (isBefore(format(post.pubDate), min)) {
          postIds.push(postId)
        }
      })
      if (postIds.length > 0) {
        commit('removePosts', {feedId, postIds})
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
