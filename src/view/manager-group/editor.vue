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
        <span>操作</span>
      </p>
      <Form :label-width="150" label-position="right">
        <FormItem label="角色选择：" prop="userName">
          <div style="display:inline-block;width:300px;">
            <Select v-model="formCustom.roles" multiple style="width:260px" placeholder="请选择角色">
              <Option
                v-for="item in select_list"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
        </FormItem>
      </Form>

      <div slot="footer">
        <Button class="confirmAdd" type="primary" @click="confirmAdd()">确定</Button>
        <Button @click="clickHideModal()">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Modal, Select, Option, Form, FormItem } from "iview";
export default {
  components: {
    Modal,
    Select,
    Option,
    Form,
    FormItem
  },
  props: {
    modal: {
      type: Boolean,
      default() {
        return false;
      }
    },
    select_list: {
      type: Array,
      default() {
        return [];
      }
    },
    oldRoles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch: {
    oldRoles(val, old) {
      this.formCustom.roles = val;
    }
  },
  data() {
    return {
      formCustom: {
        roles: this.oldRoles
      }
    };
  },
  methods: {
    //确定提交表单
    confirmAdd() {
      this.$emit("_sumitAddManage", {
        roles: this.formCustom.roles
      });
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
      this.formCustom.roles = [];
      console.log("表单已经清空");
    }
  }
};
</script>

