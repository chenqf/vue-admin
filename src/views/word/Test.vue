<template>
  <div>
    <!-- 检索栏 -->
    <div class="search-container">
      <el-form :inline="true" :model="search" label-width="80px">
        <el-form-item label="单词数">
            <el-select v-model="search.pageCount" placeholder="请选择单词数">
                <el-option label="10" :value="10"></el-option>
                <el-option label="20" :value="20"></el-option>
                <el-option label="30" :value="30"></el-option>
                <el-option label="40" :value="40"></el-option>
                <el-option label="50" :value="50"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="熟练度">
            <el-select v-model="search.level" placeholder="请选择熟练度">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="极差" :value="1"></el-option>
                <el-option label="一般" :value="2"></el-option>
                <el-option label="掌握" :value="3"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item style="margin-left:20px">
          <el-button type="primary" @click="onSearch" round>查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 单词表格 -->
    <WordList
       :data="tableData"
       @edit-item="onEditWord"
       @delete-item="onDeleteWord"
       @change-level="changeLevel"
    />
    
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
import WordList from '../../components/WordList.vue'
import WordDialog from '../../components/WordDialog.vue'
export default {
  data() {
    return {
        dialogVisible:false,
        wordItem:{
        },
        tableData: [
            {
            level: 1, //普通-简单
            createTime: "2016-05-02",
            name: "honorificabilitudinitatibus",
            usPhonetic: "æpl",
            ukPhonetic: "æpl",
            explains:
                "n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。"
            },
            {
            level: 1, // 稍难
            createTime: "2016-05-02",
            name: "apple",
            usPhonetic: "æpl",
            ukPhonetic: "æpl",
            explains:
                "n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。"
            },
            {
            level: 2, // 困难
            createTime: "2016-05-02",
            name: "apple",
            usPhonetic: "æpl",
            ukPhonetic: "æpl",
            explains:
                "n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。"
            },
            {
            level: 3, // 稍难
            createTime: "2016-05-02",
            name: "apple",
            usPhonetic: "æpl",
            ukPhonetic: "æpl",
            explains:
                "n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。"
            },
            {
            level: 3, // 稍难
            createTime: "2016-05-02",
            name: "apple",
            usPhonetic: "æpl",
            ukPhonetic: "æpl",
            explains:
                "n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。"
            },
            {
            level: 3, // 稍难
            createTime: "2016-05-02",
            name: "apple",
            usPhonetic: "æpl",
            ukPhonetic: "æpl",
            explains:
                "n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。"
            },
            {
            level: 2, // 稍难
            createTime: "2016-05-02",
            name: "apple",
            usPhonetic: "æpl",
            ukPhonetic: "æpl",
            explains:
                "n. 苹果，苹果树，苹果似的东西；[美俚]炸弹，手榴弹，（棒球的）球；[美俚]人，家伙。"
            }
        ],
        //查询内容
        search: {
            level:0,
            pageCount:20
        }
    };
  },
  methods: {
    //TODO 根据搜索条件，查询笔记列表
    onSearch() {
      console.log(this.search)
    },
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
  },
  components: {
    WordList,
    WordDialog
  }
};
</script>

<style lang="scss" scoped>
.audio-play {
  cursor: pointer;
}
</style>