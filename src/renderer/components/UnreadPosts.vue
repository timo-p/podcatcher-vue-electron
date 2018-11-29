<template>
  <div>
    <h1>New posts</h1>
    <a title="Mark all as read" v-if="posts.length > 0 && !showAll" v-on:click="markAllFeedsAsRead"><font-awesome-icon icon="check"/></a>
    <b-button size="sm" variant="outline-primary" :pressed="showAll" v-on:click="toggleShowAll">Show all</b-button>
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
        showPosts: 10,
        showAll: false
      }
    },
    methods: {
      loadMore () {
        this.showPosts += 10
      },
      toggleShowAll () {
        this.showAll = !this.showAll
      },
      ...mapActions(['markAllFeedsAsRead'])
    },
    computed: {
      postCount () {
        return this.showPosts
      },
      posts () {
        const posts = this.showAll ? this.allPosts : this.unreadPosts
        return posts.slice(0, this.postCount)
      },
      ...mapGetters([
        'allPosts',
        'unreadPosts'
      ])
    }
  }
</script>

<style scoped>
</style>
