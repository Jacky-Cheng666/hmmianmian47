<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card topCard">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="short" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="normal" v-model="formInline.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearForm">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="addBusiness">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部卡片 -->
    <el-card class="box-card">
      <!-- 表格模块 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            <!-- 把创建日期用全局过滤器过滤 -->
            {{scope.row.create_time|formatTime}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editCompany(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status===1?"禁用":"启用"}}</el-button>
            <el-button type="text" @click="deleteCompany(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器模块 -->
      <el-pagination
        background
        @current-change="CurrentChange"
        @size-change="sizeChange"
        :current-page="page"
        :page-sizes="[2,5,10,20,30,40,50]"
        :page-size="size"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增企业模块 -->
    <!-- <businessAdd ref="businessAdd"></businessAdd> -->
    <!-- 编辑企业模块 -->
    <!-- <businessEdit ref="businessEdit"></businessEdit> -->
    <!-- <business-edit ref="businessDialog"></business-edit> -->
    <bg ref="businessDialog"></bg>
  </div>
</template>

<script>
import businessDialog from "./components/businessDialog";
import { businessList, businessStatus, businessDel } from "@/api/business.js";
export default {
  name: "business",
  components: {
    // businessAdd,
    // businessEdit
    bg: businessDialog
  },
  data() {
    return {
      formInline: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      tableData: [],
      page: 1,
      size: 5,
      total: 0,
      oldItem: null,
      isClickedAdd: false,
      tempItem: ""
    };
  },
  created() {
    this.getCompanyList();
  },
  methods: {
    // 1，获取企业列表方法
    getCompanyList() {
      businessList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    // 2，顶部栏搜索企业数据方法
    search() {
      this.page = 1;
      this.getCompanyList();
    },
    // 3，启用或者禁用点击事件
    changeStatus(row) {
      // console.log(row);
      businessStatus({
        id: row.id
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          // 如果修改状态成功，重新获取表格最新数据。
          this.getCompanyList();
        }
      });
    },
    // 4，页容量改变事件
    sizeChange(val) {
      this.size = val;
      this.page = 1;
      this.getCompanyList();
    },
    // 5，页码改变事件
    CurrentChange(val) {
      this.page = val;
      // 根据新的页码去请求数据
      this.getCompanyList();
    },
    // 6，顶部清除按钮事件
    clearForm() {
      this.$refs.formInline.resetFields();
      this.page = 1;
      this.getCompanyList();
    },
    // 7，删除企业事件
    deleteCompany(row) {
      this.$confirm("确认是否删除该企业?", "友情提示", {
        type: "warning"
      })
        .then(() => {
          // 调用删除企业接口
          businessDel({ id: row.id }).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              if (this.tableData.length == 1) {
                this.page--;
              }
              if (this.page == 0) {
                this.page = 1;
              }
              this.getCompanyList();
            }
          });
        })
        .catch(() => {});
    },
    // 8，编辑企业方法
    editCompany(row) {
      // 把是否添加的状态改为false
      this.$refs.businessDialog.isAdd = false;
      this.$refs.businessDialog.dialogFormVisible = true;
      if (row != this.oldItem) {
        this.$refs.businessDialog.form = { ...row };
        this.oldItem = row;
      } else if (this.isClickedAdd) {
        // 就把之前form的值重新赋值给form
        this.$refs.businessDialog.form = this.tempItem;
      }
    },
    // 9，新增企业按钮点击事件
    addBusiness() {
      //再新增之前，把改动的数据先保存起来
      this.tempItem = this.$refs.businessDialog.form;
      // 因为是同一个表单，需要清空一下表单里面的数据。
      this.$refs.businessDialog.form = {};
      this.$refs.businessDialog.isAdd = true;
      this.$refs.businessDialog.dialogFormVisible = true;
      // 标记刚刚是否点过新增按钮。
      this.isClickedAdd = true;
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