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
      <tag-nav 
        v-if="openTagNav"
        :value="$route"
        :list="tagNavList"
        @change-tag="changeTagEvent"
        @close-tag="closeTagEvent"
      />
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
        :open-tag-nav="openTagNav"
        @open-tag-nav="changeOpenTagNav"
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
import {getNewTagList} from '@/libs/tool'
import config from '@/config'; 

export default {
  computed: {
    ...mapState({ 
        collapsed:state=>state.app.collapsed,
        tagNavList:state=>state.app.tagNavList,
        openTagNav:state=>state.app.openTagNav,
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
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  mounted () {
    this.setTagNavList()
    this.setHomeRoute(routes)
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    this.setBreadCrumb(this.$route);
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: config.ROUTER.HOME_NAME
      })
    }
  },
  methods: {
    ...mapMutations([
      "changeCollapsed",
      'changeShowLogo',
      'changeOpenTagNav',
      'changeFixedHeader',
      'setBreadCrumb',
      'closeTag',
      'addTag',
      'setTagNavList',
      'setHomeRoute',
    ]),
    ...mapActions([
      'handleLogOut',
    ]),
    changeTagEvent(value){

    },
    closeTagEvent(value){

    },
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