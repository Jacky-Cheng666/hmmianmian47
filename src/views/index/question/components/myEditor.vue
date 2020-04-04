<template>
  <div class="myEditor">
    <div class="toolbar" ref="toolbar"></div>
    <div class="content" ref="content"></div>
  </div>
</template>

<script>
import wangeditor from "wangeditor";
export default {
  name: "editor",
  props: {
    // 第一次传进来：呵呵呵的标题
    // 第二次传进来哈哈哈，value变了，但是富文本内容不会变。因为mounted只会加载一次。
    value: {
      type: String,
      default: ""
    }
  },
  watch: {
    value(val) {
      //父组件传递过来的值变了，监听后，富文本的值马上跟着改变。
      this.editor.txt.html(val);
    }
  },
  data() {
    return {
      editor: ""
    };
  },
  // mouted只会调用一次
  // 组件创建的时候调用。
  mounted() {
    this.editor = new wangeditor(this.$refs.toolbar, this.$refs.content);
    // 监听富文本值改变的事件。
    // function里面的this指向默认指向window.
    // 所以这里不要用function，需要用箭头函数
    this.editor.customConfig.onchange = (html) => {
      this.$emit("input", html);
    };
    this.editor.create();
    // 设置富文本的值。把父组件传递过来的值，显示到富文本上。
    this.editor.txt.html(this.value);
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