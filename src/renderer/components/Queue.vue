<template>
  <div class="col-sm">
    <a v-if="queue.length > 0" v-on:click="clearFinished" title="Clear finished"><font-awesome-icon icon="eraser"/></a>
    <a v-if="queue.length > 0" v-on:click="clearQueues" title="Clear queues"><font-awesome-icon icon="ban"/></a>
    <ul>
      <li v-for="item in queue">
        {{item.title}}</br>
        {{item.downloadState}}</br>
        <div class="progress">
          <div v-bind:style="{width: item.downloadProgress + '%'}" class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{item.downloadProgress}}%</div>
        </div>
        {{size(item)}} mb
        {{item.speed}} kt/s<br/>
        <a href="#" title="Cancel" v-on:click="cancel(item)" v-if="item.downloadState === 'DOWNLOADING'">Cancel</a>
        <hr/>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'blank',
    methods: {
      cancel (item) {
        this.cancelDownload(item)
      },
      size (item) {
        return Math.round(item.downloaded / 1048576 * 100) / 100
      },
      ...mapActions(['cancelDownload']),
      ...mapMutations(['clearFinished', 'clearQueues'])
    },
    computed: {
      ...mapState({
        queue: (state) => {
          return state.Queue.queue
        }
      })
    }
  }
</script>

<style scoped>
  ul {
    font-size: 80%;
  }
</style>
