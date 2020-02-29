<template>
  <el-dialog center title="新增学科" :visible.sync="dialogFormVisible">
    <el-form :model="form" label-position="right" :rules="rules" ref="form">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
        <el-input type="textarea" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="doAdd">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectAdd } from "@/api/subject.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      formLabelWidth: "90px",
      rules: {
        rid: [{ required: true, message: "请输入课程编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    doAdd() {
      //   this.dialogFormVisible = false;
      this.$refs.form.validate(v => {
        if (v) {
          //   1，第一种方式发请求
          //   subjectAdd({
          //     ...this.form
          //   })
          // 2，第二种方式发请求
          subjectAdd(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message.success("新增学科成功");
              this.$parent.getList();
              this.dialogFormVisible = false;
              this.$refs.form.resetFields();
            } else {
              this.$message.error(res.data.message);
            }
          });
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