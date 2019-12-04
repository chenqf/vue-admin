<template>
    <div style="padding:100px 200px;">
        <!-- 搜索区 -->
        <div style="margin-bottom:60px;" v-on:keyup.enter="searchWord">
            <el-input placeholder="请输入需要查询的单词" v-model="input" clearable>
                <el-button @click="searchWord" slot="append" icon="el-icon-search" type="primary">查  询</el-button>
            </el-input>
        </div>

        <!-- 结果区 -->
        <div class="flex-container">
            <div style="font-size:40px;font-weight:800;width:100%">
                {{item.name}}
            </div>
            <div class="phonetic" v-show="item.usPhonetic || item.ukPhonetic">
                <span @click="onListenByUK" v-html="'英音：[' + item.ukPhonetic + ']'"></span>
                <span @click="onListenByUS" v-html="'美音：[' + item.usPhonetic + ']'"></span>
            </div>
            <ul class="explains">
                <li v-for="(item,index) in explainsList" :key="index">
                    <span>{{item}}</span>
                </li>  
            </ul>
        </div>
    </div>
    
</template>

<script>
import {playUKWord, playUSWord} from '../../libs/util.js'
import http from '../../libs/http.js'
export default {
    data(){
        return {
            input:'',
            item:{}
        }
    },
    created(){

    },
    computed:{
        explainsList(){
            return this.item.explains ? this.item.explains.split('；') : [];
        }
    },
    methods:{
        searchWord(){
            if(this.input){
                http.post('/word/search',{q:this.input}).then(data=>{
                    this.item = data;
                })
            }
        },
        //美音
        onListenByUS(){
            playUSWord(this.item.name);
        },
        //英音
        onListenByUK(){
            playUKWord(this.item.name);
        }
    }
}
</script>

<style lang="scss" scoped>
.flex-container{
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    & > div{
        width:100%;
        padding:10px;
    }
    & > .phonetic{
        span{
            padding:0 20px;
            cursor: pointer;
        }
    }
    & > .explains li{
        text-align: left;
    }
}
</style>