<template>
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
          <router-link to="device">钢绞线拉伸信息监控</router-link>
        </el-menu-item>
    </el-menu>


</template>

<script>
import { config } from "@/config/index";
import { mapGetters } from "vuex";
export default {
  name: "SidebarItem",
  computed: {
    ...mapGetters(["menus"])
  },
  data() {
    return {
      helpDocumentHref: config.helpDocumentHref
    };
  },
  methods: {
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.menuitem{
  a{
    color:#fff;
    text-decoration:none
  }
}
.el-submenu__title{
  i{
    color:#fff
  }
}

</style>

