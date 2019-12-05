<template>
    <div>
        <ReviewTab
            :currentName="tabName"
            @change-tab="changeTab"
        >
            <template v-slot:day0>
                <NoteItem  
                    @edit-item="onEdit" 
                    @delete-item="onDelete"
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day0"
                />
            </template>
            <template v-slot:day1>
                <NoteItem  
                    @edit-item="onEdit" 
                    @delete-item="onDelete"
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day1"
                />
            </template>
            <template v-slot:day2>
                <NoteItem  
                    @edit-item="onEdit" 
                    @delete-item="onDelete"
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day2"
                />
            </template>
            <template v-slot:day4>
                <NoteItem  
                    @edit-item="onEdit" 
                    @delete-item="onDelete"
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day4"
                />
            </template>
            <template v-slot:day7>
                <NoteItem  
                    @edit-item="onEdit" 
                    @delete-item="onDelete"
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day4"
                />
            </template>
            <template v-slot:day15>
                <NoteItem  
                    @edit-item="onEdit" 
                    @delete-item="onDelete"
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day15"
                />
            </template>
            <template v-slot:day30>
                <NoteItem  
                    @edit-item="onEdit" 
                    @delete-item="onDelete"
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day30"
                />
            </template>
        </ReviewTab>
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
import ReviewTab from "../../components/ReviewTab.vue";
import NoteItem from "../../components/NoteItem.vue";
import NoteDialog from "../../components/NoteDialog.vue";
import http from "../../libs/http.js";
export default {
    data(){
        return {
            tabName:'day0',
            tabIndex:0,
            day0:[],
            day1:[],
            day2:[],
            day4:[],
            day7:[],
            day15:[],
            day30:[],
            dialog:{
                visible:false,
                id:'',
                content:'',
                time:'',
            },
        }
    },
    created(){
        this.queryData();
    },
    components:{
        ReviewTab,
        NoteItem,
        NoteDialog,
    },
    methods:{
        queryData(){
            let pre = this.tabIndex;
            return http.post('/note/queryAll',{pre,startNum:0,pageCount:100}).then(d=>{
                let {data} = d;
                this['day' + pre] = data;
            })
        },
        changeTab(name){
            this[this.tabName] = [];//先清空本次
            this.tabName = name;
            this.tabIndex = name.replace('day','');
            this.queryData();
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
            http.post('/note/update',{id,content:JSON.stringify(data),createTime}).then(item=>{
                this.queryData();
                this.dialog.visible = false;
            })
        },
    }
};
</script>

<style lang="scss" scoped>

</style> 