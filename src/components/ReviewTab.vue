<template>
    <el-tabs v-model="current" type="card" @tab-click="handleClick">
        <el-tab-pane label="今日" name="day0">
            <slot name="day0"></slot>
        </el-tab-pane>
        <el-tab-pane label="一天前" name="day1">
            <slot name="day1"></slot>
        </el-tab-pane>
        <el-tab-pane label="二天前" name="day2">
            <slot name="day2"></slot>
        </el-tab-pane>
        <el-tab-pane label="四天前" name="day4">
            <slot name="day4"></slot>
        </el-tab-pane>
        <el-tab-pane label="七天前" name="day7">
            <slot name="day7"></slot>
        </el-tab-pane>
        <el-tab-pane label="十五天前" name="day15">
            <slot name="day15"></slot>
        </el-tab-pane>
        <el-tab-pane label="三十天前" name="day30">
            <slot name="day30"></slot>
        </el-tab-pane>
    </el-tabs>
</template>


<script>
export default {
    props:['currentName'],
    data(){
        return {
            current:this.currentName
        }
    },
    methods: {
      handleClick(tab, event) {
        this.$emit('change-tab',tab.name)
      }
    }
}
</script>

<style lang="scss" scoped>

</style>