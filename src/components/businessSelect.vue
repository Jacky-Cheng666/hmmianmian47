<template>
  <el-select class="short" @change="change" v-model="enterprise" placeholder="请选择企业">
    <el-option value="" v-if="isSearch">所有企业</el-option>
    <el-option
      v-for="(item, index) in enterpriseList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { businessList } from "@/api/business.js";
export default {
  name: "businessSelect",
  props: {
    value: {
      default: ""
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      enterprise: this.value,
      enterpriseList: []
    };
  },
  created() {
    // 2，调用企业列表接口
    businessList({
      status: 1
    }).then(res => {
      this.enterpriseList = res.data.data.items;
    });
  },
  methods: {
    change() {
      // emit后面的第一个参数为方法名，第二个参数为传递过去父组件的值。
      this.$emit("input", this.enterprise);
    }
    // 也可使用watch来监听enterprise值的改变。
  },
  watch: {
    value(val) {
      this.enterprise = val;
    }
  }
};
</script>

<style>
</style>