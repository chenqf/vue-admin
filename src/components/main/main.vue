<template>
  <el-container class="root-container">
    <!-- 左侧 -->
    <left-aside :collapsed="collapsed" :menu-list="menuList" :show-logo="showLogo"/>
    <!-- 右侧 -->
    <div class="right-container">
      <!-- 顶部 -->
      <header-bar 
        :collapsed="collapsed" 
        :avatar="avatarImage"
        :fixed-header="fixedHeader"
        @update-collapsed="updateCollapsed" 
        @select-operate="selectOperate"
      />
      <!-- 内容区 -->
      <div class="main-container">
        <router-view />
      </div>
      
      <!-- <footer-bar/> -->
      <!-- 右侧配置 -->
      <right-panel/>
    </div>
    
    
  </el-container>
</template>

<script>
import {mapGetters,mapState,mapMutations,mapActions } from 'vuex'
import LeftAside from './left-aside'
import HeaderBar from './header-bar'
import FooterBar from './footer-bar'
import RightPanel from './right-panel'
import config from '@/config';
export default {
  computed: {
    ...mapState({ 
        collapsed:state=>state.app.collapsed,
        showLogo:state=>state.app.showLogo,
        fixedHeader:state=>state.app.fixedHeader,
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
    RightPanel,
    // FooterBar,
  }
};
</script>



<style lang="scss">

.root-container {
  background-color:#fff;
  height: 100%;
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