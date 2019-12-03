<template>
    <div>
        <el-table :data="data" border stripe style="width: 100%">
            <el-table-column prop="name" label="单词" width="180" />
            <el-table-column label="英音" width="120">
                <template slot-scope="scope">
                <span class="audio-play" @click="onListenByUK(scope.row)">[{{scope.row.ukPhonetic}}]</span>
                </template>
            </el-table-column>
            <el-table-column label="美音" width="120">
                <template slot-scope="scope">
                <span class="audio-play" @click="onListenByUS(scope.row)">[{{scope.row.usPhonetic}}]</span>
                </template>
            </el-table-column>

            <el-table-column label="解释">
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
                :current-page="1"
                :page-size="20"
                :total="totalNum"
            />
        </template>
    </div>
</template>

<script>
import { playUKWord, playUSWord } from "../util/index.js";
export default {
    props:['data','pagination','totalNum'],
    methods:{
        getExplains(row){
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
.audio-play {
  cursor: pointer;
}
</style>