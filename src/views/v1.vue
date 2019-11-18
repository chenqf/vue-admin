<template>
  <div class="box">
    <div class="box-left"></div>
    <div class="box-right"></div>
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
    height: 100%;
    margin-left: 200px;
    background: red;
  }
}
</style>
