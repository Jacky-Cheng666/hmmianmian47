<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card topCard">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="short" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="normal" v-model="formInline.status" placeholder="活动区域">
            <el-option label="已提交" value="shanghai"></el-option>
            <el-option label="未提交" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="onSubmit">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="onSubmit">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部卡片 -->
    <el-card class="box-card">
      <!-- 表格模块 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.$index, scope.row)"
            >{{scope.row.status===1?"禁用":"启用"}}</el-button>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器模块 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 1, 300, 400]"
        :page-size="size"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { subjectList, subjectStatus } from "@/api/subject.js";
export default {
  name: "subject",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        // {
        //   sn: 1,
        //   subNum: "1302",
        //   subName: "计算机科学与技术",
        //   shortName: "计算机",
        //   creater: "张三",
        //   createrDate: "2020-02-28",
        //   status: "已提交"
        // }
      ],
      currentPage: 1,
      // 页容量
      size: 10,
      // 数据总量
      total: 0,
      // 获取哪一页的数据
      page: 1,
      // 每个页面最多显示几条
      limit: 5
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 封装获取学科列表的函数
    getList() {
      subjectList({
        page: this.page,
        limit: this.limit
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    // 页容量改变事件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 页码改变事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // console.log(val);
      this.page = val;
    },
    handleEdit(index, row) {
      console.log(row);
    },
    // 修改学科状态的点击事件
    changeStatus(index, row) {
      console.log(row);
      subjectStatus({
        id: row.id
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          // 只需要刷新表格数据就可以了。
          this.getList();
        }
      });
    },
    handleDelete(index, row) {
      console.log(row);
    }
  }
};
</script>

<style>
.topCard {
  margin-bottom: 19px;
}
.short {
  width: 100px;
}
.normal {
  width: 149px;
}
.el-pagination {
  margin-top: 30px;
}
</style>