<template>
    <div>
        <ReviewTab 
            :currentName="tabName"
            @change-tab="changeTab"
        >
            <template v-slot:day0>
                <!-- 单词表格 -->
                <WordList
                    :data="day0"
                    @edit-item="onEditWord"
                    @delete-item="onDeleteWord"
                    @change-level="changeLevel"
                />
            </template>
            <template v-slot:day1>
                <!-- 单词表格 -->
                <WordList
                    :data="day1"
                    @edit-item="onEditWord"
                    @delete-item="onDeleteWord"
                    @change-level="changeLevel"
                />
            </template>
            <template v-slot:day2>
                <!-- 单词表格 -->
                <WordList
                    :data="day2"
                    @edit-item="onEditWord"
                    @delete-item="onDeleteWord"
                    @change-level="changeLevel"
                />
            </template>
            <template v-slot:day4>
                <!-- 单词表格 -->
                <WordList
                    :data="day4"
                    @edit-item="onEditWord"
                    @delete-item="onDeleteWord"
                    @change-level="changeLevel"
                />
            </template>
            <template v-slot:day7>
                <!-- 单词表格 -->
                <WordList
                    :data="day7"
                    @edit-item="onEditWord"
                    @delete-item="onDeleteWord"
                    @change-level="changeLevel"
                />
            </template>
            <template v-slot:day15>
                <!-- 单词表格 -->
                <WordList
                    :data="day15"
                    @edit-item="onEditWord"
                    @delete-item="onDeleteWord"
                    @change-level="changeLevel"
                />
            </template>
            <template v-slot:day30>
                <!-- 单词表格 -->
                <WordList
                    :data="day30"
                    @edit-item="onEditWord"
                    @delete-item="onDeleteWord"
                    @change-level="changeLevel"
                />
            </template>
        </ReviewTab>
        <!-- 编辑框 -->
        <WordDialog
            :item="wordItem"
            :visible="dialogVisible"
            @word-dialog-cancel="dialogCancel"
            @word-dialog-submit="dialogSubmit"
        />
    </div>
</template>

<script>
import moment from 'moment';
import ReviewTab from "../../components/ReviewTab.vue";
import WordList from "../../components/WordList.vue";
import WordDialog from "../../components/WordDialog.vue";
import http from "../../libs/http.js";
export default {
    data(){
        return {
            wordItem:{},
            dialogVisible:false,
            tabName:'day0',
            tabIndex:0,
            day0:[],
            day1:[],
            day2:[],
            day4:[],
            day7:[],
            day15:[],
            day30:[]
        }
    },
    created(){
        this.queryData();
    },
    components:{
        ReviewTab,
        WordDialog,
        WordList,
    },
    methods:{
        queryData(){
            let pre = this.tabIndex;
            return http.post('/word/queryAll',{pre,startNum:0,pageCount:100}).then(d=>{
                let {data} = d;
                this['day' + pre] = data.map(i=>{i.open = false; return i});;
            })
        },
        changeTab(name){
            this[this.tabName] = [];//先清空本次
            this.tabName = name;
            this.tabIndex = name.replace('day','');
            this.queryData();
        },
        //编辑框取消
        dialogCancel(){
            this.dialogVisible = false;
        },
        //编辑框确定
        dialogSubmit(item){
            http.post('/word/update',item).then(()=>{
                let resTime = moment(new Date(item.createTime)).format('YYYY-MM-DD')
                let oldTime = moment(new Date(this.wordItem.createTime)).format('YYYY-MM-DD')
                //不同删除
                if(resTime !== oldTime){
                    let currentList = this[this.tabName]
                    let curItem = currentList.filter(i=>i.id === item.id)[0];
                    currentList.splice(currentList.indexOf(curItem),1)
                }else{
                    this.wordItem.name = item.name;
                    this.wordItem.createTime = item.createTime;
                    this.wordItem.explains = item.explains;
                    this.wordItem.level = item.level;
                    this.wordItem.phonetic = item.phonetic;
                    this.wordItem.ukPhonetic = item.ukPhonetic;
                    this.wordItem.usPhonetic = item.usPhonetic;
                }
                this.dialogVisible = false;
            })
        },
        //变更难易度
        changeLevel({ id, level }) {
            http.post("/word/updateLevel", { id, level });
        },
        //编辑
        onEditWord(row) {
            this.dialogVisible = true;
            this.wordItem = row;
        },
        //删除
        onDeleteWord(row) {
            this.$confirm(`确认删除单词 [ ${row.name} ] 么？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                http.post("/word/delete", { id: row.id }).then(() => {
                    let currentList = this[this.tabName]
                    let item = currentList.filter(i=>i.id === row.id)[0];
                    currentList.splice(currentList.indexOf(item),1)
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
        }
    }
};
</script>

<style lang="scss" scoped>

</style> 