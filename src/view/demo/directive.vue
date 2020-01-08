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
        <el-button
          slot="append"
          v-clipboard:error="copyError"
          v-clipboard:success="copySuccess"
          v-clipboard:copy="copy_value"
          >copy</el-button
        >
      </el-input>
      <code-format :text="copy_html_text" />
      <code-format :text="copy_js_text" />
    </div>
    <!-- <div class="demo">
      <span class="title">检测尺寸改变（支持防抖和节流）：</span>
      <textarea v-model="resize_value" v-resize:throttle.200="onResize" rows="10" cols="20"/>
      <code-format :text="resize_html_text" />
      <code-format :text="resize_js_text" />
    </div> -->
    <div class="demo">
      <span class="title">数字转为千分位：</span>
      <p v-price>19881006</p>
      <code-format :text="'<p v-price>19881006</p>'" />
    </div>
  </div>
</template>

<script>
import CodeFormat from "_c/dev/code-format.vue";

const copy_js_text = `data(){
    return {
        copy_value:'',
    }
},
methods:{
    copySuccess(){
      this.$notify({
          title: '成功',
          message: '复制成功',
          type: 'success'
      });
    },
    copyError(){
      this.$notify.error({
          title: '错误',
          message: '复制失败'
      });
    }
}`;

const copy_html_text = `
<el-input placeholder="请输入内容" v-model="copy_value">
  <el-button 
    slot="append" 
    v-clipboard:error="copyError" 
    v-clipboard:success="copySuccess" 
    v-clipboard:copy="copy_value" 
  >
    copy
  </el-button>
</el-input>`;

const resize_html_text = `<textarea v-resize:throttle.200="onResize" rows="10" cols="20"/>`;
const resize_js_text = `methods:{
  onResize(el){
    //...
  }
}`;

export default {
  data() {
    return {
      focus_text: '<input type="text" v-focus >',
      copy_value: "",
      copy_html_text,
      copy_js_text,
      resize_html_text,
      resize_js_text,
      resize_value: "拖拽改变宽高"
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
  methods: {
    copySuccess() {
      this.$notify({
        title: "成功",
        message: "复制成功",
        type: "success"
      });
    },
    copyError() {
      this.$notify.error({
        title: "错误",
        message: "复制失败"
      });
    },
    onResize(el) {
      this.resize_value = `宽度：${el.offsetWidth};高度：${el.offsetHeight}`;
    }
  },
  components: {
    CodeFormat
  }
};
</script>

<style lang="scss" scoped>
.demo-container {
  padding: 20px;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
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
