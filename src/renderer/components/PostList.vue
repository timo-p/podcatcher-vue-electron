<template>
  <div v-infinite-scroll="load">
    <ul>
      <post :key="post.id" :post="post" :feed="feed" v-for="post in posts"/>
      </post>
    </ul>
  </div>
</template>

<script>
  import Post from './Post'

  export default {
    name: 'postList',
    components: { Post },
    props: ['feed', 'posts', 'loadMore'],
    methods: {
      load () {
        this.loadMore()
      }
    }
  }
</script>
