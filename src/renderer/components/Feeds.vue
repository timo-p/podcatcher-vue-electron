<template>
  <div>
    <h1>Feeds</h1>
    <ul>
      <li v-for="feed in feeds">
        <router-link :to="{ name: 'posts', params: { feedId: feed.id }}">{{feed.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'feeds',

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
