<template>
  <div class="col-sm">
    <AppMenu/>
    <a v-on:click="refreshAll" v-if="feeds.length > 0"><font-awesome-icon icon="sync"/></a>
    <a title="Mark all as read" v-if="feeds.length > 0" v-on:click="markAllFeedsAsRead"><font-awesome-icon icon="check"/></a>
    <ul>
      <li v-for="feed in feeds">
        <router-link :to="{ name: 'posts', params: { feedId: feed.id }}">{{feed.title}}</router-link>
        <font-awesome-icon v-if="hasUnread(feed)" icon="exclamation" />
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import AppMenu from './AppMenu'

  export default {
    name: 'feeds',
    components: { AppMenu },
    methods: {
      hasUnread: (feed) => feed.posts.some(p => !p.isRead),
      ...mapActions(['refreshAll']),
      ...mapMutations(['markAllFeedsAsRead'])
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
