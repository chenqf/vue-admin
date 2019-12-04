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
          <el-date-picker
            v-model="search.endTime"
            align="right"
            type="date"
            placeholder="结束时间"
            :picker-options="pickerOptions"
          ></el-date-picker>
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
      :currentPage="search.page"
      :page-size="search.pageCount"
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
import WordList from "../../components/WordList.vue";
import WordDialog from "../../components/WordDialog.vue";
import http from "../../libs/http.js";
export default {
  data() {
    return {
      dialogVisible: false,
      wordItem: {},
      totalNum: 0,
      tableData: [],
      //查询内容
      search: {
        startTime: "",
        endTime: "",
        value: "",
        page: 1,
        pageCount: 10
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
  created() {
    this.searchData();
  },
  methods: {
    searchData(){
      let params = {
        startNum: (this.search.page - 1) * this.search.pageCount,
        pageCount: this.search.pageCount,
        startTime: this.search.startTime,
        endTime: this.search.endTime,
        content: this.search.value
      };
      http.post("/word/queryAll", params).then(({ data, count }) => {
        this.tableData = data;
        this.totalNum = count;
      });
    },
    //根据搜索条件，查询笔记列表
    onSearch() {
      this.search.page = 1;
      this.searchData();
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
    //编辑框取消
    dialogCancel() {
      this.dialogVisible = false;
    },
    //编辑框确定
    dialogSubmit(item) {
      http.post('/word/update',item).then(()=>{
        this.searchData();
        this.dialogVisible = false;
      })
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
          this.searchData();
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
    },
    //分页
    handleCurrentChange(num) {
      this.search.page = num;
      this.searchData();
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