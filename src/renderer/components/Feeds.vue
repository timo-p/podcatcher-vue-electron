<template>
  <div class="col-sm">
    <AppMenu/>
    <a v-on:click="refreshAll" v-if="sortedFeeds.length > 0"><font-awesome-icon icon="sync"/></a>
    <RefreshQueueCount />
    <a title="Mark all as read" v-if="sortedFeeds.length > 0 && hasUnreadFeeds" v-on:click="markAllFeedsAsRead"><font-awesome-icon icon="check"/></a>
    <ul>
      <li v-for="feed in sortedFeeds">
        <router-link v-bind:class="{ unread: hasUnread(feed) }" :to="{ name: 'feed', params: { feedId: feed.id }}">{{feed.title}}{{unreadPosts(feed)}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  import AppMenu from './AppMenu'
  import RefreshQueueCount from './RefreshQueueCount'

  export default {
    name: 'feeds',
    components: { AppMenu, RefreshQueueCount },
    methods: {
      refreshAll () {
        this.queueFeedRefreshForAllFeeds(this.sortedFeeds)
      },
      unreadPosts (feed) {
        const unread = this.feedPosts(feed.id).filter(p => !p.isRead).length
        return unread > 0 ? ` (${unread})` : ''
      },
      hasUnread (feed) {
        return this.feedPosts(feed.id).some(p => !p.isRead)
      },
      hasUnreadFeeds: () => this.posts.some(p => !p.isRead),
      ...mapMutations(['queueFeedRefreshForAllFeeds']),
      ...mapActions(['markAllFeedsAsRead'])
    },
    computed: {
      ...mapState({
        posts: (state) => state.Feeds.posts
      }),
      ...mapGetters(['sortedFeeds', 'feedPosts'])
    }
  }
</script>

<style scoped>
  a.unread {
    font-weight: bold;
  }
</style>
