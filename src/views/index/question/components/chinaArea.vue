<template>
  <el-cascader
    class="selLength"
    v-model="city"
    :options="options"
    :props="{ expandTrigger: 'hover',value:'label' }"
    @change="handlechange"
  ></el-cascader>
</template>

<script>
// 导入带省市区以及全部选项的省市区联动数据。
import { regionDataPlus } from "element-china-area-data";
export default {
  name: "chinaArea",
  props: {
    value: {}
  },
  data() {
    return {
      city: this.value,
      options: regionDataPlus
    };
  },
  methods: {
    handlechange() {
      this.$emit("input", this.city);
    }
  }
  //   watch: {
  //     city(val) {
  //       this.$emit("input", val);
  //     }
  //   }
};
</script>

<style>
</style>