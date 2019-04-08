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
  import log from 'electron-log'

  export default {
    name: 'addFeed',
    data: () => ({
      feed: ''
    }),
    methods: {
      add () {
        fetchFeed(this.feed)
          .then(this.addFeed)
          .catch((error) => {
            log.error('Failed to load feed', error)
            this.$toasted.show(`Failed to load ${this.feed}`, {
              duration: 10000
            })
          })
      },
      ...mapMutations(['addFeed'])
    }
  }
</script>
