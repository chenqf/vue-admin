<template>
  <div class="box">
    <div class="box-left"></div>
    <div class="box-right">123</div>
 </div>
</template>

<style lang="scss">
.box{
  height: 200px;
  background: grey;
  .box-left{
    height: 100%;
    width: 200px;
    float: left;
    background: blue;
  }
  .box-right{
    text-align: left;
    height: 100%;
    overflow: hidden;
    background-color: red;
  }
}
</style>
