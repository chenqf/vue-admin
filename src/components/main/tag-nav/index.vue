<template>
  <div class="tag-nav-wrapper">
    <div class="tags-nav">
      <div class="btn close-con">
        <el-dropdown @command="handleCommand">
          <div class="close-container">
            <i class="el-icon-circle-close"></i>
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="btn prev-con">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="btn next-con">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="scroll-outer">
        <div class="scroll-body">
          <div @click="changeTag" class="tag-item is-active">
            <span class="tag-icon"></span>
            <span class="tag-title">首页</span>
            <i @click.stop="closeTag" class="el-icon-close tag-close"></i>
          </div>
          <div @click="changeTag" class="tag-item">
            <span class="tag-icon"></span>
            <span class="tag-title">新建</span>
            <i @click.stop="closeTag" class="el-icon-close tag-close"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
      list:{
          type:Array,
          default:()=>[]
      },
      value:{
          type:Object,
          default:()=>{}
      }
  },
  methods: {
    closeTag(value) {
      this.$emit("close-tag", value);
    },
    changeTag(value) {
      this.$emit("change-tag", value);
    },
    handleCommand(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-nav-wrapper {
  &,
  & * {
    box-sizing: border-box;
  }
  padding: 0;
  height: $tag-nav-height;
  background: $tag-nav-bg-color;
  & > .tags-nav {
    position: relative;
    height: 100%;
    border-bottom: 1px solid $tag-nav-border-color;
    & > .btn {
      position: absolute;
      top: 0;
      height: 100%;
      background: #fff;
      text-align: center;
      z-index: 1;
      line-height: $tag-nav-height;
      cursor: pointer;
      &:hover,
      &:hover .el-icon-circle-close {
        color: $tag-nav-btn-hover-color;
        background-color: #fff;
        border-color: transparent;
      }
    }
    & > .close-con {
      right: 0;
      width: $tag-nav-close-btn-width;
      & > .close-container {
        height: 100%;
        width: 100%;
      }
    }
    & > .prev-con {
      right: $tag-nav-close-btn-width;
      border-right: 1px solid $tag-nav-border-color;
      width: $tag-nav-prev-btn-width;
    }
    & > .next-con {
      left: 0;
      width: $tag-nav-next-btn-width;
      border-right: 1px solid $tag-nav-border-color;
    }
    & > .scroll-outer {
      position: absolute;
      left: $tag-nav-prev-btn-width;
      right: $tag-nav-close-btn-width + $tag-nav-next-btn-width;
      top: 0;
      bottom: 0;
      box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
      & > .scroll-body {
        height: calc(100% - 1px);
        display: inline-block;
        padding: 1px 4px 0;
        position: absolute;
        overflow: visible;
        white-space: nowrap;
        transition: left 0.3s ease;
        & > .tag-item {
          display: inline-block;
          height: 34px;
          line-height: 34px;
          border: 1px solid #e8eaec !important;
          color: $tag-nav-item-color;
          background: #fff;
          padding: 0 12px;
          margin: 2px 4px 2px 0;
          border-radius: 3px;
          font-size: 12px;
          vertical-align: middle;
          opacity: 1;
          overflow: hidden;
          cursor: pointer;
          &:hover {
            opacity: 0.85;
          }
          & > .tag-icon {
            width: 12px;
            height: 12px;
            display: inline-block;
            margin-right: 8px;
            border-radius: 50%;
            background: $tag-nav-item-icon-bg-color;
            top: 1px;
            position: relative;
          }
          &.is-active > .tag-icon {
            background: $tag-nav-item-icon-active-bg-color;
          }
          & > .tag-title {
          }
          & > .tag-close {
            font-size: 12px;
            margin-left: 12px;
          }
        }
      }
    }
  }
}
</style>