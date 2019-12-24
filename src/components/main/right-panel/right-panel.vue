<template>
  <div v-dom-portal class="right-panel" :class="drawer?'is-active':''">
    <div class="right-panel-background" @click="changeDrawer"></div>
    <div class="setting-container">
      <span class="setting-btn" @click="changeDrawer">
        <i :class="drawer?'el-icon-close':'el-icon-setting'"></i>
      </span>
      <div class="setting-main">
        <h3 class="drawer-title">系统布局配置</h3>
        <div class="drawer-item">
          <span>固定头部</span>
          <el-switch v-model="fixedHeaderSetting" @change="changeFixedHeader"/>
        </div>
        <div class="drawer-item">
          <span>显示Logo</span>
          <el-switch v-model="showLogoSetting" @change="changeShowLogo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {hasScrollbar,getScrollbarWidth,addClass,removeClass} from '@/libs/util'
export default {
  props:{
    showLogo:{
      type:Boolean,
      default:true
    },
    fixedHeader:{
      type:Boolean,
      default:false
    },
  },
  data() {
    console.log()
    return {
      drawer: false,
      showLogoSetting:this.showLogo,
      fixedHeaderSetting:this.fixedHeader
    };
  },
  watch: {
    drawer(value) {
      if (value) {
        addClass(document.body, 'show-right-panel')
        if(hasScrollbar()){
          document.body.style.width = `calc(100% - ${getScrollbarWidth()}px)`
        }
      } else {
        removeClass(document.body, 'show-right-panel')
        document.body.style.width = '100%'
      }
    }
  },
  methods:{
    changeDrawer(){
      this.drawer = !this.drawer
    },
    changeFixedHeader(value){
      this.$emit('change-fixed-header',value)
    },
    changeShowLogo(value){
      this.$emit('change-show-logo',value)
    }
  }
};
</script>


<style lang="scss">
body.show-right-panel {
  overflow: hidden;
  position: relative;
}
</style>

<style lang="scss" scoped>
.right-panel{
  & > .right-panel-background{
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity .3s cubic-bezier(.7,.3,.1,1);
    background: rgba(0,0,0,.2);
    z-index: -1;
  }
  & > .setting-container{
    width: 100%;
    max-width: $right-panel-width;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.05);
    transition: all .4s cubic-bezier(.7,.3,.1,1);
    transform: translate(100%);
    background: #fff;
    z-index: 40000;
    & > .setting-btn {
      width: 48px;
      height: 48px;
      position: absolute;
      left: -48px;
      text-align: center;
      font-size: 24px;
      border-radius: 6px 0 0 6px!important;
      z-index: 0;
      pointer-events: auto;
      cursor: pointer;
      color: #fff;
      line-height: 48px;
      top:250px;
      background-color: rgb(24, 144, 255);
    }
    & > .setting-main{
      padding: 24px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
      & > .drawer-title{
        margin-bottom: 12px;
        color: rgba(0,0,0,.85);
        font-size: 14px;
        line-height: 22px;
      }
      & > .drawer-item{
        display: flex;
        color: rgba(0,0,0,.65);
        font-size: 14px;
        padding: 12px 0;
        justify-content: space-between;
      }
    }
  }
}

.right-panel.is-active{
  transition: all .3s cubic-bezier(.7,.3,.1,1);
  & > .right-panel-background{
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }
  & > .setting-container{
    transform: translate(0);
  }
}
</style>