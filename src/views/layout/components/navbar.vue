<template>
  <div style="background-color:#23262E">
    <el-row>
      <el-col :offset="4" style="color: white;font-size: 25px;text-align:center" :span="15">
        <span>{{title}}</span>
      </el-col>
      <el-col :span="5">
        <el-row class="right-menu">
          <el-col :span="19">
            <p class="user-info">
              <span>中铁五局天庄高速TZZB2梁场</span>
            </p>
            <p class="user-info">
              <span v-if="organizationName">登录人：{{organizationName}}</span>
            </p>
          </el-col>
          <el-col :span="5">
            <el-dropdown class="avatar-container right-menu-item" trigger="click">
              <div class="avatar-wrapper">
                <img class="user-avatar" src="static/common/avator.png" />
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

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
      organizationName: this.$root.name,
    };
  },
  watch: {
    $route:{
      handler(val,oldval){
        if(val.path=="/device"){
          this.title="中铁五局集团有限公司天庄高速TZZB2标预制梁场钢绞线张拉实时信息监控"
        }else {
          this.title="中铁五局集团有限公司天庄高速TZZB2标预制梁场基座实时信息监控"
        }
      },
    }
  },
  created() {
    this.title=this.$root.title
},
  methods: {
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
