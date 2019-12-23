<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'App',
  created(){
    window.vm = this;
  }
}
</script>

<style lang="scss">
html,body{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  margin: 0;
  padding:0;
  height: 100%;
  width:100%;
  overflow-x: hidden;
}
#app {
  height: 100%;
  width:100%;
}
</style>
