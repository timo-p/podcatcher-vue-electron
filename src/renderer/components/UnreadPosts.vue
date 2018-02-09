<template>
  <div>
    <h1>New posts</h1>
    <a title="Mark all as read" v-if="posts.length > 0" v-on:click="markAllFeedsAsRead"><font-awesome-icon icon="check"/></a>
    <PostList :posts="posts" :loadMore="loadMore"></PostList>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import PostList from './PostList'

  export default {
    name: 'unread-posts',
    components: { PostList },
    data () {
      return {
        showPosts: 10
      }
    },
    methods: {
      loadMore () {
        this.showPosts += 10
      },
      ...mapActions(['markAllFeedsAsRead'])
    },
    computed: {
      postCount () {
        return this.showPosts
      },
      posts () {
        return this.unreadPosts.slice(0, this.postCount)
      },
      ...mapGetters([
        'unreadPosts'
      ])
    }
  }
</script>

<style scoped>
</style>
