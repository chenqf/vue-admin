<template>
    <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix">
            <span>{{item.createTime}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="onEdit(item)">修改</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
        </div>
    </el-card>
</template>

<script>
export default {
    props:{
        item:Object
    },
    methods:{
        onEdit(item){
            this.$emit('edit-item',item)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>