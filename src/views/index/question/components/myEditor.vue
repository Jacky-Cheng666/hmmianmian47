<template>
  <div class="myEditor">
    <div class="toolbar" ref="toolbar"></div>
    <div class="content" ref="content">{{content}}</div>
  </div>
</template>

<script>
import wangeditor from "wangeditor";
export default {
  name: "editor",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      content: this.value,
      editor: ""
    };
  },
  mounted() {
    this.editor = new wangeditor(this.$refs.toolbar, this.$refs.content);
    // 监听富文本值改变的事件。
    // function里面的this指向默认指向window.
    // 所以这里不要用function，需要用箭头函数
    this.editor.customConfig.onchange = html => {
      this.$emit("input", html);
    };
    this.editor.create();
  }
};
</script>

<style lang="less">
.myEditor {
  .toolbar {
    border: 1px solid #ccc;
    width: 835px;
  }
  .content {
    border: 1px solid #ccc;
    height: 60px;
    width: 835px;
  }
}
</style>