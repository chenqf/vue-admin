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
       :useBlur="true"
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
import http from "../../libs/http.js";
export default {
  data() {
    return {
        dialogVisible:false,
        wordItem:{
        },
        tableData: [],
        //查询内容
        search: {
            level:0,
            pageCount:20
        }
    };
  },
  created(){
    this.onSearch();
  },
  methods: {
    //根据搜索条件，查询笔记列表
    onSearch() {
      let params = {
        pageCount:this.search.pageCount
      }
      if(this.search.level){
        params.level = this.search.level
      }
      http.post('/word/random',params).then(data=>{
        this.tableData = data.map(i=>{i.open = false; return i});;
      })
    },
    // 编辑框取消
    dialogCancel(){
        this.dialogVisible = false;
    },
    //编辑框确定
    dialogSubmit(item){
      http.post('/word/update',item).then(()=>{
        this.wordItem.name = item.name;
        this.wordItem.createTime = item.createTime;
        this.wordItem.explains = item.explains;
        this.wordItem.level = item.level;
        this.wordItem.phonetic = item.phonetic;
        this.wordItem.ukPhonetic = item.ukPhonetic;
        this.wordItem.usPhonetic = item.usPhonetic;
        this.dialogVisible = false;
      })
    },
    //变更难易度
    changeLevel({ id, level }) {
      http.post("/word/updateLevel", { id, level });
    },
    //编辑
    onEditWord(row) {
      this.dialogVisible = true;
      this.wordItem = row;
    },
    //删除
    onDeleteWord(row) {
      this.$confirm(`确认删除单词 [ ${row.name} ] 么？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        http.post("/word/delete", { id: row.id }).then(() => {
          let item = this.tableData.filter(i=>i.id === row.id)[0];
          this.tableData.splice(this.tableData.indexOf(item),1)
          this.$message({
            type: "success",
            message: "删除成功!"
          });
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