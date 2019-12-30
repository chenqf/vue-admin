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
        :home="homeRoute"
        @change-tag="changeTagEvent"
        @close-one-tag="closeTagEvent"
        @close-all-tag="closeAllTagEvent"
        @close-other-tag="closeOtherTagEvent"
      />
      <!-- 内容区 -->
      <div class="main-container">
        <!-- 启用keep-alive需要保证routers中name与view中的name相同 -->
        <keep-alive :include="cacheList">
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
import {getNewTagList,routeEqual} from '@/libs/tool'
import config from '@/config'; 

export default {
  computed: {
    ...mapState({ 
        homeRoute:state=>state.app.homeRoute,
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
    ]),
    cacheList () {
      const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      console.log(list)
      return list
    },
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
    // if (!this.tagNavList.find(item => item.name === this.$route.name)) {
    //   this.$router.push({
    //     name: config.ROUTER.HOME_NAME
    //   })
    // }
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
    changeTagEvent(route){
      let {
        name,
        params,
        query
      } = route;
      this.$router.push({
        name,
        params,
        query
      })
    },
    //关闭单一tag TODO 考虑beforeClose的问题
    closeTagEvent(route){
      //关闭的是当前打开的
      if(routeEqual(route,this.$route)){
        const index = this.tagNavList.findIndex(item => routeEqual(item, route))
        let nextRoute;
        if(index === this.tagNavList.length - 1){
          nextRoute = this.tagNavList[index - 1]
        }else{
          nextRoute = this.tagNavList[index + 1]
        }
        this.$router.push(nextRoute);
      }
      this.setTagNavList(this.tagNavList.filter(i=>!routeEqual(i,route)))
    },
    //关闭所有tag TODO 考虑beforeClose的问题
    closeAllTagEvent(){
      let res = this.tagNavList.filter(item => item.name === config.ROUTER.HOME_NAME)
      this.setTagNavList(res)
      this.$router.push({name:config.ROUTER.HOME_NAME})
    },
    //关闭其他tag TODO 考虑beforeClose的问题
    closeOtherTagEvent(){
      let res = this.tagNavList.filter(item => routeEqual(item,this.$route) || item.name === config.ROUTER.HOME_NAME)
      this.setTagNavList(res)
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