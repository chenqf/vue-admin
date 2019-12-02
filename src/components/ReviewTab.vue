<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="总览" name="all">
            <slot name="dayAll"></slot>
        </el-tab-pane>
        <el-tab-pane label="一天前" name="1">
            <slot name="day1"></slot>
        </el-tab-pane>
        <el-tab-pane label="二天前" name="2">
            <slot name="day2"></slot>
        </el-tab-pane>
        <el-tab-pane label="四天前" name="4">
            <slot name="day4"></slot>
        </el-tab-pane>
        <el-tab-pane label="七天前" name="7">
            <slot name="day7"></slot>
        </el-tab-pane>
        <el-tab-pane label="十五天前" name="15">
            <slot name="day15"></slot>
        </el-tab-pane>
        <el-tab-pane label="三十天前" name="30">
            <slot name="day30"></slot>
        </el-tab-pane>
    </el-tabs>
</template>


<script>
export default {
    data() {
      return {
        activeName: 'all'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style lang="scss" scoped>

</style>