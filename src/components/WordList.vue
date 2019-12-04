<template>
    <div>
        <!-- 模糊区 -->
        <div class="blur-switch-container" v-if="useBlur">
            <el-switch
                v-model="blur.name"
                active-color="#13ce66"
                active-text="单词模糊"
            />
            <el-switch
                v-model="blur.ukPhonetic"
                active-color="#13ce66"
                active-text="英音模糊"
            />
            <el-switch
                v-model="blur.usPhonetic"
                active-color="#13ce66"
                active-text="美音模糊"
            />
            <el-switch
                v-model="blur.explains"
                active-color="#13ce66"
                active-text="解释模糊"
            />
        </div>
        <el-table :data="data" border stripe style="width: 100%">
            <el-table-column label="单词" width="180" >
                <template slot-scope="scope">
                    <div :class="{blur:useBlur && blur.name}">{{scope.row.name}}</div>
                </template>
            </el-table-column>
            <el-table-column label="英音" width="120">
                <template slot-scope="scope">
                    <div :class="{blur:useBlur && blur.ukPhonetic}">
                        <span class="audio-play" @click="onListenByUK(scope.row)">[{{scope.row.ukPhonetic}}]</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="美音" width="120">
                <template slot-scope="scope">
                    <div :class="{blur:useBlur && blur.usPhonetic}">
                        <span class="audio-play" @click="onListenByUS(scope.row)">[{{scope.row.usPhonetic}}]</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="解释">
                <template slot-scope="scope">
                    <div class="explains-container" :class="getExplainsClass(scope.row)">
                        <template v-if="useBlur && blur.explains">
                            <div 
                                class="limit-line" 
                                v-html="getExplains(scope.row)"
                            />
                        </template>
                        <template v-if="!useBlur || !blur.explains">
                            <!-- 非格式化 -->
                            <div class="limit-line" v-if="!scope.row.open">
                                <span v-html="getExplains(scope.row)"></span>
                            </div>
                            <!-- 格式化 -->
                            <div v-if="scope.row.open">
                                <span v-html="getExplainsFomart(scope.row)"></span>
                            </div>

                            <el-button 
                                type="warning" 
                                :icon="scope.row.open ? 'el-icon-arrow-up':'el-icon-arrow-down'" 
                                circle
                                @click="scope.row.open = !scope.row.open"
                            />
                        </template>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="熟练度" width="150">
                <template slot-scope="scope">
                    <el-rate
                        :max="3"
                        v-model="scope.row.level"
                        show-text
                        @change="changeLevel(scope.row)"
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
        <template v-if="pagination && totalNum">
            <!-- 分页框 -->
            <el-pagination
                background
                style="margin-top:20px;"
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="totalNum"
            />
        </template>
    </div>
</template>

<script>
import { playUKWord, playUSWord } from "../libs/util.js";
export default {
    props:['data','pagination','totalNum','useBlur','currentPage','pageSize'],
    data(){
        window.vm = this;
        return {
            blur:{
                name:false,
                ukPhonetic:true,
                usPhonetic:true,
                explains:true
            }
        }
    },
    computed:{

    },
    methods:{
        getExplainsClass(row){
            let explains = row.explains;
            let line = explains.split("；").length;
            let blur = this.useBlur && this.blur.explains;
            return {
                // 'open-more':line > 2 && !row.open && !blur ,
                // 'close-more':line > 2 && row.open && !blur ,
                blur
            }
        },
        getExplains(row){
            let explains = row.explains;
            return explains
            // return explains.split("；").join("<br>");
        },
        getExplainsFomart(row){
            let explains = row.explains;
            return explains.split("；").join("<br>");
        },
        onEditWord(row){
            this.$emit('edit-item',row)
        },
        onDeleteWord(row){
            this.$emit('delete-item',row)
        },
        changeLevel(row){
            this.$emit('change-level',row)
        },
        handleCurrentChange(page){
            this.$emit('change-page',page)
        },
        //美音
        onListenByUS(row) {
            playUSWord(row.name);
        },
        //英音
        onListenByUK(row) {
            playUKWord(row.name);
        }
    }
}
</script>

<style lang="scss" scoped>
.blur-switch-container{
    padding:20px;
    margin-bottom:20px;
    display: flex;
    justify-content: space-around;
}
.explains-container{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}
.limit-line{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.audio-play {
  cursor: pointer;
}
.blur{
    position: relative;
    z-index: 0;
    filter: blur(2px);
}
</style>