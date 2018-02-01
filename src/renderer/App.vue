<template>
  <div id="app">
    <router-link to="/settings">Settings</router-link>
    <router-link to="/addbatch">Add batch</router-link>
    <add-feed></add-feed>
    <main>
      <feeds></feeds>
      <router-view></router-view>
      <queue></queue>
    </main>
  </div>
</template>

<script>
  import Feeds from './components/Feeds'
  import AddFeed from './components/AddFeed'
  import Queue from './components/Queue'
  import '../../node_modules/bootstrap/dist/css/bootstrap.css'
  import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: 'podcatcher-vue-electron',
    components: { Feeds, AddFeed, Queue }
  }
</script>

<style>
  main {
    display: flex;
  }
  main > div {
    border: 1px solid;
    padding: 10px;
    margin: 10px;
  }
  a {
    cursor: pointer;
  }
  ul {
    padding: 0px;
  }
  li {
    list-style-type: none;
  }
</style>
