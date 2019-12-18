<template>
  <el-container>
    <!-- 左侧 -->
    <left-aside :collapsed="collapsed" :menu-list="menuList"/>
    <!-- 右侧 -->
    <el-container> 
      <!-- 头部 -->
      <header-bar 
        :collapsed="collapsed" 
        :avatar="avatarImage"
        @update-collapsed="updateCollapsed" 
        @select-operate="selectOperate"
      />
      <!-- 内容区 -->
      <el-main>
        <router-view />
      </el-main>
      <!-- 底部 -->
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import {mapGetters,mapState,mapMutations} from 'vuex'
import LeftAside from './left-aside'
import HeaderBar from './header-bar'

export default {
  computed: {
    ...mapState({ 
        collapsed:state=>state.app.collapsed
    }),
    ...mapGetters([
      'menuList',
      'avatarImage'
    ])
  },
  methods: {
    ...mapMutations(["changeCollapsed"]),
    updateCollapsed(){
      this.changeCollapsed();
    },
    selectOperate(item){
      console.log(item)
    }
  },
  components: {
    LeftAside,
    HeaderBar,
  }
};
</script>



<style lang="scss">
.el-container {
  background-color:#fff;
  height: 100%;
  
}
</style>