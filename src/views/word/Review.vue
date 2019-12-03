<template>
    <div>
        <ReviewTab>
            <template v-slot:dayAll>
                
            </template>
            <template v-slot:day1>
                
            </template>
            <template v-slot:day2>
                
            </template>
            <template v-slot:day4>
                
            </template>
            <template v-slot:day7>
                
            </template>
            <template v-slot:day15>
                
            </template>
            <template v-slot:day30>
                
            </template>
        </ReviewTab>
    </div>
</template>

<script>
import ReviewTab from "../../components/ReviewTab.vue";
export default {
    data(){
        return {
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
        ReviewTab
    },
    methods:{
        
    }
};
</script>

<style lang="scss" scoped>

</style> 