<template>
  <div class="option-box">
    <el-radio v-if="isRadio" :label="label"></el-radio>
    <el-checkbox class="checkbox" v-else :label="label"></el-checkbox>
    <el-input @input="onInput" class="input" type="text" v-model="slefText"></el-input>
    <!-- 头像上传 -->
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  //   props: ["label", "text", "image", "isRadio"],
  props: {
    label: String,
    text: String,
    image: String,
    isRadio: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      //   selfLabel: this.label,因为label的值不会被改变，这里不需要赋值操作。
      imageUrl: this.image,
      slefText: this.text,
      //   上传地址
      uploadUrl: process.env.VUE_APP_URL + "/question/upload"
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //res就是服务器响应的内容
      //   console.log(this.imageUrl);
      //   console.log(res.data.url);
      this.$emit("update:image", res.data.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onInput() {
      // 把selfText传递给父组件
      this.$emit("update:text", this.slefText);
    }
  }
};
</script>

<style lang="less">
.option-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  .input {
    width: 476px;
    height: 40px;
    margin-right: 20px;
  }
  .checkbox {
    margin-right: 29px;
  }

  // 头像上传css样式
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
  
}
</style>