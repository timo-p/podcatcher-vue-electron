<template>
  <div class="col-sm">
    <AppMenu/>
    <a v-on:click="refreshAll" v-if="feeds.length > 0"><font-awesome-icon icon="sync"/></a>
    <RefreshQueueCount/>
    <a title="Mark all as read" v-if="feeds.length > 0 && hasUnreadFeeds" v-on:click="markAllFeedsAsRead"><font-awesome-icon icon="check"/></a>
    <ul>
      <li v-for="feed in feeds">
        <router-link :to="{ name: 'posts', params: { feedId: feed.id }}">{{feed.title}}</router-link>
        <font-awesome-icon v-if="hasUnread(feed)" icon="exclamation" />
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import AppMenu from './AppMenu'
  import RefreshQueueCount from './RefreshQueueCount'

  export default {
    name: 'feeds',
    components: { AppMenu, RefreshQueueCount },
    methods: {
      refreshAll: function () {
        this.queueFeedRefreshForAllFeeds(this.feeds)
      },
      hasUnread: (feed) => feed.posts.some(p => !p.isRead),
      hasUnreadFeeds: () => this.feeds.some(f => f.posts.some(p => !p.isRead)),
      ...mapMutations(['markAllFeedsAsRead', 'queueFeedRefreshForAllFeeds'])
    },
    computed: mapState({
      feeds: (state) => {
        return state.Feeds.feeds
      }
    })
  }
</script>

<style scoped>
</style>
