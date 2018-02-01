<template>
  <div>
    <textarea v-model="feeds"></textarea><button v-on:click="add">Add</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { fetchFeed } from '../services/feeds'

  export default {
    name: 'addBatch',
    data: () => ({
      feeds: ''
    }),
    methods: {
      add () {
        this.feeds.split('\n').forEach((feed) => {
          fetchFeed(feed)
            .then(this.addFeed)
        })
      },
      ...mapActions(['addFeed'])
    }
  }
</script>
