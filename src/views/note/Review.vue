<template>
    <div>
        <ReviewTab>
            <template v-slot:dayAll>
                <NoteItem  
                    @edit-item="onEdit" 
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in dayAll"
                />
            </template>
            <template v-slot:day1>
                <NoteItem  
                    @edit-item="onEdit" 
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day1"
                />
            </template>
            <template v-slot:day2>
                <NoteItem  
                    @edit-item="onEdit" 
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day2"
                />
            </template>
            <template v-slot:day4>
                <NoteItem  
                    @edit-item="onEdit" 
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day4"
                />
            </template>
            <template v-slot:day7>
                <NoteItem  
                    @edit-item="onEdit" 
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day4"
                />
            </template>
            <template v-slot:day15>
                <NoteItem  
                    @edit-item="onEdit" 
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day15"
                />
            </template>
            <template v-slot:day30>
                <NoteItem  
                    @edit-item="onEdit" 
                    :item="item" 
                    style="margin-bottom:20px;" 
                    :key="item.id" 
                    v-for="item in day30"
                />
            </template>
        </ReviewTab>
        <NoteDialog 
            :visible="dialogVisible"
            :id="dialogId"
            :content="dialogContent"
            @note-dialog-cancel="dialogCancel" 
            @note-dialog-submit="dialogSubmit" 
        />
    </div>
</template>

<script>
import ReviewTab from "../../components/ReviewTab.vue";
import NoteItem from "../../components/NoteItem.vue";
import NoteDialog from "../../components/NoteDialog.vue";
export default {
    data(){
        return {
            dayAll:[],
            day1:[],
            day2:[],
            day4:[],
            day7:[],
            day15:[],
            day30:[],
            dialogVisible:false,
            dialogId:'',
            dialogContent:''
        }
    },
    created(){
        setTimeout(()=>{
            let list = [];
            let len = 20;
            while(len--){
                list.push({
                    id:Math.random().toString(36).slice(2),
                    createTime:new Date().toString(),
                    content:Math.random() + ',' + Math.random()
                })
            }
            this.dayAll = JSON.parse(JSON.stringify(list))
            this.day1 = JSON.parse(JSON.stringify(list))
            this.day2 = JSON.parse(JSON.stringify(list))
            this.day4 = JSON.parse(JSON.stringify(list))
            this.day7 = JSON.parse(JSON.stringify(list))
            this.day15 = JSON.parse(JSON.stringify(list))
            this.day30 = JSON.parse(JSON.stringify(list))
        },500);
    },
    components:{
        ReviewTab,
        NoteItem,
        NoteDialog,
    },
    methods:{
        //编辑笔记
        onEdit(item){
            this.dialogVisible = true;
            this.dialogId = item.id;
            this.dialogContent = item.content;
        },
        //取消弹窗
        dialogCancel(){
             this.dialogVisible = false;
        },
        //确定弹窗
        dialogSubmit(list,id){
            this.dialogVisible = false;
        },
    }
};
</script>

<style lang="scss" scoped>

</style> 