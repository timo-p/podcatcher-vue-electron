<template>
  <li>
    <div class="row">
      <div class="col-sm-10">
        <span v-on:click="showDescription=!showDescription">{{post.title}}</span>
        <span>{{date}}</span>
        <a v-bind:title="file" v-if="fileExists"><font-awesome-icon icon="hdd"/></a>
      </div>
      <div class="col-sm-2">
        <a v-if="!post.isRead" title="Mark as read"><font-awesome-icon icon="exclamation" v-on:click="toggleIsRead" /></a>
        <a title="Download" class="download" v-on:click="queue"><font-awesome-icon icon="download"/></a>
      </div>
    </div>
    <div v-if="showDescription">
      <a v-if="post.isRead" title="Mark as unread"><font-awesome-icon icon="exclamation" v-on:click="toggleIsRead" /></a>
      <div v-html="post.description"></div>
    </div>
    <hr/>
  </li>
</template>

<script>
  import fs from 'fs'
  import path from 'path'
  import { DateTime } from 'luxon'
  import { mapMutations, mapState } from 'vuex'
  import sanitize from 'sanitize-filename'

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
      date: function () {
        return DateTime.fromRFC2822(this.post.pubDate).toFormat('yyyy-LL-dd')
      },
      file: function () {
        return path.join(this.downloadDir, sanitize(this.feed.title), this.filename)
      },
      filename: function () {
        const title = sanitize(this.post.title)
        if (title) {
          const extension = path.extname(this.post.filename) || '.mp3'
          return `${title}${extension}`
        } else {
          return this.post.filename
        }
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
      toggleIsRead () {
        this.togglePostAsRead({feedId: this.feed.id, postId: this.post.id})
      },
      queue: function () {
        const title = sanitize(this.post.title)
        let file = this.post.filename
        if (title) {
          const extension = path.extname(this.post.filename) || '.mp3'
          file = `${title}${extension}`
        }
        const item = {
          feedId: this.feed.id,
          postId: this.post.id,
          url: this.post.url,
          title: this.post.title,
          size: this.post.size,
          dir: path.join(this.downloadDir, sanitize(this.feed.title)),
          tempDir: path.join(this.downloadDir, 'incomplete_downloads'),
          file,
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

<style scoped>
  .download {
    display: none;
  }
  li:hover .download {
    display: inline;
  }
</style>
