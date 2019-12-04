<template>
    <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix">
            <span v-html="title"></span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="onEdit(item)">修改</el-button>
        </div>
        <div v-for="(i,index) in list" :key="index" class="text-item">
            {{i}}
        </div>
    </el-card>
</template>

<script>
import moment from 'moment';
export default {
    props:{
        item:Object
    },
    computed:{
        title(){
            return moment(new Date(this.item.createTime)).format("YYYY-MM-DD")
        },
        list(){
            return JSON.parse(this.item.content)
        }
    },
    methods:{
        onEdit(item){
            this.$emit('edit-item',item)
        }
    }
}
</script>


<style lang="scss" scoped>
    .text-item{
        padding-bottom:5px;
    }
</style>