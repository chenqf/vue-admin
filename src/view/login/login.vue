<template>
  <div class="login-container" v-on:keyup.enter="onSubmit">
    <div class="login-form">
      <div class="login-head">
        <span>欢迎登陆</span>
      </div>
      <el-form ref="form" :model="form" class="login-body">
        <el-form-item 
          prop="name"
          :rules="[
            { required: true, message: '用户名不能为空'}
          ]"
        >
          <el-input placeholder="请输入用户名" v-model="form.name">
            <template slot="prepend" style="padding: 0 10px;"><i class="el-icon-user-solid"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item 
          prop="password"
          :rules="[
            { required: true, message: '密码不能为空'}
          ]"
        >
          <el-input placeholder="请输入密码" type="password" v-model="form.password">
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-button type="primary"  style='width:100%;margin-top:10px' @click="onSubmit">登&nbsp;&nbsp;录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  login
} from '@/api/user';
import {
  setToken
} from '@/libs/tool';
const {
  HOME_NAME
} = config.ROUTER;
import config from '@/config';
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
            login(this.form).then((data)=>{
              if(data.id){
                setToken(data.token)
                this.$router.replace({name:HOME_NAME})
              }
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
  width:100%;
  background-image: url(../../assets/login-bg.jpg);
  background-size: cover;
  background-position: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .login-form {
    width: 350px;
    background: #fff;
    position: relative;
    font-size: 14px;
    transition: all .2s ease-in-out;
    top:-20px;
    right:10%;
    border-radius: 4px;
    .login-head{
      border-bottom: 1px solid #e8eaec;
      padding: 14px 16px;
      line-height: 1;
      span{
        line-height: 20px;
        font-size: 16px;
        color: #17233d;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .login-body{
      padding: 20px 20px 30px 20px;
      .el-input-group__prepend{
        padding:0 10px;
      }
    }
    .is-error{
      .el-input-group__prepend{
        padding:0 10px;
        border-color: #F56C6C;
      }
    }
    
  }
}
</style>
