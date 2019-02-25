<template>
  <div>
    <Row :gutter="20">
      <i-col
        :xs="12"
        :md="8"
        :lg="4"
        v-for="(infor, i) in inforCardData"
        :key="`infor-${i}`"
        style="height: 120px;padding-bottom: 10px;"
      >
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
// import { ChartPie, ChartBar } from "_c/charts";
// import Example from "./example.vue";
export default {
  name: "home",
  components: {
    InforCard,
    CountTo
    // ChartPie,
    // ChartBar,
    // Example
  },
  data() {
    return {
      inforCardData: [
        {
          title: "用户数量",
          icon: "md-person-add",
          count: 803,
          color: "#2d8cf0"
        },
        {
          title: "笔记",
          icon: "md-chatbubbles",
          count: 12,
          color: "#E46CBB"
        }
      ]
    };
  },
  mounted() {
    //
  }
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
