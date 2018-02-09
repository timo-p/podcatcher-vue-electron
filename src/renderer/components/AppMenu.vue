<template>
  <b-dropdown variant="link" size="sm" no-caret class="own-menu">
    <template slot="button-content">
      <font-awesome-icon icon="cog"/>
    </template>
    <b-dropdown-item to="/addfeed">Add feed</b-dropdown-item>
    <b-dropdown-item to="/addbatch">Add a batch of feeds</b-dropdown-item>
    <b-dropdown-item to="/unreadPosts">Unread</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item to="/settings">Settings</b-dropdown-item>
  </b-dropdown>
</template>

<script>
  export default {
    name: 'appMenu'
  }
</script>

<style>
  .own-menu button {
    color: #000;
    padding-left: 0px;
  }
</style>
