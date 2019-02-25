<template>
  <div>测试的
    <div v-show="isShow" :class="qq">显示</div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      title: "",
      isShow: false,
      qq: ""
    };
  },
  created() {
    let a = Cookies.get("asd");
    console.log("asd=" + a);
    if (parseInt(a) === 1) {
      this.isShow = true;
      this.qq = "asd";
      console.log("this.isShow=" + this.isShow);
    }
  },
  mounted() {
    this.setc();
  },
  methods: {
    setc() {
      console.log("设置了asd");
      Cookies.set("asd", 1);
    }
  }
};
</script>
<style>
.asd {
  color: red;
}
</style>
