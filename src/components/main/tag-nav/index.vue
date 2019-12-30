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
      <div class="btn prev-con" @click="handleScroll(240)">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="btn next-con" @click="handleScroll(-240)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll.prevent="mouseHandlescroll" @mousewheel.prevent="mouseHandlescroll">
        <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
          <div ref="tagsPageOpened" :_name="item.name" @click="changeTag(item)" v-for="item in list" :key="item.name" class="tag-item" :class="item.name === value.name ? 'is-active':''">
            <span class="tag-icon"></span>
            <span class="tag-title">{{item.meta.title}}</span>
            <i v-if="item.name !== home.name" @click.stop="closeOneTag(item)" class="el-icon-close tag-close"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {routeEqual} from '@/libs/tool'
export default {
  data(){
    return {
      tagBodyLeft: 0,
      outerPadding:4
    }
  },
  computed: {
    currentRouteObj () {
      const { name, params, query } = this.value
      return { name, params, query }
    }
  },
  props:{
      list:{
          type:Array,
          default:()=>[]
      },
      value:{
          type:Object,
          default:()=>{}
      },
      home:{
        type:Object,
        default:()=>{}
      }
  },
  '$route' (to) {
    this.getTagElementByRoute(to)
  },
  mounted () {
    setTimeout(() => {
      this.getTagElementByRoute(this.$route)
    }, 200)
  },
  methods: {
    moveToView(tag){
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
      }
    },
    getTagElementByRoute (route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        this.refsTag.forEach((item, index) => {
          if (routeEqual(route, {name:item.getAttribute('_name')})) {
            let tag = this.refsTag[index]
            this.moveToView(tag)
          }
        })
      })
    },
    mouseHandlescroll(e){
      let type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll(offset){
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    closeOneTag(value) {
      this.$emit("close-one-tag", value);
      setTimeout(() => {
        this.getTagElementByRoute(this.currentRouteObj)
      }, 100)
    },
    changeTag(value) {
      this.$emit("change-tag", value);
      setTimeout(() => {
        this.getTagElementByRoute(this.currentRouteObj)
      }, 100)
    },
    handleCommand(value) {
      if(value === 'all'){
        this.$emit("close-all-tag");
      }else{
        this.$emit("close-other-tag");
      }
      setTimeout(() => {
        this.getTagElementByRoute(this.currentRouteObj)
      }, 100)
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
      overflow: hidden;
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
            user-select: none;
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