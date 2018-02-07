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

  export default {
    name: 'addBatch',
    data: () => ({
      feeds: ''
    }),
    methods: {
      add () {
        const urls = this.feeds.split('\n').filter(u => u)
        this.addBatch(urls)
      },
      ...mapActions(['addBatch'])
    }
  }
</script>

<style scoped>
  textarea {
    min-height: 200px;
    width: 100%;
  }
</style>
