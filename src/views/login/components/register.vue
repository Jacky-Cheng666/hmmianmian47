<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" width="553px" center>
    <el-form :model="registerForm" label-position="left" :rules="rules">
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickName">
        <el-input v-model="registerForm.nickName" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="registerForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
        <el-input v-model="registerForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
        <el-input v-model="registerForm.pwd" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth" prop="imgCode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="registerForm.imgCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img @click="resetImg" class="img_code" :src="registerForm.imgCodeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="rCode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="registerForm.rCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 倒计时不为0禁用按钮：
            倒计时不为0，代表还有倒计时，不能被点就是要禁用它。
            -->
            <el-button :disabled="sec!=0" @click="getPhoneCode">{{sec==0?"获取用户验证码":"还有"+sec+"秒"}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 倒计时的秒数，默认为0
      sec: 0,
      dialogFormVisible: false,
      registerForm: {
        nickName: "",
        email: "",
        mobile: "",
        pwd: "",
        imgCode: "",
        rCode: "",
        imgCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms"
      },
      formLabelWidth: "65px",
      // 注册页面表单校验规则。
      rules: {
        nickName: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 14, message: "长度在5-14之间", trigger: "change" }
        ],
        imgCode: [{ required: true, message: "请输入图行码", trigger: "blur" }],
        rCode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    resetImg() {
      // 涉及到浏览器的缓存机制：浏览器发现这次请求，我刚刚才请求过，他就不会真的去发请求。而是会把上次请求得到的结果再次赋值。
      //前端里面用来解决请求缓存的两套方案：
      // 1，随机数

      // this.registerForm.imgCodeUrl =
      //   process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Math.random();
      // 2，时间戳(用的多一点)
      this.registerForm.imgCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 获取手机验证码的点击事件。
    getPhoneCode() {
      // 1，倒计时操作
      this.sec = 10;
      let timer = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timer);
        }
      }, 1000);
      // 2，发送axios请求
      // axios如果发送跨域请求，默认不会携带cookie
      axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: {
          code: this.registerForm.imgCode,
          phone: this.registerForm.mobile
        },
        // 允许携带cookie
        withCredentials: true
      }).then(res => {
        //成功回调
        window.console.log(res);
        if (res.data.code == 200) {
          alert("您的验证码为：" + res.data.data.captcha);
        } else {
          alert(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog {
  .el-dialog__header {
    background: linear-gradient(to right, #11bfee, #2491e9);
    .el-dialog__title {
      color: #fff;
      font-size: 17px;
    }
  }
  .img_code {
    width: 100%;
    height: 41px;
  }
}
</style>