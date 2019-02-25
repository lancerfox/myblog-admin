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
        ref="addformCustom"
        :model="formCustom"
        :rules="ruleCustom"
      >
        <FormItem label="名称：" prop="title">
          <div style="display:inline-block;width:300px;">
            <Input placeholder="请输入名称" v-model="formCustom.title"></Input>
          </div>
        </FormItem>
        <FormItem label="路径：" prop="path">
          <div style="display:inline-block;width:300px;">
            <Input placeholder="请输入路径" v-model="formCustom.path"></Input>
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
    // //验证密码
    // const validatePassword = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     var reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,19}$/;
    //     if (reg.test(value) == false) {
    //       callback(
    //         new Error("密码只能输入6-20个以字母开头、可带数字、“_”、“.”的字符")
    //       );
    //     }
    //     callback();
    //   }
    // };
    return {
      formCustom: {
        title: "",
        path: ""
      },
      ruleCustom: {
        title: [
          {
            validator: validateTitle,
            trigger: "blur",
            required: true
          }
        ],
        path: [
          { required: true, message: "路径不能为空！", trigger: "blur" },
          { type: "string", message: "路径格式不正确", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //确定提交表单
    confirmAdd() {
      this.$refs.addformCustom.validate(valid => {
        if (valid) {
          this.$emit("_sumitAdd", {
            title: this.formCustom.title,
            path: this.formCustom.path
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
      this.formCustom.path = "";
      console.log("表单已经清空");
    }
  }
};
</script>

