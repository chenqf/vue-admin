<template>
    <div>
        <!-- 搜索区 -->
        <div style="padding:40px;" v-on:keyup.enter="searchWord">
            <el-input placeholder="请输入需要查询的单词" v-model="input" clearable>
                <el-button   @click="searchWord" slot="append" icon="el-icon-search" type="primary">查  询</el-button>
            </el-input>
        </div>

        <!-- 结果区 -->
        <div>

        </div>
    </div>
    
</template>

<script>
export default {
    data(){
        return {
            input:'',
            item:{
                level:1,//普通-简单
                createTime: '2016-05-02',
                name: 'honorificabilitudinitatibus',
                usPhonetic:'æpl',
                ukPhonetic:'æpl',
                explains: 'n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。'
            }
        }
    },
    methods:{
        searchWord(){
            if(this.input){

            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>