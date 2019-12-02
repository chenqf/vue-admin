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
                    <el-input v-model="search.value" placeholder="内容"></el-input>
                </el-form-item>
                <el-form-item style="margin-left:20px">
                    <el-button type="primary" @click="onSearch" round>查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
        >
            <el-table-column prop="name" label="单词" width="180" />
            <el-table-column prop="usPhonetic" label="美音" width="120" />
            <el-table-column prop="ukPhonetic" label="英音" width="120" />

            <el-table-column label="解释" >
                <template slot-scope="scope">
                    <div v-html="getExplains(scope.row)" />
                </template>
            </el-table-column>
            
            <el-table-column label="熟练度" width="150">
                <template slot-scope="scope">
                    <el-rate
                        :max="3"
                        v-model="scope.row.level"
                        show-text
                        @change="changeLevel(scope.row)"
                        :colors="['#F7BA2A', '#F7BA2A', '#F7BA2A']"
                        :texts="['极差', '一般', '掌握']"
                    />
                </template>
            </el-table-column>

            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="onEditWord(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button @click="onDeleteWord(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-pagination
            background
            style="margin-top:20px;"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            :current-page="1"
            :page-size="20"
            :total="1000"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: [
                {
                    level:1,//普通-简单
                    createTime: '2016-05-02',
                    name: 'honorificabilitudinitatibus',
                    usPhonetic:'æpl',
                    ukPhonetic:'æpl',
                    explains: 'n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。'
                }, 
                {
                    level:1, // 稍难
                    createTime: '2016-05-02',
                    name: 'apple',
                    usPhonetic:'æpl',
                    ukPhonetic:'æpl',
                    explains: 'n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。'
                },
                {
                    level:2, // 困难
                    createTime: '2016-05-02',
                    name: 'apple',
                    usPhonetic:'æpl',
                    ukPhonetic:'æpl',
                    explains: 'n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。'
                },
                {
                    level:3, // 稍难
                    createTime: '2016-05-02',
                    name: 'apple',
                    usPhonetic:'æpl',
                    ukPhonetic:'æpl',
                    explains: 'n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。'
                },
                {
                    level:3, // 稍难
                    createTime: '2016-05-02',
                    name: 'apple',
                    usPhonetic:'æpl',
                    ukPhonetic:'æpl',
                    explains: 'n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。'
                },
                {
                    level:3, // 稍难
                    createTime: '2016-05-02',
                    name: 'apple',
                    usPhonetic:'æpl',
                    ukPhonetic:'æpl',
                    explains: 'n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。'
                },
                {
                    level:2, // 稍难
                    createTime: '2016-05-02',
                    name: 'apple',
                    usPhonetic:'æpl',
                    ukPhonetic:'æpl',
                    explains: 'n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。'
                }
            ],
            //查询内容
            search:{
                startTime:'',
                endTime:'',
                value:''
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
        //根据搜索条件，查询笔记列表
        onSearch(){
            console.log(123)
        },
        getExplains(row){
            let explains = row.explains;
            return explains.split('；').join('<br>')
        },
        changeLevel(a,b){
            console.log(a);
        },
        onEditWord(row){
            console.log(row);
        },
        onDeleteWord(row){
            console.log(row);
        },
        handleCurrentChange(num){
            console.log(num)
        }
    },
    components:{
        // NoteItem,
        // NoteDialog
    }
};
</script>

<style lang="scss" scoped>

</style>