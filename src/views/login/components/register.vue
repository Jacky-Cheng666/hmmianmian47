<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" width="553px" center>
    <el-form :model="registerForm" label-position="left" :rules="rules" ref="registerForm">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          v-model="registerForm.avatar"
          name="image"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
      <el-button type="primary" @click="doRegister">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { sendSMS } from "../../../api/register.js";
// 脚手架(vue-cli)里面提供了一个符号@，用它代表/src目录
import { sendSMS, register } from "@/api/register.js";
export default {
  name: "register",
  data() {
    return {
      // 上传图片的接口地址
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      imageUrl: "",
      // 倒计时的秒数，默认为0
      sec: 0,
      dialogFormVisible: false,
      registerForm: {
        avatar: "",
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
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
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
        imgCode: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          // len用来代表长度为4位
          { len: 4, message: "图片验证码只能为4位", trigger: "blur" }
        ],
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
      // 判断手机格式是否合法
      if (
        !/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
          this.registerForm.mobile
        )
      ) {
        // 提示用户手机号格式不正确
        // this.$message.error("您输入的手机号格式不正确");
        // return;
        return this.$message.error("您输入的手机号格式不正确");
      }
      if (this.registerForm.imgCode.length != 4) {
        this.$message.error("验证码的长度为4位");
        return;
      }

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
      // 调用api里面register.js文件里面的发送请求方法。传入一个参数对象就可以了
      sendSMS({
        code: this.registerForm.imgCode,
        phone: this.registerForm.mobile
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("您的验证码为：" + res.data.data.captcha);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleAvatarSuccess(res, file) {
      // res是响应报文，file是文件信息。
      // 把图片转成了临时路径，给了imageUrl
      this.imageUrl = URL.createObjectURL(file.raw);
      // window.console.log(res);
      // 文件上传成功后还要给avatar赋值，手动赋值才能让他有值，没有事件重新校验。
      this.registerForm.avatar = res.data.file_path;
      // 这个时候我们就要想办法，单独对这一个属性做一次校验。
      this.$refs.registerForm.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG,png,gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 确认按钮点击事件
    doRegister() {
      // 找到表单对象
      this.$refs.registerForm.validate(v => {
        if (v) {
          register({
            username: this.registerForm.nickName,
            phone: this.registerForm.mobile,
            email: this.registerForm.email,
            avatar: this.registerForm.avatar,
            password: this.registerForm.pwd,
            rcode: this.registerForm.rCode
          }).then(res => {
            if (res.data.code == 200) {
              // 注册成功，就关闭对话框
              this.$message.success("注册成功！");
              this.dialogFormVisible = false;
              // 若关闭表单，则需要重置表单。resetFields()方法只能重置表单元素。而img不是表单元素，只要img绑定的url还在，就一直在现实。
              this.$refs.registerForm.resetFields();
              // 将imgurl设置为空，不显示图片。
              this.imageUrl = "";
            } else {
              // 注册不成功，给出用户提示
              this.$message.error(res.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
<style>
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>