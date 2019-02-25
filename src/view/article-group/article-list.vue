<template>
  <div class="article-list">
    <Card>
      <div class="operating-area"></div>
      <div class="showtable-area">
        <Table border :columns="columns7" :data="listdata"></Table>
      </div>
      <Row type="flex" justify="center" align="middle" style="margin: 10px 0;">
        <Page :total="total_count" :page-size="10" @on-change="changePage"/>
      </Row>
    </Card>
  </div>
</template>

<script>
import axios from "axios";
import { isEmpty } from "../../libs/util.js";
import { Card, Row, Col } from "iview";
export default {
  components: {
    Card,
    Row,
    Col
  },
  data() {
    return {
      isShowAddManageModal: false,
      total_count: 0,
      current_page: 1,
      columns7: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "标题",
          key: "article_title"
        },
        {
          title: "摘要",
          key: "article_text_content"
        },
        {
          title: "作者",
          key: "author_name"
        },
        {
          title: "创建时间",
          key: "create_data"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/articlemanage/editorArticle?id=" + params.row.id
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "删除提示",
                        content: "您确定要删除吗？",
                        loading: true,
                        onOk: () => {
                          this.remove(params.row.id);
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      listdata: []
    };
  },
  methods: {
    // 获取列表
    async getarticleList() {
      let self = this;
      let params = "currentPage=" + this.current_page;
      let res = await this.$store.dispatch("get_articlelist", params);
      let value = res.data;
      console.log(value);
      if (value.error === 0) {
        if (!isEmpty(value.article_list)) {
          this.listdata = value.article_list;
          this.total_count = value.count;
        } else {
          this.listdata = [];
          this.total_count = 0;
        }
      } else {
        this.listdata = [];
        this.total_count = 0;
        this.$Message.error({
          content: "信息获取失败！",
          duration: 5
        });
      }
    },
    //获取分页码
    changePage(val) {
      this.current_page = val;
      this.getarticleList();
    },
    async remove(val) {
      let params = {
        id: val
      };
      let res = await this.$store.dispatch("delete_article", params);
      let value = res.data;
      if (value.error === 0) {
        this.getarticleList();
        this.$Message.success({
          content: "删除成功",
          duration: 5
        });
      } else {
        console.log(value.message);
        this.$Message.error({
          content: "删除失败！",
          duration: 5
        });
      }
      this.$Modal.remove();
    },
    //点击添加管理员
    clickAddManager() {
      this.isShowAddManageModal = true;
    },
    //点击取消添加管理员
    hideAddManageModal() {
      this.isShowAddManageModal = false;
    }
  },
  mounted() {
    this.getarticleList();
  }
};
</script>

<style lang="less">
.operating-area {
  margin: 10px 0 15px 0;
}

.page-pos {
  width: 600px;
  margin: 10px auto;
}

.showtable-area {
}
</style>