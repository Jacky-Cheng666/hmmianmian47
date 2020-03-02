<template>
  <div class="user">
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
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearForm">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="addUser">新增用户</el-button>
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
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="userEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeUserStatus(scope.row)"
            >{{scope.row.status===1?"禁用":"启用"}}</el-button>
            <el-button type="text" @click="delUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器模块 -->
      <el-pagination
        background
        @size-change="SizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[2,5,10,20,30,40,50]"
        :page-size="size"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增用户模块/编辑用户模块 -->
    <user-dialog ref="userDialog"></user-dialog>
  </div>
</template>

<script>
import { userList, userDelete, userStatus } from "@/api/user.js";
import userDialog from "./components/userDialog";
export default {
  name: "user",
  components: {
    userDialog
  },
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
        ...this.formInline,
        page: this.page,
        limit: this.size
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    // 2，搜索点击事件
    search() {
      this.page = 1;
      this.getUserList();
    },
    // 3，清除按钮点击事件
    clearForm() {
      this.$refs.formInline.resetFields();
      this.page = 1;
      this.getUserList();
    },
    // 4，页容量改变事件
    SizeChange(size) {
      this.size = size;
      this.page = 1;
      this.getUserList();
    },
    // 5,页码改变事件
    pageChange(page) {
      this.page = page;
      this.getUserList();
    },
    // 6，删除按钮点击事件
    delUser(row) {
      this.$confirm("确认是否删除用户", "友情提示", {
        type: "warning"
      })
        .then(() => {
          userDelete({
            id: row.id
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              if (this.tableData.length == 1) {
                this.page--;
              }
              if (this.page == 0) {
                this.page = 1;
              }
              this.getUserList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {});
    },
    // 7，用户新增点击事件
    addUser() {
      this.$refs.userDialog.form = {};
      this.$refs.userDialog.isAdd = true;
      this.$refs.userDialog.dialogFormVisible = true;
    },
    // 8，编辑用户点击事件
    userEdit(row) {
      // console.log(row);
      this.$refs.userDialog.isAdd = false;
      this.$refs.userDialog.dialogFormVisible = true;
      if (row != this.oldItem) {
        this.$refs.userDialog.form = { ...row };
        this.oldItem = row;
      }
    },
    // 9，改变用户状态方法
    changeUserStatus(row) {
      // console.log(row);
      userStatus({ id: row.id }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.getUserList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.topCard {
  margin-bottom: 19px;
}
.short {
  width: 100px;
}
.user {
  .normal {
    width: 179px;
  }
}
.el-pagination {
  margin-top: 30px;
}
</style>