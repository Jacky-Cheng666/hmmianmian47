<template>
  <div class="user">
    <el-dialog center :title="isAdd?'新增用户':'编辑用户'" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="form" label-position="right" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input class="long" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input class="long" v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input class="long" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
          <el-select
            @change="form.role_id=form.role"
            class="short"
            v-model="form.role"
            placeholder="请选择角色"
          >
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select class="short" v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input class="long" v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { useAdd, userEdit } from "@/api/user.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {},
      // 用来判断用户是否新增或者编辑
      isAdd: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱地址", trigger: "blur" },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "邮箱地址格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: "手机号码格式不正确",
            trigger: "blur"
          }
        ],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }]
      }
    };
  },
  methods: {
    save() {
      this.$refs.form.validate(v => {
        if (v) {
          if (this.isAdd) {
            //   1，新增用户操作，调用新增用户接口
            useAdd({
              ...this.form
            }).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.dialogFormVisible = false;
                // this.$refs.form.resetFields(); //新增成功后清空表单
                this.$message.success("新增用户成功");
                this.$parent.getUserList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            //   2，调用编辑用户接口
            userEdit(this.form).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("用户编辑成功");
                this.dialogFormVisible = false;
                this.$parent.getUserList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.user {
  .el-dialog {
    width: 580px;
  }
  .long {
    width: 390px;
  }
  .short {
    width: 180px;
  }
}
</style>