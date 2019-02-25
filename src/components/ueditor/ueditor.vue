<template>
  <div id="editor" type="text/plain"></div>
</template>
<script>
import "../../../public/ueditor/ueditor.config.js";
import "../../../public/ueditor/ueditor.all.js";
import "../../../public/ueditor/lang/zh-cn/zh-cn.js";
import Cookies from "js-cookie";
import { isEmpty } from "../../libs/util.js";
import config from "@/config";
export default {
  name: "UE",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      editor: ""
    };
  },
  methods: {
    init() {
      this.editor = window.UE.getEditor("editor", this.config);
    },
    setContentbtn(val) {
      const self = this;
      this.editor.ready(function() {
        self.editor.setContent(val, true);
      });
    },
    getContentBtn() {
      const content = this.editor.getContent();
      const contentText = this.editor.getPlainTxt();
      this.$emit("_getContent", {
        content,
        contentText
      });
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>
