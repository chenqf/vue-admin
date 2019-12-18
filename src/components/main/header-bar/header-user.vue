<template>
  <el-dropdown>
    <div class="user-area">
      <el-avatar style="margin-right:8px;" size="medium" :src="avatar" @error="errorHandler">
        <img src="@/assets/image/default-avatar.png"/>
      </el-avatar>
      
      <span class="down-arrow"></span>
    </div>
    
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>黄金糕</el-dropdown-item>
      <el-dropdown-item>狮子头</el-dropdown-item>
      <el-dropdown-item>螺蛳粉</el-dropdown-item>
      <el-dropdown-item>双皮奶</el-dropdown-item>
      <el-dropdown-item>蚵仔煎</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>


<script>
  export default{
    props:{
      avatar:{
        type:String,
        default:''
      }
    },
    methods:{
      errorHandler(){
        return true;
      }
    }
  }
</script>

<style lang="scss" scoped>
.user-area{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .down-arrow{
    position: relative;
    top:3px;
    display: inline-block;
    border-top:5px solid $header-icon-color;
    border-left:5px solid transparent;
    border-right:5px solid transparent;
    border-bottom:5px solid transparent;
  }
}

.el-avatar.el-avatar--circle{
  width: 28px;
  height:28px;
  line-height: 28px;
}

</style>