<template>
  <div class="login-wrap">
    <!-- 左侧登录盒子 -->
    <div class="login-box">
      <!-- 文字标题模块 -->
      <div class="title-box">
        <img class="logo" src="../login/images/login_logo.png" alt />
        <span class="left-title">黑马面面</span>
        <span class="line"></span>
        <span class="right-title">用户登录</span>
      </div>
      <el-form :model="ruleForm">
        <!-- 用户名输入框 -->
        <el-form-item>
          <el-input
            clearable
            placeholder="请输入手机号"
            prefix-icon="el-icon-search"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码框输入框 -->
        <el-form-item>
          <el-input
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.pwd"
          ></el-input>
        </el-form-item>
        <!-- 验证码输入模块 -->
        <el-form-item>
          <el-row>
            <el-col :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="code" src="./images/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 同意协议模块 -->
        <el-form-item class="agreement">
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="loginBtn" type="primary">登录</el-button>
          <el-button class="registerBtn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="./images/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        pwd: "",
        code: "",
        checked: false
      }
    };
  }
};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  align-items: center;
  justify-content: space-around;
  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 42px;
    .title-box {
      display: flex;
      // 侧轴垂直居中
      align-items: center;
      margin-bottom: 29px;
      .logo {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .left-title {
        font-size: 22px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .right-title {
        font-size: 21px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .code {
      width: 100%;
      height: 42px;
    }
    .agreement {
      margin-bottom: 28px;
    }
    .loginBtn,
    .registerBtn {
      width: 100%;
    }
    .registerBtn {
      margin-top: 26px;
      margin-left: 0;
    }
  }
}
</style>