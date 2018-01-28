<template>
  <div>
    <input type="text" v-model="feed"/><button v-on:click="add">Add</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { fetchFeed } from '../services/feeds'

  export default {
    name: 'addFeed',
    data: () => ({
      feed: ''
    }),
    methods: {
      add () {
        fetchFeed(this.feed)
          .then(this.addFeed)
      },
      ...mapActions(['addFeed'])
    }
  }
</script>
