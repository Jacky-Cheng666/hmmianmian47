<template>
  <div class="videoUpload">
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过2M</div>
      <!-- 预览视频 -->
    </el-upload>
    <video :src="videoUrl" controls></video>
  </div>
</template>

<script>
export default {
  props: {
    video: { default: "" }
  },
  data() {
    return {
      // 视频上传接口路径
      uploadUrl: process.env.VUE_APP_URL + "/question/upload",
      // 上传后用来预览视频的临时路径。
      videoUrl: ""
    };
  },
  methods: {
    // 1，文件上传之前的判断
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 40;

      if (!isJPG) {
        this.$message.error("上传视频只能为mp4格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 2，文件上传成功函数
    handleAvatarSuccess(res, file) {
      //   console.log(res.data.url);
      this.$emit("update:video", res.data.url);
      this.videoUrl = URL.createObjectURL(file.raw);
    }
  }
};
</script>

<style>
</style>