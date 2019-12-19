<template>
  <div class="demo-container">
    <div class="demo">
      <span class="title">自动获取焦点：</span>
      <el-input v-focus />
      <code-format :text="focus_text" />
    </div>
    <div class="demo">
      <span class="title">复制到剪切板:</span>
      <el-input placeholder="请输入内容" v-model="copy_value">
        <el-button slot="append" v-clipboard="clipOptions">copy</el-button>
      </el-input>
      <code-format :text="copy_html_text" />
      <code-format :text="copy_js_text" />
    </div>
    <textarea rows="3" cols="20"/>
  </div>
</template>


<script>
import CodeFormat from "_c/dev/code-format.vue";

const copy_js_text = `data(){
    return {
        copy_value:'',
    }
},
computed:{
    clipOptions(){
        return {
            value:this.copy_value,
            success:()=>{
                this.$notify({
                    title: '成功',
                    message: '复制成功',
                    type: 'success'
                });
            },
            error: () => {
                this.$notify.error({
                    title: '错误',
                    message: '复制失败'
                });
            }
        }
    }
}`;

const copy_html_text = `<el-input placeholder="请输入内容" v-model="copy_value">
    <el-button slot="append" v-clipboard="clipOptions">copy</el-button>
</el-input>`;

export default {
  data() {
    return {
      focus_text: '<input type="text" v-focus >',
      copy_value: "",
      copy_html_text,
      copy_js_text
    };
  },
  computed: {
    clipOptions() {
      return {
        value: this.copy_value,
        success: () => {
          this.$notify({
            title: "成功",
            message: "复制成功",
            type: "success"
          });
        },
        error: () => {
          this.$notify.error({
            title: "错误",
            message: "复制失败"
          });
        }
      };
    }
  },
  mounted() {
    
  },
  components: {
    CodeFormat
  }
};
</script>


<style lang="scss" scoped>
.demo-container {
  padding: 20px;
  width: 90%;
  flex-direction: column;

  & .demo {
    border: 1px solid #dcdee2;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 30px;
    &:hover {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      border-color: #eee;
    }
    & > .title {
      font-weight: 800;
      display: block;
      font-size: 16px;
      padding-bottom: 10px;
      color: #2869b0;
    }
  }
}
</style>