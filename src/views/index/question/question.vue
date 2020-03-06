<template>
  <div class="question-wrap">
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form inline ref="form" :model="form" label-width="80px" label-position="right">
        <el-form-item label="学科" prop="subject">
          <!-- 引用全局组件学科列表下拉框 -->
          <!-- 这里的v-model是语法糖。相当于执行了:value=form.subject和:input="getVal"两行代码 -->
          <subject-select :isSearch="true" v-model="form.subject"></subject-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select class="short" v-model="form.step" placeholder="请选择阶段">
            <el-option value label="全部"></el-option>
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业" prop="enterprise">
          <!-- 企业下拉框全局子组件 -->
          <business-select :isSearch="true" v-model="form.enterprise"></business-select>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select class="short" v-model="form.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="难度" prop="difficulty">
          <el-select class="short" v-model="form.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input class="short" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="short" v-model="form.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <el-date-picker class="short" v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input class="long" v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearForm">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="questionAdd">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部卡片模块 -->
    <el-card>
      <!-- 表格模块 -->
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" prop="date" label="序号" width="60"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="subject_name" label="学科.阶段">
          <template slot-scope="scope">
            <!-- 用计算属性，或者过滤器都可以来处理这里的数据 -->
            {{scope.row.subject_name+"."}}{{scope.row.step|formatSubjectStep}}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">单选</span>
            <span v-else-if="scope.row.type==2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作" width="132">
          <template slot-scope="scope">
            <el-button @click="questionEdit(scope.row)" type="text">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row)"
              type="text"
            >{{scope.row.status==1?"禁用":"启用"}}</el-button>
            <el-button @click="questionDel(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器模块 -->
      <el-pagination
        background
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[2,5,10,20,30,40,50]"
        :page-size="size"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增题库模块 -->
    <questionDialog ref="questionDialog"></questionDialog>
    <!-- 编辑题库模块 -->
    <questionEdit ref="questionEdit"></questionEdit>
  </div>
</template>

<script>
import {
  questionList,
  questionStatus,
  questionRemove
} from "@/api/question.js";
import questionDialog from "./components/questionDialog";
import questionEdit from "./components/questionEdit";
export default {
  name: "question",
  components: {
    questionDialog,
    questionEdit
  },
  data() {
    return {
      form: {},
      subjectList: [],
      enterpriseList: [],
      tableData: [],
      page: 1,
      size: 5,
      total: 0
    };
  },
  filters: {
    formatSubjectStep(val) {
      if (val == "1") {
        return "初级";
      } else if (val == "2") {
        return "中级";
      } else {
        return "高级";
      }
    }
  },
  methods: {
    // 1，获取题目列表方法
    getSubjectList() {
      questionList({
        ...this.form,
        page: this.page,
        limit: this.size
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    // 2，顶部卡片搜索按钮点击事件
    search() {
      this.getSubjectList();
    },
    // 3，顶部清除按钮点击事件
    clearForm() {
      this.$refs.form.resetFields();
      this.page = 1;
      this.getSubjectList();
    },
    // 改变subject值  使用了v-model下面这几行代码自动执行了
    // getVal(val) {
    //   this.form.subject = val;
    // }
    // 4，编辑按钮点击事件
    questionEdit(row) {
      console.log(row);

      this.$refs.questionEdit.form = { ...row };
      this.$refs.questionEdit.form.city = this.$refs.questionEdit.form.city.split(
        ","
      );
      this.$refs.questionEdit.form.multiple_select_answer = this.$refs.questionEdit.form.multiple_select_answer.split(
        ","
      );
      this.$refs.questionEdit.dialogFormVisible = true;
    },
    // 新增题库
    questionAdd() {
      this.$refs.questionDialog.dialogFormVisible = true;
    },
    // 5,页容量改变事件。
    sizeChange(size) {
      this.size = size;
      this.page = 1;
      this.getSubjectList();
    },
    // 6，页码改变事件。
    pageChange(page) {
      this.page = page;
      this.getSubjectList();
    },
    // 7，改变题目状态
    changeStatus(row) {
      questionStatus({
        id: row.id
      }).then(res => {
        if (res.data.code == 200) {
          this.getSubjectList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 8，删除按钮点击事件
    questionDel(row) {
      this.$confirm("确认是否要删除该题目", "友情提示", {
        type: "warning"
      })
        .then(() => {
          questionRemove({
            id: row.id
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              this.getSubjectList();
            }
          });
        })
        .catch();
    }
  },
  created() {
    // 2，获取题目列表方法
    this.getSubjectList();
  }
};
</script>

<style lang="less" scoped>
.question-wrap {
  .long {
    width: 388px;
  }
  .short {
    width: 150px;
  }

  .el-form-item__label {
    padding: 0 31px 0 0;
  }
  .box-card {
    margin-bottom: 21px;
  }
  .el-pagination {
    text-align: center;
  }
}
</style>