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
import {playUKWord, playUSWord} from '../../util/index.js'
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
                this.item = {
                    level:1,//普通-简单
                    createTime: '2016-05-02',
                    name: 'apple',
                    usPhonetic:'æpl',
                    ukPhonetic:'æpl',
                    explains: 'n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。'
                }
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