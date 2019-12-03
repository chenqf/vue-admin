<template>
    <div>
        <ReviewTab>
            <template v-slot:dayAll>
                <!-- 单词表格 -->
                <WordList
                    :data="dayAll"
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
import ReviewTab from "../../components/ReviewTab.vue";
import WordList from "../../components/WordList.vue";
import WordDialog from "../../components/WordDialog.vue";
import words from '../../json/words.json'
export default {
    data(){
        return {
            wordItem:{},
            dialogVisible:false,
            dayAll:[],
            day1:[],
            day2:[],
            day4:[],
            day7:[],
            day15:[],
            day30:[]
        }
    },
    created(){
        setTimeout(()=>{
            this.dayAll = JSON.parse(JSON.stringify(words))
            this.day1 = JSON.parse(JSON.stringify(words))
            this.day2 = JSON.parse(JSON.stringify(words))
            this.day4 = JSON.parse(JSON.stringify(words))
            this.day7 = JSON.parse(JSON.stringify(words))
            this.day15 = JSON.parse(JSON.stringify(words))
            this.day30 = JSON.parse(JSON.stringify(words))
        },500);
    },
    components:{
        ReviewTab,
        WordDialog,
        WordList,
    },
    methods:{
        // TODO 编辑框取消
        dialogCancel(){
            this.dialogVisible = false;
        },
        // TODO 编辑框确定
        dialogSubmit(){
            this.dialogVisible = false;
        },
        //TODO 变更难易度
        changeLevel(a, b) {
            console.log(a);
        },
        //TODO 编辑
        onEditWord(row) {
            this.dialogVisible = true;
            this.wordItem = row;
        },
        //TODO 删除
        onDeleteWord(row) {
            this.$confirm(`确认删除单词 [ ${row.name} ] 么？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                this.$message({
                    type: "success",
                    message: "删除成功!"
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