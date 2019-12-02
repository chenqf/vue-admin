<template>
    <el-dialog 
        :title="id ? '编辑笔记':'新建笔记'" 
        :close-on-click-modal="false" 
        :close-on-press-escape="false" 
        :visible.sync="visible"
        :show-close="false"
    >
        <el-form :model="dynamic" label-width="80px">
            <el-form-item :label="'笔记-' + (index + 1)" :key="index" v-for="(item,index) in dynamic.list">
                <div class="flex">
                    <el-input class="flex1" type="textarea" v-model="item.value"></el-input>
                    <span style="padding-left:10px;">
                        <el-button type="danger" icon="el-icon-delete" @click="onDelLabel(index)" circle></el-button>
                    </span>
                </div>
            </el-form-item>
            
            <el-form-item label="" >
                <el-button type="success" @click="onAddLabel" plain>新增</el-button>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCancel">取 消</el-button>
            <el-button type="primary" @click="dialogSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props:['id','visible','content'],
    computed:{
        
    },
    data(){
        return {
            dynamic:{list:[]}
        }
    },
    watch:{
        content:function(val){
            this.resize(val)
        }
    },
    methods:{
        resize(val){
            this.dynamic.list = this.content ? this.content.split(',').map(i=>({value:i})) : [{value:''}]
        },
        onDelLabel(index){
            this.dynamic.list.splice(index,1)
        },
        onAddLabel(){
            this.dynamic.list.push({value:''})
        },
        //取消弹窗
        dialogCancel(){
            this.$emit('note-dialog-cancel')
            this.resize();
        },
        //确定弹窗
        dialogSubmit(){
            this.$emit('note-dialog-submit',this.dynamic.list,this.id)
        },
    }
}
</script>


<style lang="scss" scoped>

</style>