<template>
  <div>
    <a v-on:click="clearFinished" title="Clear finished"><font-awesome-icon icon="eraser"/></a>
    <ul>
      <li v-for="item in queue">
        {{item.title}}</br>
        {{item.downloadState}}</br>
        {{item.downloadProgress}} %</br>
        {{item.speed}} kt/s</br>
        {{item.downloaded}} %</br>
        <a href="#" title="Cancel" v-on:click="cancel(item)" v-if="item.downloadState === 'DOWNLOADING'">Cancel</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'blank',
    methods: {
      cancel: function (item) {
        this.cancelDownload(item)
      },
      ...mapActions(['cancelDownload']),
      ...mapMutations(['clearFinished'])
    },
    computed: mapState({
      queue: (state) => {
        return state.Queue.queue
      }
    })
  }
</script>

<style scoped>
  div {
    flex-basis: 20%;
  }
</style>
