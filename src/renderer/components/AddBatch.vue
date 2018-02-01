<template>
  <div>
    <h1>Add a batch of feeds</h1>
    <textarea v-model="feeds"></textarea>
    <br/>
    <button v-on:click="add" class="btn btn-primary btn-sm">Add</button>
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
