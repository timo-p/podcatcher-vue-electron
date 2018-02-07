<template>
  <div>
    <h1>Add feed</h1>
    <input type="text" v-model="feed"/>
    <button v-on:click="add" class="btn btn-primary btn-sm">Add</button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
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
      ...mapMutations(['addFeed'])
    }
  }
</script>
