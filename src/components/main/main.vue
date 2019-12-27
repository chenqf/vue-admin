<template>
  <el-container class="root-container" :class="collapsed ? 'aside-min':'aside-max'">
    <!-- 左侧 -->
    <left-aside 
      :collapsed="collapsed" 
      :menu-list="menuList" 
      :show-logo="showLogo"
    />
    <!-- 右侧 -->
    <div class="right-container">
      <!-- 顶部 -->
      <header-bar 
        :collapsed="collapsed" 
        :avatar="avatarImage"
        :fixed-header="fixedHeader"
        :bread-crumb-list="breadCrumbList"
        @update-collapsed="updateCollapsed" 
        @select-operate="selectOperate"
      />
      <tag-nav></tag-nav>
      <!-- 内容区 -->
      <div class="main-container">
        
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
      
      <!-- <footer-bar/> -->


      <!-- 右侧配置 -->
      <right-panel 
        :show-logo="showLogo" 
        :fixed-header="fixedHeader"
        @change-fixed-header="changeFixedHeader"
        @change-show-logo="changeShowLogo"
      />
    </div>
    
    
  </el-container>
</template>

<script>
import {mapGetters,mapState,mapMutations,mapActions } from 'vuex'
import routes from '@/router/routers'
import LeftAside from './left-aside'
import HeaderBar from './header-bar'
import FooterBar from './footer-bar'
import RightPanel from './right-panel'
import TagNav from './tag-nav'
import config from '@/config'; 

export default {
  computed: {
    ...mapState({ 
        collapsed:state=>state.app.collapsed,
        showLogo:state=>state.app.showLogo,
        fixedHeader:state=>state.app.fixedHeader,
        breadCrumbList:state=>state.app.breadCrumbList
    }),
    ...mapGetters([
      'menuList',
      'avatarImage'
    ])
  },
  watch: {
    '$route' (newRoute) {
      this.setBreadCrumb(newRoute)
    }
  },
  mounted () {
    this.setHomeRoute(routes)
    this.setBreadCrumb(this.$route);
  },
  methods: {
    ...mapMutations([
      "changeCollapsed",
      'changeShowLogo',
      'changeFixedHeader',
      'setBreadCrumb',
      'setHomeRoute',
    ]),
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
    TagNav,
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
    min-height: 100%;
    flex:1;
    transition: margin-left 0.3s;
    .main-container{
      padding:20px;
    }
  }

  &.aside-max > .right-container{
    margin-left:$aside-open-width;
  }
  &.aside-min > .right-container{
    margin-left:$aside-min-width;
  }

  
}
</style>