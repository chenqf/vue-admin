<template>
    <el-breadcrumb separator="/">
        <template v-for="item in list">
            <el-breadcrumb-item :class="item.icon" :key="item.name" :to="{ name: item.name }">{{item.meta.title}}</el-breadcrumb-item>
        </template>  
    </el-breadcrumb>
</template>


<script>
export default {
    props:{
        list:{
            type:Array,
            default:()=>[]
        }
    }
}
</script>

<style lang="scss">
//is-link
.el-breadcrumb__inner {
    margin-left:6px;
    color: #515a6e!important;
}
</style>