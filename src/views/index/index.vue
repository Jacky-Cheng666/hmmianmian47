<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <!-- 左边的div盒子 -->
      <div class="logo">
        <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse=!isCollapse"></i>
        <img src="./images/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 右边的部分 -->
      <div class="user">
        <img class="icon" :src="avatar" alt />
        <span class="nickName">{{username}}，您好</span>
        <el-button @click="doLogout" type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧部分 -->
      <!-- width="auto"根据内容的宽度自动调整盒子的宽度 -->
      <el-aside class="my-aside" width="auto">
        <!-- 菜单 -->
        <!-- router属性为true，代表启用路由模式，点击菜单会进行路由跳转。以被点击的表单的Index属性作为路径跳转 -->
        <el-menu default-active="chart" class="el-menu-vertical-demo" :collapse="isCollapse" router>
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <!-- 子路由的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Info, logout } from "@/api/index.js";
import { removeToken } from "@/utils/token.js";
export default {
  data() {
    return {
      avatar: "",
      username: "",
      isCollapse: false
    };
  },
  created() {
    // 调用获取用户信息的接口
    Info().then(res => {
      window.console.log(res);
      // 记得在前面拼接基地址，因为服务器返回的地址不完整。还要拼接/号
      this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
      this.username = res.data.data.username;
    });
  },
  methods: {
    doLogout() {
      this.$confirm("是否退出登录", "友情提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          // 调用退出接口。并返回登录页。
          logout().then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
              // 1，退出成功，要移除token
              removeToken();
              // 2，给出友情提示
              this.$message.success("退出成功");
              // 3，退出成功要跳转到登录页面
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message.info("感谢您还没有退出本系统");
        });
    }
  }
};
</script>


<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .logo {
      height: 100%;
      width: 190px;
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        margin-right: 22px;
      }
      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      span {
        width: 92px;
        height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .user {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      span.nickName {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .my-aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my-main {
    background-color: #0094ff;
  }
}
</style>