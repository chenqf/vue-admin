<template>
  <div>
      <!-- 父节点 -->
      <el-submenu :index="menu.name" v-if="showParent(menu)">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{menu.meta.title}}</span>
        </template>
        <aside-menu-item :menu="item" v-for="(item,i) in menu.children" :key="i"></aside-menu-item>
      </el-submenu>

      <!-- 直接节点 -->
      <el-menu-item :index="menu.name" v-if="!showParent(menu)" >
        <i class="el-icon-menu"></i>
        <span slot="title">{{menu.meta.title}}</span>
      </el-menu-item>
  </div>
      
</div>

<script>
export default {
  name: "asideMenuItem",
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    window.vm = this;
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