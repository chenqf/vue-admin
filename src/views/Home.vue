<template>
  <el-container class="page-container">
    <el-header>PROGRESS</el-header>
    <el-container class="main-container">
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border:none"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>单词</span>
            </template>
            <el-menu-item index="/word/review">今日复习</el-menu-item>
            <el-menu-item index="/word/test">随机联系</el-menu-item>
            <el-menu-item index="/word/index">总览</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>笔记</span>
            </template>
            <el-menu-item index="/note/review">今日复习</el-menu-item>
            <el-menu-item index="/note/index">总览</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {}
};
</script>

<style lang="scss">
.page-container{
  height: 100%;
}
.el-header {
  background-color: rgb(84, 92, 100);
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.main-container{
  height: calc(100% - 60px);
}

.el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
}
.flex{
    display: flex;
}
.flex1{
    flex:1;
}
</style>
