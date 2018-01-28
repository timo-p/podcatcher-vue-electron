<template>
  <div>
    <h1>Settings</h1>
    <label>Download directory</label>
    <input disabled type="text" v-bind:value="downloadDir"/>
    <input type="file" v-on:change="updateDownloadDir" webkitdirectory />
    <br/>
    <button v-on:click="save">Save</button>
    <router-link to="/">Cancel</router-link>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'settings',
    methods: {
      updateDownloadDir: function (e) {
        if (e.target.files.length === 1) {
          this.newDownloadDir = e.target.files[0].path
        }
      },
      save: function () {
        this.saveSettings({downloadDir: this.newDownloadDir})
      },
      ...mapMutations(['saveSettings'])
    },
    data: function () {
      return {
        newDownloadDir: ''
      }
    },
    computed: {
      downloadDir: function () {
        return this.newDownloadDir || this.storedDownloadDir
      },
      ...mapState({
        storedDownloadDir: (state) => state.Settings.downloadDir
      })
    }
  }
</script>

<style scoped>
  input.invalid {
    background-color: #ffbcbc;
  }
</style>
