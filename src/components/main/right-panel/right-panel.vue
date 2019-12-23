<template>
  <div class="right-panel" :class="drawer?'is-active':''">
    <div v-dom-portal class="right-panel-background" :class="drawer?'is-active':''"></div>
    <div class="setting-container">
      <el-button
        class="setting-btn"
        type="primary"
        :class="drawer?'el-icon-close':'el-icon-setting'"
        @click="drawer = !drawer"
      />
      <div class="setting-main">123</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      mask: true
    };
  }
};
</script>

<style lang="scss" scoped>

.right-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: transparent;
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  z-index:40000;
  
  .setting-container {
    position: relative;
    width: 250px;
    height: 100%;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
    background: #fff;

    .setting-btn {
      font-size: 20px;
      padding: 12px;
      box-sizing: border-box;
      width: 45px;
      height: 45px;
      position: absolute;
      top: 250px;
      left:-45px;
    }
  }
  &.is-active {
    transform: translate(0);
    z-index: 40000;
  }
}




.right-panel-background{
    position: fixed;
    z-index: -1;
    opacity: 0;
    left:0;
    bottom:0;
    top: 0;
    right: 0;
    transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    background: rgba(0, 0, 0, 0.2);
    &.is-active{
        opacity: 1;
        z-index: 20000;
    }
}
</style>