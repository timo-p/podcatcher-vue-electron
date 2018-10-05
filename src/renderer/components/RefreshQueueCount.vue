<template>
  <div v-on:click="clearQueue">{{size === 0 ? '&nbsp;' : size}}</div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'refreshQueueCount',
    methods: {
      ...mapMutations(['clearQueue'])
    },
    computed: {
      ...mapState({
        size: (state) => {
          return state.RefreshQueue.queue.length
        }
      })
    }
  }
</script>

<style scoped>
  div {
    font-size: 0.5rem;
    display: inline-flex;
    vertical-align: top;
  }
</style>
