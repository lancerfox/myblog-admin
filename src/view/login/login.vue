<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <h1>Welcome to Your Vue.js App</h1>
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip" v-show="errorTips">帐号或密码错误，请重新输入</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import Cookies from "js-cookie";
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      errorTips: false
    };
  },
  mounted() {
    // this.$store.dispatch('getcxrf');
  },
  methods: {
    handleSubmit({ userName, password }) {
      const _self = this;
      this.$store
        .dispatch("login", {
          username: userName,
          password: password
        })
        .then(res => {
          // console.log(res);
          if (res.data.error === 0) {
            this.errorTips = false;
            Cookies.set("token", res.data.token);
            Cookies.set("username", res.data.username);
            // Cookies.set('uuid',res.data.uuid)
            _self.$router.push({
              path: "/home"
            });
          } else {
            this.errorTips = true;
          }
        });
    }
  }
};
</script>

<style>
</style>
