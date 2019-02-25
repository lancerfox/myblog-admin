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
              <Button type="primary" @click="clickroleAdd()">添加角色</Button>
            </span>
          </Col>
        </Row>
      </div>
      <div class="showtable-area">
        <Table border :columns="columns7" :data="datalist"></Table>
      </div>
      <Row type="flex" justify="center" align="middle" style="margin: 10px 0;">
        <Page :total="total_count" :page-size="10" @on-change="changePage"/>
      </Row>
      <!-- 添加角色 -->
      <RoleAdd ref="c_roleAdd" :modal="isShowAddModal" @clickHide="hideAddModal" @_sumit="sumitAdd"></RoleAdd>
      <!-- 编辑角色 -->
      <RoleEditor
        ref="c_roleEditor"
        :modal="isShowEditorModal"
        :oldTitle="roletitle"
        @clickHide="hideEditorModal"
        @_sumit="sumitEditor"
      ></RoleEditor>
      <!-- 角色授权======================== -->
      <Accredit
        ref="c_Accredit"
        :modal="isShowAccreditModal"
        :treeData="treeData"
        @clickHide="hideAccreditModal"
        @_sumit="sumitAccredit"
      ></Accredit>
    </Card>
  </div>
</template>

<script>
import axios from "axios";
import {
  isEmpty,
  deepCopy,
  jsonToArray,
  changeToTreeData
} from "../../libs/util.js";
import { Card, Row, Col } from "iview";
import RoleAdd from "./components/role-add.vue";
import RoleEditor from "./components/role-editor.vue";
import Accredit from "./components/accredit.vue";
/**
 * @description     在数组中筛选权限id并返回
 * @param     {Array}  数组
 * @return    {Array}  权限id
 */
const transformTreeDataA = function(val) {
  let temp = [];
  for (let i = 0; i < val.length; i++) {
    if (val[i].checked === true) {
      temp.push(val[i].id);
    }
  }
  return temp;
};
/**
 * @description     根据角色权限，更数组中的cheaked
 * @param     {Array}  多维数组
 * @param     {Array}  权限数组
 * @return    {Array}  改变后的多维数组
 */
const transformTreeDataB = function(val, power) {
  for (let i = 0; i < val.length; i++) {
    if (power.indexOf(val[i].id) != -1) {
      val[i].checked = true;
    } else {
      val[i].checked = false;
    }
  }
  return val;
};
export default {
  components: {
    Card,
    Row,
    Col,
    RoleAdd,
    RoleEditor,
    Accredit
  },
  computed: {
    datalist() {
      return this.$store.state.role.rolelist;
    },
    //分页总条数
    total_count() {
      return this.$store.state.role.total_count;
    },
    resourcelist() {
      return this.$store.state.resource.resourcelist;
      // return changeToTreeData(
      //   transformTreeDataB(
      //     deepCopy(this.$store.state.resource.resourcelist),
      //     this.power
      //   )
      // );
    }
  },
  data() {
    return {
      isShowAddModal: false, //角色添加
      isShowEditorModal: false, //角色编辑
      isShowAccreditModal: false, //授权
      current_page: 1, //当前页码
      roletitle: "", //角色名称
      rowId: "", //行Id
      powers: [],
      treeData: [],
      columns7: [
        {
          title: "用户名",
          key: "title"
        },
        {
          title: "创建时间",
          key: "createdate"
        },
        {
          title: "操作",
          key: "action",
          width: 250,
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
                      this.clickroleEditor(params);
                    }
                  }
                },
                "编辑"
              ),
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
                      this.clickroleAccredit(params.row);
                    }
                  }
                },
                "授权"
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
      treeDataList: []
    };
  },
  methods: {
    // 获取列表
    getRoleList() {
      let self = this;
      let params = "currentPage=" + this.current_page;
      this.$store.dispatch("get_rolelist", params);
    },
    get_resourcelist() {
      this.$store.dispatch("get_resourcelist");
    },
    //获取分页码
    changePage(val) {
      this.current_page = val;
      this.getuserList();
    },
    //删除
    async remove(val) {
      let params = {
        id: val
      };
      let res = await this.$store.dispatch("delete_role", params);
      let value = res.data;
      if (value.error === 0) {
        this.getRoleList();
        this.$Message.success({
          content: "删除成功",
          duration: 5
        });
      } else {
        console.log(value.message);
        this.$Message.error({
          content: "删除失败！" + value.message,
          duration: 5
        });
      }
      this.$Modal.remove();
    },
    //点击添加角色
    clickroleAdd() {
      this.isShowAddModal = true;
    },
    //提交添加角色
    async sumitAdd({ title }) {
      let params = {
        title
      };
      let res = await this.$store.dispatch("create_role", params);
      let value = res.data;
      if (value.error === 0) {
        this.getRoleList();
        this.$Message.success({
          content: "添加成功",
          duration: 5
        });
      } else {
        this.$Message.error({
          content: "添加失败！" + value.message,
          duration: 5
        });
      }
      this.isShowAddModal = false;
      this.$refs.c_roleAdd.clearFrom(); //清空表单
    },
    //点击取消添加
    hideAddModal() {
      this.isShowAddModal = false;
    },
    //点击编辑角色
    clickroleEditor(val) {
      this.roletitle = val.row.title;
      this.rowId = val.row.id;
      this.isShowEditorModal = true;
    },
    //点击确认编辑
    async sumitEditor({ title }) {
      let params = {
        title,
        id: this.rowId
      };
      let res = await this.$store.dispatch("editor_role", params);
      let value = res.data;
      if (value.error === 0) {
        this.getRoleList();
        this.$Message.success({
          content: "添加成功",
          duration: 5
        });
      } else {
        this.$Message.error({
          content: "添加失败！" + value.message,
          duration: 5
        });
      }
      this.isShowEditorModal = false;
      this.$refs.c_roleEditor.clearFrom(); //清空表单
    },
    //点击取消编辑
    hideEditorModal() {
      this.isShowEditorModal = false;
    },
    //点击角色授权
    clickroleAccredit(val) {
      this.powers = val.powers;
      this.rowId = val.id;
      this.treeData = changeToTreeData(
        transformTreeDataB(
          deepCopy(this.$store.state.resource.resourcelist),
          this.powers
        )
      );
      console.log(this.treeData);
      this.isShowAccreditModal = true;
    },
    //点击确认授权
    async sumitAccredit(data) {
      const arrData = jsonToArray(deepCopy(data));
      console.log(arrData);
      const powers = transformTreeDataA(arrData);
      let params = {
        powers,
        id: this.rowId
      };
      let res = await this.$store.dispatch("updata_power", params);
      let value = res.data;
      if (value.error === 0) {
        this.isShowAccreditModal = false;
        this.getRoleList();
        this.$Message.success({
          content: "添加成功",
          duration: 5
        });
      } else {
        this.$Message.error({
          content: "添加失败！" + value.message,
          duration: 5
        });
      }
    },
    //点击取消编辑
    hideAccreditModal() {
      this.isShowAccreditModal = false;
    }
  },
  mounted() {
    this.getRoleList();
    this.get_resourcelist();
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