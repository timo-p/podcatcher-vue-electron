<template>
  <li>
    <div class="row">
      <div class="col-sm-10">
        <span v-on:click="showDescription=!showDescription">{{post.title}}</span>
        <br/>
        <span class="date">{{date}} ago</span>
      </div>
      <div class="col-sm-2 actions">
        <div>
          <a v-bind:title="file" v-if="fileExists"><font-awesome-icon icon="hdd"/></a>
        </div>
        <div>
          <a v-if="!post.isRead" title="Mark as read"><font-awesome-icon icon="exclamation" v-on:click="toggleIsRead" /></a>
          <a v-if="post.isRead" class="mark-as-unread" title="Mark as unread"><font-awesome-icon icon="exclamation" v-on:click="toggleIsRead" /></a>
        </div>
        <div>
          <a title="Download" class="download" v-on:click="queue"><font-awesome-icon icon="download"/></a>
        </div>
      </div>
    </div>
    <div v-if="showDescription">
      <div v-html="post.description"></div>
    </div>
    <hr/>
  </li>
</template>

<script>
  import fs from 'fs'
  import path from 'path'
  import { parse, distanceInWordsToNow } from 'date-fns'
  import { mapMutations, mapState, mapGetters } from 'vuex'
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
        return distanceInWordsToNow(parse(this.post.pubDate))
      },
      file: function () {
        return path.join(this.downloadDir, sanitize(this.getFeed.title), this.filename)
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
      getFeed: function () {
        return this.feed || this.feedById(this.post.feedId)
      },
      ...mapGetters([
        'feedById'
      ]),
      ...mapState({
        downloadDir: (state) => {
          return state.Settings.downloadDir
        }
      })
    },
    methods: {
      toggleIsRead () {
        this.togglePostAsRead({feedId: this.getFeed.id, postId: this.post.id})
      },
      queue: function () {
        const title = sanitize(this.post.title)
        let file = this.post.filename
        if (title) {
          const extension = path.extname(this.post.filename) || '.mp3'
          file = `${title}${extension}`
        }
        const item = {
          feedId: this.getFeed.id,
          postId: this.post.id,
          url: this.post.url,
          title: this.post.title,
          size: this.post.size,
          dir: path.join(this.downloadDir, sanitize(this.getFeed.title)),
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
  .date {
    font-style: italic;
    font-size: 80%;
  }
  .actions {
    text-align: center;
  }
  .actions div {
    min-height: 24px;
  }
  .download,
  .mark-as-unread {
    display: none;
  }
  li:hover .download,
  li:hover .mark-as-unread {
    display: inline;
  }
</style>
