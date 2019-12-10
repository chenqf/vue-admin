<template>
  <el-menu 
    :collapse="collapsed" 
    :default-active="name" 
    :unique-opened="true"
    @select="selectMenu"
  >
    <template v-for="(menu,index) in menuList">
      <aside-menu-item :key="index" :menu="menu"></aside-menu-item>
    </template>
  </el-menu>
</template>

<script>
import asideMenuItem from './aside-menu-item.vue';
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
    asideMenuItem
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