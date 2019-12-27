<template>
    <el-scrollbar class="aside-container">
        <el-aside class="left-aside">
            <div class="aside-logo" v-if="showLogo">Logo</div>
            <aside-menu :collapsed="collapsed" :menu-list="menuList" />
        </el-aside>
    </el-scrollbar>
</template>

<script>
import AsideMenu from "./aside-menu.vue";
export default {
    props:{
        menuList:{
            type:Array,
            default:()=>[]
        },
        showLogo:{
            type:Boolean,
            default:true
        },
        collapsed:{
            type:Boolean, 
            default:false
        }
    },
    components:{
        AsideMenu
    }
}
</script>

<style lang="scss" scoped>

.aside-container{
    position: fixed;
    z-index: 2;
}

.el-scrollbar{
    height: 100%;
    background-color: $aside-bg-color;
    /deep/ .el-scrollbar__wrap{
        overflow-x: hidden;
    }
    
}

.el-aside.left-aside {
    background-color: $aside-bg-color;
    color: $aside-color;
    width: auto !important;
    transition: width 0.1s;

    & > .aside-logo {
      height: $header-height;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>