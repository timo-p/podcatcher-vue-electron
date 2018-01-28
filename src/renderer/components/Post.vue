<template>
  <li>
    <span v-on:click="showDescription=!showDescription">{{post.title}}</span>
    <font-awesome-icon v-if="!post.isRead" icon="exclamation" />
    <a href="#" v-bind:title="markAsReadTitle" v-on:click="toggleAsRead">{{markAsReadTitle}}</a>
    <a title="Download" v-on:click="queue"><font-awesome-icon icon="download"/></a>
    <a v-bind:title="file" v-if="fileExists"><font-awesome-icon icon="hdd"/></a>
    <div v-if="showDescription">{{post.description}}</div>
  </li>
</template>

<script>
  import fs from 'fs'
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'post',
    components: {
    },
    data: () => {
      return {
        showDescription: false
      }
    },
    props: ['post', 'feed'],
    computed: {
      file: function () {
        return `${this.downloadDir}/${this.feed.title}/${this.post.filename}`
      },
      fileExists: function () {
        return fs.existsSync(this.file)
      },
      markAsReadTitle: function () {
        return this.post.isRead ? 'Mark as unread' : 'Mark as read'
      },
      ...mapState({
        downloadDir: (state) => {
          return state.Settings.downloadDir
        }
      })
    },
    methods: {
      toggleAsRead: function () {
        this.togglePostAsRead({feedId: this.feed.id, postId: this.post.id})
      },
      queue: function () {
        const item = {
          feedId: this.feed.id,
          postId: this.post.id,
          url: this.post.url,
          title: this.post.title,
          size: this.post.size,
          dir: `${this.downloadDir}/${this.feed.title}/`,
          tempDir: `${this.downloadDir}/incomplete_downloads/`,
          file: this.post.filename,
          downloadState: 'QUEUED',
          downloadProgress: 0,
          added: new Date(),
          cancel: null
        }
        this.queueItem(item)
      },
      ...mapMutations(['togglePostAsRead', 'queueItem'])
    }
  }
</script>
