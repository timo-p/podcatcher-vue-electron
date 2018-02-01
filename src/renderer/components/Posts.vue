<template>
  <div>
    <a title="Mark all as read" v-on:click="markAllPostsAsRead"><font-awesome-icon icon="check"/></a>
    <a title="Refresh" v-on:click="refreshFeed(feedId)"><font-awesome-icon icon="sync"/></a>
    <ul>
      <post :key="post.id" v-bind:post="post" v-bind:feed="feed" v-for="post in feed.posts"/>
      </post>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import Post from './Post'

  export default {
    name: 'posts',
    components: { Post },
    methods: {
      markAllPostsAsRead: function () {
        this.markAllAsRead({feedId: this.feedId})
      },
      ...mapMutations(['markAllAsRead']),
      ...mapActions(['refreshFeed'])
    },
    computed: {
      feedId () {
        return this.$route.params.feedId
      },
      feed () {
        return this.feedById(this.feedId)
      },
      ...mapGetters([
        'feedById'
      ])
    }
  }
</script>

<style scoped>
</style>
