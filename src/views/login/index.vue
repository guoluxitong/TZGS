<template>
  <div v-if="wechatlogin">
    <login-dialog
      :backgroundUrl="backgroundUrl"
      :logoUrl="logoUrl"
      :image="image"
      :copyrightInfo1="copyrightInfo1"
      :copyrightInfo2="copyrightInfo2"
      @handleLogin="handleLogin"
      @back="back"
    >
    </login-dialog>
  </div>
</template>
<script>
  import { login, getUserInfo,wechatlogin } from "@/api/login";
  import loginDialog from "./login";

  export default {
    name: "login",
    components: {
      loginDialog
    },
    data() {
      return {
        player:false,
        image: false,
        wechatlogin: true,
        loading: false,
        copyrightInfo1: "",
        copyrightInfo2: "",
        logoUrl: "/static/common/defaultLogo.png",
        backgroundUrl: "/static/common/loginBackground1.jpg",
        unionId:null,
        loginForm: {
          account: null,
          passWord: null
        },
      };
    },
    created() {
      this.unionId = this.getUrlKey('unionid')
      if(this.unionId!=null){
        if(this.unionId == 0){
          window.history.pushState({status: 0} ,'' ,'http://127.0.0.1:8081')
          this.image=true
        } else {
          window.history.pushState({status: 0} ,'' ,'http://127.0.0.1:8081')
          this.wechatlogin=false;
          this.wechatLogin()
        }
      }else{
        this.initCopyrightInfoAndLogoUrl();
      }
    },

    methods: {
      getUrlKey (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
      },
      back(){
        this.image=false;
      },
      wechatLogin(){
        this.loading = true;
        let baseInfo,resources;
        wechatlogin({
          unionId:this.unionId
        })
          .then(response => {
            if(response.data.data!=null){
              this.$root.name=response.data.data.userName
              this.$root.unionId=response.data.data.unionId
              this.$router.push({ path: this.redirect || "/index" })
            }else{
              this.image=true
              this.wechatlogin= true
            }
                })
      },

      handleLogin(loginForm) {
        this.$router.push({ path: this.redirect || "/index" });
      },
      initCopyrightInfoAndLogoUrl() {
        let copyrightInfo1 = window.localStorage["copyrightInfo1"];
        let copyrightInfo2 = window.localStorage["copyrightInfo2"];
        if (copyrightInfo1) {
          this.copyrightInfo1 = window.localStorage["copyrightInfo1"];
        }
        if (copyrightInfo2) {
          this.copyrightInfo2 = window.localStorage["copyrightInfo2"];
        }

        let logoUrl = window.localStorage["logoUrl"];
        let bgUrl = window.localStorage["bgUrl"];
        if (logoUrl) {
          this.logoUrl = window.localStorage["logoUrl"];
        }
        if (bgUrl) {
          this.backgroundUrl = window.localStorage["bgUrl"];
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .login-container {
    width: 350px;
    height: 400px;
    margin: 100px auto auto auto;
    padding: 35px 35px 15px 35px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;}
    .title {
      margin: 20px auto 20px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
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
