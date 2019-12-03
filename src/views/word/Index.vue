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
            :picker-options="pickerOptions"
          ></el-date-picker>
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

    <!-- 单词表格 -->
    <WordList
       :data="tableData"
       :pagination="true"
       :totalNum="totalNum"
       @edit-item="onEditWord"
       @delete-item="onDeleteWord"
       @change-level="changeLevel"
       @change-page="handleCurrentChange"
    />

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
        totalNum:0,
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
            startTime: "",
            endTime: "",
            value: ""
        },
        //日期快捷配置
        pickerOptions: {
            disabledDate(time) {
            return time.getTime() > Date.now();
            },
            shortcuts: [
            {
                text: "今天",
                onClick(picker) {
                picker.$emit("pick", new Date());
                }
            },
            {
                text: "昨天",
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
                }
            },
            {
                text: "一周前",
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
                }
            }
            ]
        }
    };
  },
  methods: {
    //TODO 根据搜索条件，查询笔记列表
    onSearch() {
      console.log(123);
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
    // TODO 编辑框取消
    dialogCancel(){
        this.dialogVisible = false;
    },
    // TODO 编辑框确定
    dialogSubmit(){
        this.dialogVisible = false;
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
    },
    //TODO 分页
    handleCurrentChange(num) {
      console.log(num);
    }
  },
  components: {
    WordList,
    WordDialog
  }
};
</script>

<style lang="scss" scoped>

</style>