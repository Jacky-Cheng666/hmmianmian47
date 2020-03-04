<template>
  <div class="questionDialog">
    <el-dialog fullscreen title="新增题库" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学科" :label-width="formLabelWidth">
          <!-- 学科下拉框模块 -->
          <subjectSelect v-model="form.subject"></subjectSelect>
        </el-form-item>
        <el-form-item label="阶段" :label-width="formLabelWidth">
          <el-select class="selLength" v-model="form.step" placeholder="请选择活动区域">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" :label-width="formLabelWidth">
          <!-- 企业下拉框模块 -->
          <businessSelect v-model="form.enterprise"></businessSelect>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <chinaArea v-model="form.city"></chinaArea>
        </el-form-item>
        <el-form-item label="题型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" :label-width="formLabelWidth">
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-divider></el-divider>
        </el-form-item>
        <el-form-item label-width="200px">
          <myEditor v-model="form.title"></myEditor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import chinaArea from "./chinaArea";
import myEditor from "./myEditor";
export default {
  components: {
    chinaArea,
    myEditor
  },
  data() {
    return {
      form: {},
      dialogFormVisible: true,
      formLabelWidth: "280px"
    };
  }
};
</script>

<style lang="less">
.questionDialog {
  .short,
  .selLength {
    width: 364px;
  }
  .el-form-item__label {
    padding-right: 41px;
  }
  .el-divider {
    width: 900px;
    margin: 0 auto;
  }
}
</style>