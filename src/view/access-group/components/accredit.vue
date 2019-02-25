<template>
  <div>
    <Modal
      v-model="modal"
      width="600"
      @on-visible-change="watcherState"
      :closable="false"
      :mask-closable="false"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <span>授权</span>
      </p>
      <Tree :data="treeData" show-checkbox></Tree>
      <div slot="footer">
        <Button class="confirmAdd" type="primary" @click="confirmAdd()">确定</Button>
        <Button @click="clickHideModal()">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Modal, Tree, Button } from "iview";
export default {
  components: {
    Modal,
    Tree,
    Button
  },
  props: {
    modal: {
      type: Boolean,
      default() {
        return false;
      }
    },
    treeData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    //确定提交表单
    confirmAdd() {
      this.$emit("_sumit", this.treeData);
    },
    //点击取消按钮
    clickHideModal() {
      this.$emit("clickHide");
    },
    watcherState(v) {
      if (v === false) {
        this.$emit("clickHide");
      }
    },
    //清空表单
    clearFrom() {
      this.treeData = [];
      console.log("表单已经清空");
    }
  }
};
</script>
