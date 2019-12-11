<template>
  <el-menu
    :collapse="collapsed"
    :default-active="$route.name"
    :unique-opened="true"
    @select="selectMenu"
    class="aside-menu"
  >
    <aside-menu-list :menu-list="menuList"></aside-menu-list>
  </el-menu>
</template>

<script>
import asideMenuList from "./aside-menu-list.vue";
export default {
  name: "asideMenu",
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      default: () => []
    } 
  }, 
  components: {
    asideMenuList
  },
  methods: {
    showParent(menu) {
      let { meta = {}, children = [] } = menu;

      if (children.length > 1) {
        return true;
      }
      if (meta.showAlways) {
        return true;
      }
      return false;
    },
    selectMenu(index, indexPath) {
      this.$router.push({ name: index });
    }
  }
};
</script>

<style lang="scss">
$aside-bg-color: #001529;
$aside-color: rgba(255, 255, 255, 0.7);
$aside-open-width: 260px;

.el-menu.aside-menu,
.el-menu.aside-menu .el-menu--inline {
  background-color: $aside-bg-color;
  border-right: 1px solid $aside-bg-color;
  &:not(.el-menu--collapse) {
    width: $aside-open-width;
    // 子菜单
    & > div > .el-menu-item {
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
    & > div > .el-submenu {
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
    // 单独标签
    & > div > li.el-menu-item {
      & > div > i {
        color: #fff;
      }
      &.is-active,
      &:hover {
        background: $aside-bg-color;
      }
    }
    // 复合标签
    & > div > li.el-submenu > .el-submenu__title {
        &:hover{
          background: $aside-bg-color;
        }
        & > *{
          display: none;
        }

        & > i:first-child{
          color:#fff;
          display: inline;
        }
    }
  }
}
</style>