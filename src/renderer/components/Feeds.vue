<template>
  <div class="col-sm">
    <h1>Feeds</h1>
    <a v-on:click="refreshAll" v-if="feeds.length > 0"><font-awesome-icon icon="sync"/></a>
    <ul>
      <li v-for="feed in feeds">
        <router-link :to="{ name: 'posts', params: { feedId: feed.id }}">{{feed.title}}</router-link>
        <font-awesome-icon v-if="hasUnread(feed)" icon="exclamation" />
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'feeds',
    methods: {
      hasUnread: (feed) => feed.posts.some(p => !p.isRead),
      ...mapActions(['refreshAll'])
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
