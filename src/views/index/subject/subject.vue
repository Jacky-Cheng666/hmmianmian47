<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card topCard">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="short" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
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
          <el-button @click="resetForm">清除</el-button>
          <el-button @click="addSubject" icon="el-icon-plus" type="primary">新增学科</el-button>
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
        :current-page="page"
        :page-sizes="[2,5,10,20,30,40,50]"
        :page-size="size"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增学科模块 -->
    <subjectAdd ref="subjectAdd"></subjectAdd>
    <!-- 编辑学科模块 -->
    <subjectEdit ref="subjectEdit"></subjectEdit>
  </div>
</template>

<script>
import subjectAdd from "./components/subjectAdd";
import subjectEdit from "./components/subjectEdit";
import { subjectList, subjectStatus, subjectDelete } from "@/api/subject.js";
export default {
  name: "subject",
  components: {
    subjectAdd,
    subjectEdit
  },
  data() {
    return {
      formInline: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
      tableData: [
        // 表格区域的数据来源
      ],
      // 页容量(一页最多显示多少条数据)
      size: 5,
      // 数据总量
      total: 0,
      // 分页的当前页
      page: 1,
      // 记录一下上次点的是哪一行数据
      oldItem: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 重置表单
    resetForm() {
      // resetFields()方法必须要给表单加prop属性才生效。
      this.$refs.formInline.resetFields();
      // 根据最新表单内容重新调用请求
      this.page = 1;
      this.getList();
    },
    // 封装获取学科列表的函数
    getList() {
      subjectList({
        // name: this.formInline.name,
        // rid: this.formInline.rid,
        // username: this.formInline.username,
        // status: this.formInline.status,
        ...this.formInline, //这段代码会解析成上面的四条代码
        page: this.page,
        limit: this.size
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    search() {
      this.page = 1;
      this.getList();
    },
    // 页容量改变事件
    handleSizeChange(size) {
      // size赋值为改变后的容量
      this.size = size;
      // 只要页容量改变了，都从第一页开始查。业内常规做法。
      this.page = 1;
      // 根据新的容量在请求数据。
      this.getList();
    },
    // 页码改变事件
    handleCurrentChange(page) {
      // 改变后的页面赋值给page
      this.page = page;
      // 根据新的页码去请求数据
      this.getList();
    },
    handleEdit(index, row) {
      console.log(index);
      this.$refs.subjectEdit.dialogFormVisible = true;
      // 对象赋值给对象。(对象赋值会引用地址，被赋值的对象属性改变了，原来对象的属性值也会跟着改变)
      // this.$refs.subjectEdit.form = row;
      // 拷贝一个新对象，然后再赋值给form

      // 优化：如果第一次点击这行，需要执行下面这行代码进行赋值。如果后面再点这一行，就不执行下面这行代码。思路：每次点击的时候判断一下跟上次点击的是不是同一行，如果是，就不重新赋值。如果不是才重新赋值。
      // this.$refs.subjectEdit.form = { ...row }; //{...row}为新拷贝出来的对象，...将row解构成一个新的对象。

      // 判断思路变为：点击编辑的时候判断是不是上次点的那一行，如果是就不要重新覆盖对话框，如果不是，就取到这行的值赋值给对话框。
      if (row != this.oldItem) {
        this.$refs.subjectEdit.form = { ...row };
        this.oldItem = row;
      }
    },
    // 修改学科状态的点击事件
    changeStatus(index, row) {
      console.log(row);
      subjectStatus({
        id: row.id
      }).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          // 只需要刷新表格数据就可以了。
          this.getList();
        }
      });
    },
    handleDelete(index, row) {
      // console.log(row);
      this.$confirm("确认是否删除该学科?", "友情提示", {
        type: "warning"
      }).then(() => {
        // 发送axios请求。
        subjectDelete({ id: row.id }).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success("删除成功");
            // 默认刷新的是当前页。如果是最后一条数据，那么要刷新上一页的数据。
            if (this.tableData.length == 1) {
              // 上一页数据
              this.page--;
            }
            // 如果只剩下最后一条数据，删除了之后page会变成0了。page至少应该为1。否则会有bug
            if (this.page == 0) {
              this.page = 1;
            }
            // 默认刷新当前页面
            this.getList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
    addSubject() {
      this.$refs.subjectAdd.dialogFormVisible = true;
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