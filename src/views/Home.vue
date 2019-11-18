<template>
  <div>
    <div class="route-container">
      <router-link to="/">Home</router-link>
      <router-link to="/about1">About1</router-link>
      <router-link to="/about2">About2</router-link>
      <router-link to="/about3">About3</router-link>
      <router-link to="/about4">About4</router-link>
      <router-link to="/v1">v1</router-link>
      <router-link to="/v2">v2</router-link>
      <router-link to="/v3">v3</router-link>
      <router-link to="/v4">v4</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>

<style scoped lang="scss">
.route-container{
  padding:30px;
  border:1px solid grey;
  border-radius: 4px;
  margin:10px auto;
  width: 80%;
  a {
    padding: 5px;
  }
}
</style>
