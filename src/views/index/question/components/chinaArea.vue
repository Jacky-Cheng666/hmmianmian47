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
    // 第一次浙江杭州，
    // 再传了一个北京，无法再赋值给到city。
    value: {
      default: ""
    }
  },
  watch: {
    value(val) {
      // value的值一旦发生变化
      // 就代表父组件传递了一个新的城市过来。
      // 所以就需要吧新值更新到city，才能让级联选择器变动。
      this.city = val;
    }
  },
  data() {
    return {
      // 只有组件第一次加载的时候，才把父组件传递过来的城市给了city。
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