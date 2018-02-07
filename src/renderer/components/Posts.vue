<template>
  <div>
    <a title="Mark all as read" v-on:click="markAllAsRead(feedId)"><font-awesome-icon icon="check"/></a>
    <a title="Refresh" v-on:click="queueFeedRefresh(feed)"><font-awesome-icon icon="sync"/></a>
    <a title="Delete feed" v-b-modal.delete-feed><font-awesome-icon icon="trash"/></a>

    <b-modal @ok="deleteThisFeed" id="delete-feed" title="Delete feed" ok-variant="danger" ok-title="Delete">
      Are you sure you want to delete this feed?
    </b-modal>
    <ul>
      <post :key="post.id" v-bind:post="post" v-bind:feed="feed" v-for="post in posts"/>
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
      deleteThisFeed: function () {
        this.deleteFeed(this.feedId)
        this.$router.push('/')
      },
      ...mapMutations(['markAllAsRead', 'deleteFeed', 'queueFeedRefresh']),
      ...mapActions(['startNewRefresh'])
    },
    computed: {
      feedId () {
        return this.$route.params.feedId
      },
      feed () {
        return this.feedById(this.feedId)
      },
      posts () {
        return this.feedPosts(this.feedId)
      },
      ...mapGetters([
        'feedById',
        'feedPosts'
      ])
    }
  }
</script>

<style scoped>
</style>
