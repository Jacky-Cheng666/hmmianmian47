<template>
  <div class="questionDialog">
    <el-dialog destroy-on-close fullscreen title="新增题库" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="学科" :label-width="formLabelWidth" prop="subject">
          <!-- 学科下拉框模块 -->
          <subjectSelect v-model="form.subject"></subjectSelect>
        </el-form-item>
        <el-form-item label="阶段" :label-width="formLabelWidth" prop="step">
          <el-select class="selLength" v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" :label-width="formLabelWidth" prop="enterprise">
          <!-- 企业下拉框模块 -->
          <businessSelect v-model="form.enterprise"></businessSelect>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
          <chinaArea v-model="form.city"></chinaArea>
        </el-form-item>
        <el-form-item label="题型" :label-width="formLabelWidth" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" :label-width="formLabelWidth" prop="difficulty">
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 分割线 -->
        <el-form-item>
          <el-divider></el-divider>
        </el-form-item>
        <el-form-item label="题目标题" label-width="200px" prop="title">
          <myEditor v-model="form.title"></myEditor>
        </el-form-item>
        <el-form-item
          v-if="form.type==1"
          label="单选"
          :label-width="formLabelWidth"
          prop="single_select_answer"
        >
          <el-radio-group v-model="form.single_select_answer">
            <!-- 第一个选项布局 -->
            <!-- 导入组件 -->
            <option-item
              :label.sync="item.label"
              :text.sync="item.text"
              :image.sync="item.image"
              v-for="(item, index) in form.select_options"
              :key="index"
            ></option-item>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-else-if="form.type==2"
          label="多选"
          :label-width="formLabelWidth"
          prop="multiple_select_answer"
        >
          <el-checkbox-group v-model="form.multiple_select_answer">
            <!-- 多选框模块组件 -->
            <option-item
              :isRadio="false"
              :label.sync="item.label"
              :text.sync="item.text"
              :image.sync="item.image"
              v-for="(item, index) in form.select_options"
              :key="index"
            ></option-item>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-else label="简答" :label-width="formLabelWidth" prop="short_answer">
          <el-input
            class="textarea"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="form.short_answer"
          ></el-input>
        </el-form-item>
        <!-- 分割线 -->
        <el-form-item>
          <el-divider></el-divider>
        </el-form-item>
        <!-- 上传文件模块 -->
        <!-- 表单重置方法也需要有prop方法 -->
        <el-form-item prop="video" label="解析视频" :label-width="formLabelWidth">
          <!-- 导入视频模块 -->
          <videoUpload :video.sync="form.video"></videoUpload>
        </el-form-item>
        <!-- 分割线 -->
        <el-form-item>
          <el-divider></el-divider>
        </el-form-item>

        <el-form-item label="答案解析" :label-width="formLabelWidth" prop="answer_analyze">
          <!-- 导入富文本模块 -->
          <my-editor v-model="form.answer_analyze"></my-editor>
        </el-form-item>
        <el-form-item>
          <el-divider></el-divider>
        </el-form-item>

        <el-form-item label="试题备注" :label-width="formLabelWidth" prop="remark">
          <el-input class="textarea" type="textarea" :rows="2" v-model="form.remark"></el-input>
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
import chinaArea from "./chinaArea";
import myEditor from "./myEditor";
import optionItem from "./optionItem";
import videoUpload from "./videoUpload";
import { questionEdit } from "@/api/question.js";
export default {
  name: "questionEdit",
  components: {
    chinaArea,
    myEditor,
    optionItem,
    videoUpload
  },
  data() {
    return {
      form: {
        type: "1",
        multiple_select_answer: [],
        // 选项,介绍，图片介绍。
        select_options: [
          {
            label: "A"
            // text: "狗不理",
            // image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B"
            // text: "猫不理",
            // image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C"
            // text: "麻花",
            // image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D"
            // text: "炸酱面",
            // image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "280px",
      // 表单验证规则
      rules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        subject: [
          { required: true, message: "学科不能为空", trigger: "change" }
        ],
        step: [{ required: true, message: "阶段不能为空", trigger: "change" }],
        enterprise: [
          { required: true, message: "企业不能为空", trigger: "change" }
        ],
        city: [{ required: true, message: "城市不能为空", trigger: "change" }],
        type: [{ required: true, message: "题型不能为空", trigger: "change" }],
        difficulty: [
          { required: true, message: "难度不能为空", trigger: "change" }
        ],
        single_select_answer: [
          { required: true, message: "单选答案不能为空", trigger: "change" }
        ],
        multiple_select_answer: [
          { required: true, message: "多选答案不能为空", trigger: "change" }
        ],
        short_answer: [
          { required: true, message: "简单答案不能为空", trigger: "blur" }
        ],
        answer_analyze: [
          { required: true, message: "答案解析不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "答案备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    save() {
      this.$refs.form.validate(v => {
        if (v) {
          questionEdit(this.form).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
              this.$parent.getSubjectList();
              // 重置表单元素只能重置表单，自己封装的组件不能重置。
              // 解决方法：销毁组件。
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

  .el-checkbox-group {
    width: 740px !important;
  }
  .textarea {
    width: 752px;
  }
  .avatar-uploader {
    text-align: left;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>