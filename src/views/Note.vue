<template>
  <div>
    <!-- 检索栏 -->
    <div class="search-container">
        <el-form :inline="true" :model="search" label-width="80px">
            <el-form-item label="起始时间">
                <el-date-picker
                    v-model="search.startTime"
                    align="right"
                    type="date"
                    placeholder="起始时间"
                    :picker-options="pickerOptions">
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-input v-model="search.endTime" placeholder="结束时间"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="search.context" placeholder="内容"></el-input>
            </el-form-item>
            <el-form-item style="margin-left:20px">
                 <el-button type="primary" @click="onSearch" round>查询</el-button>
            </el-form-item>
            <el-form-item>
                 <el-button type="success" @click="onAdd" round>新增</el-button>
            </el-form-item>
        </el-form>
    </div>

    <!-- 日期列表 -->
    <el-card class="box-card" style="margin-bottom:20px;" :key="item.id" v-for="item in list">
        <div slot="header" class="clearfix">
            <span>{{item.createTime}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">修改</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
        </div>
    </el-card>

    <el-dialog :title="form.title" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="活动名称" >
                <el-input v-model="form.id" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCancel">取 消</el-button>
            <el-button type="primary" @click="dialogSubmit = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        let list = [];
        let len = 20;
        while(len--){
            list.push({
                id:Math.random().toString(36).slice(2),
                createTime:new Date().toString(),
                value:Math.random()
            })
        }
        return {
            list,
            dialogFormVisible:false,
            //新增编辑内容
            form:{
                title:'',
                id:'',
                context:''
            },
            //查询内容
            search:{
                startTime:'',
                endTime:'',
                context:''
            },
            //日期快捷配置
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, 
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, 
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            },
        }
    },
    methods:{
        onSearch(){
            console.log(123)
        },
        onAdd(){
            this.dialogFormVisible = true;
        },
    }
};
</script>

<style lang="scss" scoped>
.search-container{
    margin-bottom:20px;
}
</style> 