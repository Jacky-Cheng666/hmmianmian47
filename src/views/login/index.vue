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
      <el-form :model="ruleForm" :rules="rules" ref="loginForm">
        <!-- 用户名输入框 -->
        <el-form-item prop="phone">
          <el-input
            clearable
            placeholder="请输入手机号"
            prefix-icon="el-icon-search"
            v-model="ruleForm.phone"
          ></el-input>
        </el-form-item>
        <!-- 密码框输入框 -->
        <el-form-item prop="pwd">
          <el-input
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.pwd"
          ></el-input>
        </el-form-item>
        <!-- 验证码输入模块 -->
        <el-form-item prop="code">
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
        <el-form-item class="agreement" prop="agree">
          <el-checkbox v-model="ruleForm.agree"></el-checkbox>
          <span class="text">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </span>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button @click="doLogin" class="loginBtn" type="primary">登录</el-button>
          <el-button @click="doRegister" class="registerBtn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="./images/login_banner_ele.png" alt />
    <!-- 注册对话框模块 -->
    <register ref="register"></register>
  </div>
</template>

<script>
import register from "./components/register";
export default {
  components: {
    register
  },
  data() {
    return {
      ruleForm: {
        phone: "",
        pwd: "",
        code: "",
        agree: true
      },

      rules: {
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        // 对于checkbox不可能为空，除非你赋值为空。不能用require:true来判断。
        agree: [
          // { required: true, message: "必须勾选用户同意协议", trigger: "change" }
          // 只有值为true才满足条件，否则代表不匹配
          {
            pattern: /true/,
            message: "必须勾选用户同意协议",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    doLogin() {
      this.$refs.loginForm.validate(v => {
        if (v) {
          alert("发送请求");
          // 发送登录请求
        }
      });
    },
    doRegister() {
      this.$refs.register.dialogFormVisible = true;
    }
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
      .el-form-item__content {
        display: flex;
        align-items: center;
        .text {
          display: flex;
          align-items: center;
          margin-left: 5px;
          .el-link.el-link--primary {
            height: 19px;
          }
        }
      }
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