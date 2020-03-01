<template>
  <el-dialog center :title="isAdd?'新增企业':'编辑企业'" :visible.sync="dialogFormVisible">
    <el-form :model="form" label-position="right" :rules="rules" ref="form">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input type="textarea" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保 存</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { businessAdd, businessEdit } from "@/api/business.js";
export default {
  name: "businessDialog",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      formLabelWidth: "90px",
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }]
      },
      // 设置一个变量来确认用户是否点击新增还是编辑按钮。
      // true代表新增，false代表修改。
      isAdd: true
    };
  },
  methods: {
    save() {
      this.$refs.form.validate(v => {
        if (v) {
          // 判断用户做的是哪一部操作?
          if (this.isAdd) {
            // 1，调用新增企业接口
            businessAdd({
              ...this.form
            }).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("新增企业成功");
                this.dialogFormVisible = false;
                this.$parent.getCompanyList();
                // 新增成功后清空表单域
                this.$refs.form.resetFields();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            // 2，调用编辑企业接口
            businessEdit({
              ...this.form
            }).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("编辑成功");
                this.$parent.getCompanyList();
                this.dialogFormVisible = false;
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
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
  .el-dialog__title {
    color: #fff;
  }
}
.el-dialog {
  width: 600px;
}
</style>