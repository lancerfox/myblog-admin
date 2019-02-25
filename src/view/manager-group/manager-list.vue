<template>
  <div class="manager-list">
    <Card>
      <div class="operating-area">
        <Row>
          <Col span="6">
            <Input clearable placeholder="输入关键字搜索" class="search-input"/>
          </Col>
          <Col span="6">
            <span style="margin:0 10px;">
              <Button class="myaddmanager" type="primary" @click="clickAddManager()">添加管理员</Button>
            </span>
          </Col>
        </Row>
      </div>
      <div class="showtable-area">
        <Table border :columns="columns7" :data="listdata"></Table>
      </div>
      <Row type="flex" justify="center" align="middle" style="margin: 10px 0;">
        <Page :total="total_count" :page-size="10" @on-change="changePage"/>
      </Row>
      <addmanager
        ref="c_addmanager"
        :modal="isShowAddManageModal"
        @clickHide="hideAddManageModal"
        @_sumitAddManage="sumitAddManage"
      ></addmanager>
      <editor
        ref="c_editor"
        :modal="isShowEditorModal"
        :select_list="select_list"
        :oldRoles="oldRoles"
        @clickHide="hideEditorModal"
        @_sumitAddManage="sumiteditor"
      ></editor>
    </Card>
  </div>
</template>

<script>
import axios from "axios";
import { isEmpty } from "../../libs/util.js";
import { Card, Row, Col } from "iview";
import addmanager from "./addmanager.vue";
import editor from "./editor.vue";
export default {
  components: {
    addmanager,
    editor,
    Card,
    Row,
    Col
  },
  computed: {
    select_list() {
      return this.$store.state.role.select_list;
    }
  },
  data() {
    return {
      isShowAddManageModal: false,
      isShowEditorModal: false,
      total_count: 0,
      current_page: 1,
      oldRoles: [],
      rowId: "",
      columns7: [
        {
          title: "用户名",
          key: "username"
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
                      this.isShowEditorModal = true;
                      this.oldRoles = params.row.roles;
                      this.rowId = params.row.id;
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
    async getuserList() {
      let self = this;
      let params = "currentPage=" + this.current_page;
      let res = await this.$store.dispatch("userlist", params);
      let value = res.data;
      if (value.error === 0) {
        if (!isEmpty(value.user_list)) {
          this.listdata = value.user_list;
          this.total_count = value._count;
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
    get_role_selectList() {
      this.$store.dispatch("get_role_selectList");
    },
    //获取分页码
    changePage(val) {
      this.current_page = val;
      this.getuserList();
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    async remove(val) {
      let params = {
        id: val
      };
      let res = await this.$store.dispatch("delete_user", params);
      let value = res.data;
      if (value.error === 0) {
        this.getuserList();
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
    },
    //提交添加管理员
    async sumitAddManage({ userName, password }) {
      let params = {
        username: userName,
        password: password
      };
      let res = await this.$store.dispatch("createUser", params);
      let value = res.data;
      if (value.error === 0) {
        this.getuserList();
        this.$Message.success({
          content: "添加成功",
          duration: 5
        });
      } else {
        console.log(value.message);
        this.$Message.error({
          content: "添加失败！",
          duration: 5
        });
      }
      this.isShowAddManageModal = false;
      this.$refs.c_addmanager.clearFrom(); //清空表单
    },
    //点击取消编辑
    hideEditorModal() {
      this.isShowEditorModal = false;
    },
    async sumiteditor({ roles }) {
      let params = {
        roles,
        id: this.rowId
      };
      let res = await this.$store.dispatch("update_user_role", params);
      let value = res.data;
      if (value.error === 0) {
        this.getuserList();
        this.$Message.success({
          content: "修改成功",
          duration: 5
        });
      } else {
        console.log(value.message);
        this.$Message.error({
          content: "修改失败！",
          duration: 5
        });
      }
      this.isShowEditorModal = false;
    }
  },
  mounted() {
    this.getuserList();
    this.get_role_selectList();
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
</style>