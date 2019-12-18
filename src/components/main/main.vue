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
import {mapGetters,mapState,mapMutations,mapActions } from 'vuex'
import LeftAside from './left-aside'
import HeaderBar from './header-bar'
import config from '@/config';
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
    ...mapActions([
      'handleLogOut',
    ]),
    updateCollapsed(){
      this.changeCollapsed();
    },
    selectOperate(item){
      if(item === 'logout'){
        this.handleLogOut().then(()=>{
          this.$router.replace({name:config.ROUTER.LOGIN_NAME})
        })
      }else if(item === 'updatePwd'){
        
      }
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