<template>
  <el-avatar size="medium" :src="avatar" @error="errorHandler">
    <img src="@/assets/image/default-avatar.png"/>
  </el-avatar>
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

</style>