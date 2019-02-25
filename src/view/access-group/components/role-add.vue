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
      <Form
        :label-width="150"
        label-position="right"
        ref="roleaddformCustom"
        :model="formCustom"
        :rules="ruleCustom"
      >
        <FormItem label="名称：" prop="title">
          <div style="display:inline-block;width:300px;">
            <Input placeholder="请输入名称" v-model="formCustom.title"></Input>
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
import { Modal, Form, FormItem, Input } from "iview";
export default {
  components: {
    Modal,
    Form,
    FormItem,
    Input
  },
  props: {
    modal: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    //验证用户名
    const validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入名称"));
      } else {
        var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,8}$/;
        if (reg.test(value) == false) {
          callback(new Error("名称只能输入1-8个由字母、数字、汉字组成的字符"));
        }
        callback();
      }
    };
    return {
      formCustom: {
        title: ""
      },
      ruleCustom: {
        title: [
          {
            validator: validateTitle,
            trigger: "blur",
            required: true
          }
        ]
      }
    };
  },
  methods: {
    //确定提交表单
    confirmAdd() {
      this.$refs.roleaddformCustom.validate(valid => {
        console.log(valid);
        if (valid) {
          this.$emit("_sumit", {
            title: this.formCustom.title
          });
        }
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
      this.formCustom.title = "";
      console.log("表单已经清空");
    }
  }
};
</script>

