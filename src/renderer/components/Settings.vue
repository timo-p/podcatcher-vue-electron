<template>
  <div>
    <h1>Settings</h1>
    <b-form>
      <b-form-group label="Download directory">
        <b-form-input disabled v-bind:value="downloadDir" type="text"/>
        <b-form-file v-on:change="updateDownloadDir" directory placeholder="Download dir"></b-form-file>
      </b-form-group>
      <b-form-row>
      <b-form-group label="Ignore posts older than">
        <b-input-group>
        <b-form-input @input="updateIgnoreOlderThan" :value="ignoreOlderThan" type="number" min="1"/>
        <b-form-select @input="updateIgnoreOlderThanUnit" :value="ignoreOlderThanUnit" :options="ignoreOlderThanUnits" />
      </b-input-group>
      </b-form-group>
    </b-form-row>
      <b-form-group>
        <b-button variant="success" v-on:click="save">Save</b-button>
        <router-link to="/">Cancel</router-link>
      </b-form-group>
      <b-form-group>
        <b-button variant="danger" v-b-modal.reset>Reset all data</b-button>
      </b-form-group>
      <b-modal @ok="reset" id="reset" title="Reset all data" ok-variant="danger" ok-title="Reset">
        Are you sure you want to reset all settings and feeds?
      </b-modal>
    </b-form>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'settings',
    methods: {
      updateDownloadDir (e) {
        if (e.target.files.length === 1) {
          this.newDownloadDir = e.target.files[0].path
        }
      },
      updateIgnoreOlderThan (value) {
        this.newIgnoreOlderThan = value
      },
      updateIgnoreOlderThanUnit (value) {
        this.newIgnoreOlderThanUnit = value
      },
      save: function () {
        this.saveSettings({
          downloadDir: this.downloadDir,
          ignoreOlderThan: parseInt(this.ignoreOlderThan, 10),
          ignoreOlderThanUnit: this.ignoreOlderThanUnit
        })
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
        newDownloadDir: '',
        newIgnoreOlderThan: '',
        newIgnoreOlderThanUnit: '',
        ignoreOlderThanUnits: [
          {
            value: 'years',
            text: 'Year'
          },
          {
            value: 'months',
            text: 'Month'
          },
          {
            value: 'weeks',
            text: 'Week'
          },
          {
            value: 'days',
            text: 'Day'
          }
        ]
      }
    },
    computed: {
      downloadDir () {
        return this.newDownloadDir || this.storedDownloadDir
      },
      ignoreOlderThan () {
        return this.newIgnoreOlderThan || this.storedIgnoreOlderThan
      },
      ignoreOlderThanUnit () {
        return this.newIgnoreOlderThanUnit || this.storedIgnoreOlderThanUnit
      },
      ...mapState({
        storedDownloadDir: (state) => state.Settings.downloadDir,
        storedIgnoreOlderThan: (state) => state.Settings.ignoreOlderThan,
        storedIgnoreOlderThanUnit: (state) => state.Settings.ignoreOlderThanUnit
      })
    }
  }
</script>

<style scoped>
  input.invalid {
    background-color: #ffbcbc;
  }
</style>
