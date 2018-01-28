<template>
  <div>
    <ul>
      <post :key="post.id" v-bind:post="post" v-bind:feed="feed" v-for="post in feed.posts"/>
      </post>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Post from './Post'

  export default {
    name: 'posts',
    components: { Post },
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
  div {
    flex-grow: 2;
    flex-basis: 60%;
  }
</style>
