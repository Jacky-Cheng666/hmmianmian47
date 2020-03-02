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
        <img class="icon" :src="$store.state.avatar" alt />
        <span class="nickName">{{$store.state.username}}，您好</span>
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
          <!-- 我们这里需要根据登录的用户的角色来判断显示哪些菜单。 -->
          <template v-for="(item, index) in childrenRoutes">
            <el-menu-item
              :key="index"
              :index="'/index/'+item.path"
              v-if="item.meta.roles.includes($store.state.role)"
            >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>
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
import { logout } from "@/api/index.js";
import { removeToken } from "@/utils/token.js";
// 导入子路由的规则
import childrenRoutes from "@/router/childrenRoutes";
export default {
  data() {
    return {
      // 把路由的规则数组传到data
      childrenRoutes,
      avatar: "",
      username: "",
      isCollapse: false
    };
  },
  beforeCreate() {
    // 判断用户是否登录，如果得到null，说明未登录。before是最早的生命周期
    // if (getToken() == null) {
    //   this.$message.error("请先登录");
    //   this.$router.push("/login");
    // }
  },
  created() {
    // 调用获取用户信息的接口
    // 带入token给服务器发送请求
    // 现象：就算伪造token，也是能够先进入首页，然后发现token错误，才打回到登录页。
    //原因： ajax请求是异步请求,异步的请求要等同步任务(页面渲染)执行完毕后才执行。
    //因为导航守卫里面已经请求过一次info了，这里再请求一次会多于。
    // Info().then(res => {
    //   window.console.log(res);
    //   if (res.data.code == 200) {
    //     // 记得在前面拼接基地址，因为服务器返回的地址不完整。还要拼接/号
    //     this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    //     this.username = res.data.data.username;
    //   }
    // });
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
            // 1，退出成功，要移除token
            removeToken();
            // 清空vuex数据，给getInfo传入一个空字符串，就代表把username和avatar值赋为空
            this.$store.commit("getInfo", "");
            // 2，给出友情提示
            this.$message.success("退出成功");
            // 3，退出成功要跳转到登录页面
            this.$router.push("/login");
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