<template>
  <el-container>

    <!-- 左侧 -->
    <el-aside class="left-aside">
      <div class="aside-logo">Logo</div>
      <aside-menu :collapsed="collapsed" :menu-list="menuList" />
    </el-aside>

    <!-- 右侧 -->
    <el-container>

      <!-- 头部 -->
      <el-header>
        <i
          class="el-icon-s-fold menu-control"
          :class="{'is-collapsed':collapsed}"
          @click="collapsed = !collapsed"
        />
        <i class="el-icon-full-screen" style="font-size:23px;" />
      </el-header>

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
import asideMenu from "./aside-menu.vue";

export default {
  data() {
    return {
      collapsed: false // 是否最小化左侧菜单
    };
  },

  computed: {
    menuList() {
      return this.$store.getters.menuList;
    }
  },
  methods: {},
  components: {
    asideMenu
  }
};
</script>


<style lang="scss">
$aside-bg-color: #001529;
$aside-color: rgba(255, 255, 255, 0.7);
$aside-open-width: 260px;
$header-height: 64px;
$icon-color: #5c6b77;
$icon-hover-color: #57a3f3;

.el-container {
  height: 100%;
  & > .el-aside.left-aside {
    background-color: $aside-bg-color;
    color: $aside-color;
    width: auto !important;
    transition: width 0.1s;

    & > .aside-logo {
      height: $header-height;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-menu {
      background-color: $aside-bg-color;
      border-right: 1px solid $aside-bg-color;
      &:not(.el-menu--collapse) {
        width: $aside-open-width;
        // 子菜单
        & > .el-menu-item {
          color: $aside-color;
          // 子菜单被选中
          &.is-active {
            background: #2d8cf0 !important;
            color: #fff !important;
            & > i {
              color: #fff;
            }
          }
          // 子菜单鼠标悬浮
          &:hover {
            background-color: $aside-bg-color;
            color: #fff;
            & > i {
              color: #fff;
            }
          }
        }

        // 父菜单
        & > .el-submenu {
          // 父菜单标题
          & > .el-submenu__title {
            color: $aside-color;
            & > i {
              color: $aside-color;
            }
          }
          // 父菜单鼠标悬浮
          & > .el-submenu__title:hover {
            background-color: $aside-bg-color;
            color: #fff;
            & > i {
              color: #fff;
            }
          }
          // 父菜单中有被选中
          &.is-active {
            & > .el-submenu__title {
              background-color: $aside-bg-color;
              color: #fff;
              & > i {
                color: #fff;
              }
            }
          }
        }
      }
      // 最小化
      &.el-menu--collapse {
        & > li > .el-submenu__title > i {
          color: #fff;
        }
        & > li > .el-tooltip > i {
          color: #fff;
        }
      }
    }
  }

  & > .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;
    height: $header-height !important;
    [class^="el-icon-"] {
      color: $icon-color;
      cursor: pointer;
      &:hover {
        color: $icon-hover-color;
      }
    }
    .menu-control {
      font-size: 28px;
      transition: transform 0.2s;
    }
    .is-collapsed {
      transform: rotate(180deg);
    }
  }
}
</style>