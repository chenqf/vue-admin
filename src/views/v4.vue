<template>
  <div>
    <img :key="i" v-for="i in imgs" :src="i" />
  </div>
</template>

<script>
import imgs from '../json/imgs.json'
export default {
  data (){
    return {
      imgs
    }
  }
}
</script>

<style lang="scss">
.about1{
  column-count: 3;
}
</style>
