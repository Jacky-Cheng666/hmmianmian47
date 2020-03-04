<template>
  <!-- 下拉框组件 -->
  <el-select class="short" v-model="subject" placeholder="请选择学科">
    <el-option
      v-for="(item, index) in subjectList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { subjectList } from "@/api/subject.js";
export default {
  name: "subjectSelect",
  props: {
    value: {
      type: Number
    }
  },
  data() {
    return {
      subject: this.value,
      subjectList: []
    };
  },
  created() {
    // 1，调用获取学科列表方法
    subjectList({
      status: 1
    }).then(res => {
      this.subjectList = res.data.data.items;
    });
  },
  watch: {
    //   监听subject的值，并传递给调用它的父组件。
    subject(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style>
</style>