<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <template v-for="item in list">
      <el-breadcrumb-item
        v-if="canTurn(item)"
        :class="item.icon"
        :key="item.name"
        :to="{ name: item.name }"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
      <el-breadcrumb-item v-else :class="item.icon" :key="item.name">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
import { mapState } from "vuex";
import { canTurnTo } from "@/libs/tool";
import routers from "@/router/routers";
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  ...mapState({
    roles: state => state.user.roles
  }),
  methods: {
    canTurn(item) {
      if (this.$route.name === item.name) {
        return false;
      }
      return canTurnTo(item.name, this.roles, routers);
    }
  }
};
</script>

<style lang="scss">
.el-breadcrumb__inner {
  cursor: default !important;
  margin-left: 10px;
  color: #515a6e !important;
  &.is-link {
    cursor: pointer !important;
  }
}
</style>
