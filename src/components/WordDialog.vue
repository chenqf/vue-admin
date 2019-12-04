<template>
    <el-dialog 
        title="编辑单词" 
        :close-on-click-modal="false" 
        :close-on-press-escape="false" 
        :visible.sync="visible"
        :show-close="false"
    >
        <el-form :model="wordItem" label-width="100px">
            <el-form-item label="单词">
                <el-input v-model="wordItem.name"></el-input>
            </el-form-item>
            <el-form-item label="国音">
                <el-input v-model="wordItem.ukPhonetic"></el-input>
            </el-form-item>
            <el-form-item label="英音">
                <el-input v-model="wordItem.ukPhonetic"></el-input>
            </el-form-item>
            <el-form-item label="美音">
                <el-input v-model="wordItem.usPhonetic"></el-input>
            </el-form-item>
            <el-form-item label="解释">
                <el-input type="textarea" v-model="wordItem.explains"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker
                    v-model="wordItem.createTime"
                    align="right"
                    type="date"
                    placeholder="创建时间"
                ></el-date-picker>
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
    props:['visible','item'],
    data(){
        return {
            wordItem:{}
        }
    },
    watch:{
        item:function(val){
            this.resize();
        }
    },
    methods:{
        resize(){
            this.wordItem = {
                ...this.item
            }
        },
        //取消弹窗
        dialogCancel(){
            this.$emit('word-dialog-cancel')
            this.resize();
        },
        //确定弹窗
        dialogSubmit(){
            this.$emit('word-dialog-submit',this.wordItem)
        },
    }
}
</script>


<style lang="scss" scoped>

</style>