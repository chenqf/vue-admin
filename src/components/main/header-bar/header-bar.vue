<template>
  <el-header>
    <i
      class="el-icon-s-fold menu-control"
      :class="{'is-collapsed':collapsed}"
      @click="changeCollapsed"
    />
    <full-screen/>
  </el-header>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import FullScreen from './full-screen.vue'
export default {
  props:{
      collapsed:{
          type:Boolean,
          default:false
      }
  },
  methods: {
    ...mapMutations(["changeCollapsed"])
  },
  components:{
      FullScreen
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  height: $header-height !important;
  [class^="el-icon-"] {
    color: $header-icon-color;
    cursor: pointer;
    &:hover {
      color: $header-icon-color-hover;
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
</style>