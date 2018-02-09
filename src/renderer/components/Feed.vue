<template>
  <div>
    <a title="Mark all as read" v-on:click="markAllAsRead(feedId)"><font-awesome-icon icon="check"/></a>
    <a title="Refresh" v-on:click="queueFeedRefresh(feed)"><font-awesome-icon icon="sync"/></a>
    <a title="Delete feed" v-b-modal.delete-feed><font-awesome-icon icon="trash"/></a>
    <PostList :posts="posts" :feed="feed" :loadMore="loadMore"></PostList>
    <b-modal @ok="deleteThisFeed" id="delete-feed" title="Delete feed" ok-variant="danger" ok-title="Delete">
      Are you sure you want to delete this feed?
    </b-modal>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import PostList from './PostList'

  export default {
    name: 'feed',
    components: { PostList },
    data: function () {
      return {
        showPosts: 10,
        currentFeedId: null
      }
    },
    methods: {
      loadMore: function () {
        this.showPosts += 10
      },
      deleteThisFeed: function () {
        this.deleteFeed(this.feedId)
        this.$router.push('/')
      },
      ...mapMutations(['markAllAsRead', 'deleteFeed', 'queueFeedRefresh'])
    },
    computed: {
      postCount () {
        if (this.currentFeedId !== this.feedId) {
          this.currentFeedId = this.feedId
          this.showPosts = 10
          if (this.$el) {
            this.$el.scrollTop = 0
          }
        }
        return this.showPosts
      },
      feedId () {
        return this.$route.params.feedId
      },
      feed () {
        return this.feedById(this.feedId)
      },
      posts () {
        return this.feedPosts(this.feedId).slice(0, this.postCount)
      },
      ...mapGetters([
        'feedById',
        'feedPosts'
      ])
    }
  }
</script>
