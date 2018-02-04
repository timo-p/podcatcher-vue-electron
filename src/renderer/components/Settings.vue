<template>
  <div>
    <h1>Settings</h1>
    <label>Download directory</label>
    <b-form-input disabled v-bind:value="downloadDir" type="text"/>
    <b-form-file v-on:change="updateDownloadDir" directory placeholder="Download dir"></b-form-file>
    <br/>
    <b-button variant="success" v-on:click="save">Save</b-button>
    <router-link to="/">Cancel</router-link>
    <br/><br/>
    <b-button variant="danger" v-b-modal.reset>Reset all data</b-button>
    <b-modal @ok="reset" id="reset" title="Reset all data" ok-variant="danger" ok-title="Reset">
      Are you sure you want to reset all settings and feeds?
    </b-modal>
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
        this.$router.push('/')
      },
      reset: function () {
        window.localStorage.removeItem('vuex')
        window.location.reload()
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
