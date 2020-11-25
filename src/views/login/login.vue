<template>
  <div class="loginBox" :style="{backgroundImage: 'url(' + backgroundUrl + ')'}">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="login-container"
    >
      <div style="text-align:center;font-size: 20px">中铁五局天庄高速TZZB2梁场</div>
          <div v-if="image">
            <el-row>
              <el-col :offset="2" :span="20">
                <span >请扫描下方小程序码进入小程序绑定微信号再点击下方按钮返回微信登录进行登录</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="5">
                <img  :src="applet" alt="" width="213px" height="213px">
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="7" :span="2">
                <el-button type="primary"  @click="back">返回登录界面</el-button>
              </el-col>
            </el-row>
          </div>
          <div v-if="!image" class="picBox">
            <iframe :src="wechatUrl" target="top"  frameborder="0" scrolling="no" style="height:390px" sandbox="allow-scripts allow-top-navigation allow-same-origin"></iframe>
          </div>
          <!---->
    </el-form>
  </div>
</template>

<script>
  import { login, getUserInfo } from "@/api/login";
  export default {
    name: "login",
    props:{
      backgroundUrl: {
        type: String,
        default: null
      },
      logoUrl: {
        type: String,
        default: null
      },
      copyrightInfo1: {
        type: String,
        default: null
      },
      copyrightInfo2: {
        type: String,
        default: null
      },
      image: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        wechatUrl: '',
        applet:'/static/common/applet2.png',
        loginInfo: null,
        activeName: 'first',
        loading: false,
        loginForm: {
          account: "",
          passWord: "",
          id: '',
        },
        obj:'',
        rules: {
          account: [{ required: true, message: "请输入账号", trigger: "blur" }],
          passWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
        }
      };
    },

    created: function () {
      this.wechatUrl = 'https://apis.sdcsoft.com.cn/wechat/customer/login?url=http://127.0.0.1:8081'
    },
    methods: {
      back(){
        this.$emit("back");
      },
      handleLogin() {
        this.$emit("handleLogin", this.loginForm);
      },
    }
  };
</script>

<style lang="scss" scoped>
  .login-container {
    width: 350px;
    height: 450px;
    margin: 100px auto auto auto;
    padding: 35px 35px 15px 35px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 20px auto 20px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .loginBox {
    position: fixed;
    width: 100%;
    height: 100%;
    /*background-image: url("../../../static/common/loginBackground.jpg");*/
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }
  .copyright {
    margin: 0px auto;
    text-align: center;
    color: #505458;
    font-size: small;
  }
  .picBox {
    text-align: center;
  }
  .pic {
    margin: 15px;
    width: auto;
    height: 100px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
