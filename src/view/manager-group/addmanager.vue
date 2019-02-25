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
        ref="addmangerformCustom"
        :model="formCustom"
        :rules="ruleCustom"
      >
        <FormItem label="用户名：" prop="userName">
          <div style="display:inline-block;width:300px;">
            <Input placeholder="请输入用户名" v-model="formCustom.userName"></Input>
          </div>
        </FormItem>
        <FormItem label="密码：" prop="password">
          <div style="display:inline-block;width:300px;">
            <Input placeholder="请输入密码" v-model="formCustom.password"></Input>
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
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        var reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
        if (reg.test(value) == false) {
          callback(
            new Error(
              "用户名只能输入5-20个以字母开头、可带数字、“_”、“.”的字符"
            )
          );
        }
        callback();
      }
    };
    //验证密码
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        var reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,19}$/;
        if (reg.test(value) == false) {
          callback(
            new Error("密码只能输入6-20个以字母开头、可带数字、“_”、“.”的字符")
          );
        }
        callback();
      }
    };
    return {
      formCustom: {
        userName: "",
        password: ""
      },
      ruleCustom: {
        userName: [
          {
            validator: validateUsername,
            trigger: "blur",
            required: true
          }
        ],
        password: [
          {
            validator: validatePassword,
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
      this.$refs.addmangerformCustom.validate(valid => {
        if (valid) {
          this.$emit("_sumitAddManage", {
            userName: this.formCustom.userName,
            password: this.formCustom.password
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
      this.formCustom.userName = "";
      this.formCustom.password = "";
      console.log("表单已经清空");
    }
  }
};
</script>

