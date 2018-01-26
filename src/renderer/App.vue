<template>
  <div id="app">
    <router-link to="/settings">Settings</router-link>
    <add-feed></add-feed>
    <main>
      <feeds></feeds>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Feeds from './components/Feeds'
  import AddFeed from './components/AddFeed'

  export default {
    name: 'podcatcher-vue-electron',
    components: { Feeds, AddFeed }
  }
</script>

<style>
  main {
    display: flex;
  }
</style>
