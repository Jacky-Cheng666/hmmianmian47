<template>
  <el-dialog center title="编辑企业" :visible.sync="dialogFormVisible">
    <el-form :model="form" label-position="right" :rules="rules" ref="form">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editEvent" type="primary">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { businessEdit } from "@/api/business.js";
export default {
  name: "subjectEdit",
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
        eid: [{ required: true, message: "请输入课程编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    editEvent() {
      //   调用编辑企业接口
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