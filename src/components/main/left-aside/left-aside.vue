<template>
    <el-aside class="left-aside">
      <div class="aside-logo">Logo</div>
      <aside-menu :collapsed="collapsed" :menu-list="menuList" />
    </el-aside>
</template>

<script>
import AsideMenu from "./aside-menu.vue";
export default {
    props:{
        menuList:{
            type:Array,
            default:()=>[]
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