<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card topCard">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="用户名称" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="normal" v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select class="normal" v-model="formInline.role_id">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button icon="el-icon-plus" type="primary">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部卡片 -->
    <el-card class="box-card">
      <!-- 表格模块 -->
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">{{scope.row.status===1?"禁用":"启用"}}</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器模块 -->
      <el-pagination
        background
        :current-page="page"
        :page-sizes="[2,5,10,20,30,40,50]"
        :page-size="size"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { userList } from "@/api/user.js";
export default {
  name: "user",
  components: {},
  data() {
    return {
      formInline: {
        username: "",
        email: "",
        role_id: ""
      },
      tableData: [],
      page: 1,
      size: 5,
      total: 0,
      oldItem: null
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 1，获取用户列表
    getUserList() {
      userList({
        page: this.page,
        limit: this.size
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      });
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