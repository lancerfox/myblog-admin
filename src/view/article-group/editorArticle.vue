<template>
  <div>
    <Card>
      <div style="border-bottom:1px solid #ccc;padding:10px 0;">
        <Row>
          <Col span="6">
            <span>&nbsp;</span>
          </Col>
          <Col span="12">
            <span>标题：</span>
            <div style="display:inline-block;">
              <Input class="input-width" v-model="title"></Input>
            </div>
          </Col>
          <Col span="6">
            <span style="margin:0 10px;">
              <Button class="myaddmanager" type="primary" @click="saveArticle()">保存</Button>
            </span>
          </Col>
        </Row>
      </div>
      <ueditor :config="config" @_getContent="getContent" ref="ueditor"></ueditor>
    </Card>
  </div>
</template>
<script>
import ueditor from "_c/ueditor";
import Cookies from "js-cookie";
import { isEmpty } from "../../libs/util.js";
import config from "@/config";
export default {
  name: "UE",
  components: {
    ueditor
  },
  data() {
    return {
      config: {
        initialFrameWidth: 800,
        initialFrameHeight: 300,
        serverUrl:
          process.env.NODE_ENV === "development"
            ? config.baseUrl.dev + "/api/v1/ue?_csrf="
            : config.baseUrl.pro + "/api/v1/ue?_csrf=",
        UEDITOR_HOME_URL:
          process.env.NODE_ENV === "development"
            ? "./ueditor/"
            : "./admin/public/ueditor/"
      },
      title: "",
      content: "",
      contentText: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const _id = this.$route.query.id;
      const params = "?id=" + _id;
      const res = await this.$store.dispatch("get_article", params);
      let val = res.data;
      console.log(res);
      if (val.error === 1) {
        this.title = "";
        this.contentText = "";
        this.$Modal.error({
          title: "提示",
          content: "你要编辑的文章不存在！",
          onOk: () => {
            this.$router.push({
              path: "/articlemanage/articlelist"
            });
          }
        });
        return false;
      }
      this.title = val.article.article_title;
      this.$refs.ueditor.setContentbtn(val.article.article_content);
    },
    getContent({ content, contentText }) {
      this.content = content;
      this.contentText = contentText;
    },
    async saveArticle() {
      this.$refs.ueditor.getContentBtn();
      if (isEmpty(this.title)) {
        this.$Message.error({
          content: "请输入文章标题！",
          duration: 5
        });
        return false;
      }
      if (isEmpty(this.content)) {
        this.$Message.error({
          content: "请输入文章内容！",
          duration: 5
        });
        return false;
      }

      let params = {
        article_title: this.title,
        article_content: this.content,
        article_text_content: this.contentText,
        id: this.$route.query.id,
        author_id: Cookies.get("uuid")
      };
      let res = await this.$store.dispatch("editor_article", params);
      let value = res.data;
      console.log(value);
      if (value.error === 0) {
        this.$Message.success({
          content: "保存成功",
          duration: 5
        });
      } else {
        console.log(value.message);
        this.$Message.error({
          content: "保存失败！" + value.message,
          duration: 5
        });
      }
    }
  }
};
</script>

<style lang="less">
#editor {
  width: 800px;
  margin: 10px auto;
}

.input-width {
  width: 300px;
}
</style>

