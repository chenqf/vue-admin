<template>
  <el-container class="root-container">
    <el-scrollbar style="height:100%">
      <!-- 左侧 -->
      <left-aside :collapsed="collapsed" :menu-list="menuList"/>
    </el-scrollbar>
    
    <div class="right-container">
      <header-bar 
        :collapsed="collapsed" 
        :avatar="avatarImage"
        @update-collapsed="updateCollapsed" 
        @select-operate="selectOperate"
      />
      <div class="main-container">
        <router-view />
      </div>
      
      <!-- <footer-bar/> -->
    </div>
  </el-container>
</template>

<script>
import {mapGetters,mapState,mapMutations,mapActions } from 'vuex'
import LeftAside from './left-aside'
import HeaderBar from './header-bar'
import FooterBar from './footer-bar'
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
    // FooterBar,
  }
};
</script>



<style lang="scss">
.root-container {
  background-color:#fff;
  height: 100%;
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .right-container{
    position: relative;
    overflow: auto;
    min-height: 100%;
    flex:1;
    .main-container{
      padding:20px;
    }
  }

  
}
</style>