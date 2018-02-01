<template>
  <div>
    <h1>Feeds</h1>
    <a href="#" v-on:click="refreshAll" v-if="feeds.length > 0">Refresh all</a>
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
  div {
    flex-basis: 20%;
  }
</style>
