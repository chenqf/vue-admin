<template>
  <el-container>
    <!-- 左侧 -->
    <left-aside :collapsed="collapsed" :menu-list="menuList"/>
    <!-- 右侧 -->
    <el-container>
      <!-- 头部 -->
      <HeaderBar :collapsed="collapsed"/>
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
import {mapGetters,mapState} from 'vuex'
import LeftAside from './left-aside'
import HeaderBar from './header-bar'


export default {
  computed: {
    ...mapState({ 
        collapsed:state=>state.app.collapsed
    }),
    ...mapGetters([
      'menuList'
    ])
  },
  methods: {},
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