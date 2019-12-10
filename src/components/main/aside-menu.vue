<template>
  <el-menu 
    :collapse="collapsed" 
    :default-active="name" 
    :unique-opened="true"
    @select="selectMenu"
  >
    <template v-for="(menu,index) in menuList">
      <!-- 父节点 -->
      <el-submenu :index="menu.name" :key="index" v-if="showParent(menu)">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{menu.meta.title}}</span>
        </template>
        <el-menu-item :index="item.name" v-for="(item,i) in menu.children" :key="i">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </el-submenu>

      <!-- 直接节点 -->
      <el-menu-item :index="menu.name" :key="index" v-if="!showParent(menu)" >
        <i class="el-icon-menu"></i>
        <span slot="title">{{menu.meta.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
// import asideMenuItem from './aside-menu-item.vue';
export default {
  name: "asideMenu",
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      default: () => []
    }
  },
  created() {
    window.vm = this;
  },
  data(){
    return {name:''}
  },
  components:{
    // asideMenuItem
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
    },
    selectMenu(index,indexPath){
      console.log(index,indexPath)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>