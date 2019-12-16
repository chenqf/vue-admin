<template>
    <div>
      <template v-for="(menu,index) in menuList">
        <!-- 父节点 -->
        <template v-if="isParent(menu)">
          <el-submenu :key="index" :index="menu.name">
            <template slot="title">
              <i v-if="menu.meta && menu.meta.icon" :class="menu.meta.icon"></i>
              <span>{{menu.meta.title}}</span>
            </template>
            <!-- 递归调用 -->
            <aside-menu-list :menu-list="menu.children"></aside-menu-list>
          </el-submenu>
        </template>
        <template v-else-if="isSingleChild(menu)">
          <el-menu-item :key="index" :index="menu.children[0].name" >
            <i v-if="menu.children[0].meta && menu.children[0].meta.icon" :class="menu.children[0].meta.icon"></i>
            <span slot="title">{{menu.children[0].meta.title}}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <el-menu-item :key="index" :index="menu.name" >
            <i v-if="menu.meta && menu.meta.icon" :class="menu.meta.icon"></i>
            <span slot="title">{{menu.meta.title}}</span>
          </el-menu-item>
        </template>
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
    isSingleChild(menu){
      let {
        children = []
      } = menu;
      return !!children.length
    },
    isParent(menu){
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