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
          <el-menu-item index="word">
            <i class="el-icon-menu"></i>
            <span slot="title">单词</span>
          </el-menu-item>
          <el-menu-item index="note">
            <i class="el-icon-setting"></i>
            <span slot="title">笔记</span>
          </el-menu-item>
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

<style scoped lang="scss">
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
</style>
