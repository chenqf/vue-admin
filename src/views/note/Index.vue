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
                <el-date-picker
                    v-model="search.endTime"
                    align="right"
                    type="date"
                    placeholder="结束时间"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="内容">
                <el-input v-model="search.value" placeholder="内容"></el-input>
            </el-form-item> -->
            <el-form-item style="margin-left:20px">
                 <el-button type="primary" @click="onSearch" round>查询</el-button>
            </el-form-item>
            <el-form-item>
                 <el-button type="success" @click="onAdd" round>新增</el-button>
            </el-form-item>
        </el-form>
    </div>

    <!-- 日期列表 -->
    <NoteItem  
        @edit-item="onEdit" 
        @delete-item="onDelete"
        :item="item" 
        style="margin-bottom:20px;" 
        :key="item.id" 
        v-for="item in list"
    />
    <el-pagination v-if="search.page > 1 || list.length"
        background
        style="margin-top:20px;"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :current-page="search.page"
        :page-size="search.pageCount"
        :total="totalNum"
    />
    <NoteDialog 
        :visible="dialog.visible"
        :id="dialog.id"
        :content="dialog.content"
        :time="dialog.time"
        @note-dialog-cancel="dialogCancel" 
        @note-dialog-submit="dialogSubmit" 
    />
  </div>
</template>

<script>
import NoteItem from "../../components/NoteItem.vue";
import NoteDialog from "../../components/NoteDialog.vue";
import notes from '../../json/notes.json'
import http from "../../libs/http.js";
export default {
    data(){
        return {
            list:[],
            totalNum:0,
            dialog:{
                visible:false,
                id:'',
                content:'',
                time:'',
            },
            //查询内容
            search:{
                startTime:'',
                endTime:'',
                value:'',
                page:1,
                pageCount:3
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
    created() {
        this.searchData();
    },
    methods:{
        searchData(){
            let params = {
                startNum: (this.search.page - 1) * this.search.pageCount,
                pageCount: this.search.pageCount,
                startTime: this.search.startTime,
                endTime: this.search.endTime,
                // content: this.search.value
            };
            http.post("/note/queryAll", params).then(({ data, count }) => {
                this.list = data;
                this.totalNum = count;
            });
        },
        handleCurrentChange(page){
            this.search.page = page;
            this.searchData();
        },
        //根据搜索条件，查询笔记列表
        onSearch() {
            this.search.page = 1;
            this.searchData();
        },
        //新增笔记
        onAdd(){
            this.dialog.visible = true;
            this.dialog.id = '';
            this.dialog.content = '';
            this.dialog.time = '';
        },
        //编辑笔记
        onEdit(item){
            this.dialog.visible = true;
            this.dialog.id = item.id;
            this.dialog.content = item.content;
            this.dialog.time = item.createTime;
        },
        //删除笔记
        onDelete(item){
            this.$confirm(`确认删除单词该笔记么？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                http.post("/note/delete", { id: item.id }).then(() => {
                    this.searchData();
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                });
            })
            .catch(() => {
                this.$message({
                type: "info",
                message: "已取消删除"
                });
            });
        },
        //取消弹窗
        dialogCancel(){
            this.dialog.visible = false;
        },
        //确定弹窗
        dialogSubmit({list,createTime,id}){
            let data = list.filter(i=>!!i.value).map(i=>i.value);
            if(!data.length){
                return ;
            }
            //编辑
            if(id){
                http.post('/note/update',{id,content:JSON.stringify(data),createTime}).then(item=>{
                    this.searchData();
                    this.dialog.visible = false;
                })
            }
            //新建
            else{
                http.post('/note/create',{content:JSON.stringify(data)}).then(item=>{
                    this.onSearch();
                    this.dialog.visible = false;
                })
            }
        },
    },
    components:{
        NoteItem,
        NoteDialog
    }
};
</script>

<style lang="scss" scoped>
.search-container{
    margin-bottom:20px;
}
</style> 