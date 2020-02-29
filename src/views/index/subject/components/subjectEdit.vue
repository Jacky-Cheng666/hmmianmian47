<template>
  <el-dialog center title="编辑学科" :visible.sync="dialogFormVisible">
    <el-form :model="form" label-position="right" :rules="rules" ref="form">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
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
import { subjectEdit } from "@/api/subject.js";
export default {
  name: "subjectEdit",
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
  created() {},
  methods: {
    editEvent() {
      //   调用编辑学科接口
      subjectEdit({
        ...this.form
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("修改成功");
          this.$parent.getList();
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