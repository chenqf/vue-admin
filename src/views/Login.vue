<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item 
          label="用户名"
          prop="name"
          :rules="[
            { required: true, message: '用户名不能为空'}
          ]"
        >
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item 
          label="密码"
          prop="password"
          :rules="[
            { required: true, message: '密码不能为空'}
          ]"
        >
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import http from "../libs/http.js";
export default {
  data(){
    return {
      form:{
        name:'',
        password:''
      }
    }
  },
  methods:{
    onSubmit(){
      this.$refs.form.validate((valid) => {
        if (valid) {
            http.post('/user/login',this.form).then(()=>{
              this.$router.replace({name:'home'})
            }).catch(()=>{
              this.$message.error('用户名或密码错误');
            })
        } else {
          return false;
        }
      })
    }
  }
};
</script>

<style lang="scss">
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    position: relative;
    top:-20px;
    padding: 40px 30px 20px 30px;
    border: 1px solid #999;
    border-radius: 3px;
  }
}
</style>
