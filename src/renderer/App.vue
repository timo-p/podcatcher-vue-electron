<template>
  <div id="app" class="container-fluid">
    <main class="row">
      <feeds></feeds>
      <router-view class="col-6"></router-view>
      <queue></queue>
    </main>
  </div>
</template>

<script>
  import Feeds from './components/Feeds'
  import Queue from './components/Queue'
  import '../../node_modules/bootstrap/dist/css/bootstrap.css'
  import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: 'podcatcher-vue-electron',
    components: { Feeds, Queue }
  }
</script>

<style>
  #app {
    height: 100vh;
    overflow: hidden;
    font-weight: lighter;
  }
  main > div {
    border: 1px solid;
    padding: 10px;
    margin: 10px;
    overflow: scroll;
    height: 95vh;
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
