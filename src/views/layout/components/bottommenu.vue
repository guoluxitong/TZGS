<template>
  <div style="background-color:#d4d4d4">
    <el-menu
      mode="horizontal"
      :show-timeout="200"
      :default-active="$route.path"
      background-color="#23262E"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <el-menu-item index="100000" class="menuitem">
        <router-link to="index">基座实时信息监控</router-link>
      </el-menu-item>
      <el-menu-item index="100001" class="menuitem">
        <router-link to="device">钢绞线张拉信息监控</router-link>
      </el-menu-item>
      <div style="float: right;color: white">
        <p style="margin-right:10px;margin-top: 10px;margin-bottom: 0px">山东简洁软件有限公司提供技术支持 </p>
        <p style="margin-top: 10px">联系电话:18254809623</p>
      </div>
    </el-menu>

  </div>
</template>

<script>
  import sidebarItem from "./sidebar/sidebarItem";
  import { config } from "@/config/index";

  const baseURL = process.env.NODE_ENV === 'development'
    ? config.development_base_ip + ':' + config.development_base_port
    : config.product_base_ip + ':' + config.product_base_port


  export default {
    components: { sidebarItem },
    data() {
      return {
        title : null,
      };
    },
    created() {
      this.title=this.$root.title
    },
    methods: {
      handleSelect(key, keyPath) {
        if(key==1){
          this.$root.title="基座实时信息监控"
          this.$router.push({path:'/home'})
        }
        if(key==2){
          this.$root.title="钢绞线拉伸实时信息监控"
          this.$router.push({path:'/device'})
        }
      },
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .right-menu {
    font-size: 14px;
    height: 100%;
    line-height: 100%;
  .user-info {
    color: white;
    text-align: right;
    margin: 10px 0px;
  }
  &:focus {
     outline: none;
   }
  .right-menu-item {
    display: inline-block;
    color: #fff;
    margin: 0 8px;
  }
  .screenfull {
    height: 20px;
  }
  .international {
    vertical-align: top;
  }
  .theme-switch {
    vertical-align: 15px;
  }
  .avatar-container {
    height: 50px;
    margin-right: 30px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 10px;
    position: relative;
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .el-icon-caret-bottom {
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
  }
  }
  .el-dropdown {
    display: inline-block;
    position: relative;
    color: white;
    font-size: 14px;
  }
  }
</style>
