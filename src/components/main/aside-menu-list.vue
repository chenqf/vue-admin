<template>
    <div>
      <template v-for="(menu,index) in menuList">
        <el-submenu :key="index" :index="menu.name" v-if="showParent(menu)">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{menu.meta.title}}</span>
          </template>
          <aside-menu-list :menu-list="menu.children"></aside-menu-list>
        </el-submenu>
        <el-menu-item v-else :key="index" :index="menu.name" >
          <i class="el-icon-menu"></i>
          <span slot="title">{{menu.meta.title}}</span>
        </el-menu-item>
      </template>
      
  </div>
</template>    

 
<script>
export default {
  name: "asideMenuList",
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  methods:{
    showParent(menu){
      let {
        meta = {},
        children = []
      } = menu;

      if(children.length > 1){
        return true;
      }
      if(meta.showAlways){
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>