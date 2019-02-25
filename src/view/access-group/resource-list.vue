<template>
  <div class="manager-list">
    <Card>
      <div class="operating-area">
        <Row>
          <Col span="6"></Col>
          <Col span="6">
            <span style="margin:0 10px;">
              <Button class="myaddmanager" type="primary" @click="clickAdd()">添加资源</Button>
            </span>
          </Col>
        </Row>
        <Tree :data="resourcelist" :render="renderContent"></Tree>
      </div>
      <Add ref="c_add" :modal="isShowAddModal" @clickHide="hideAddModal" @_sumitAdd="sumitAdd"></Add>
      <Editor
        ref="c_editor"
        :modal="isShowEditorModal"
        :title="menutitle"
        :path="menupath"
        @clickHide="hideEditorModal"
        @_sumit="sumitEditor"
      ></Editor>
    </Card>
  </div>
</template>
<script>
import axios from "axios";
import { isEmpty, changeToTreeData, deepCopy } from "../../libs/util.js";
import { Card, Row, Col } from "iview";
import Add from "./components/resource-add";
import Editor from "./components/resource-editor";
export default {
  components: {
    Card,
    Row,
    Col,
    Add,
    Editor
  },
  computed: {
    resourcelist() {
      return changeToTreeData(
        deepCopy(this.$store.state.resource.resourcelist)
      );
    }
  },
  data() {
    return {
      buttonProps: {
        type: "default",
        size: "small"
      },
      isShowAddModal: false,
      isShowEditorModal: false,
      menutitle: "",
      rowId: "",
      menupath: ""
    };
  },
  methods: {
    //获取列表
    get_resourcelist() {
      this.$store.dispatch("get_resourcelist");
    },
    clickAdd() {
      this.isShowAddModal = true;
      this.type = 1;
      this.parentId = 0;
    },
    //点击确认添加
    sumitAdd({ title, path }) {
      this.append(title, path);
    },
    //点击取消添加
    hideAddModal() {
      this.isShowAddModal = false;
    },
    //点击编辑
    clickeditor(val) {
      this.menutitle = val.title;
      this.menupath = val.path;
      this.rowId = val.id;
      this.isShowEditorModal = true;
    },
    //点击取消编辑
    hideEditorModal() {
      this.isShowEditorModal = false;
    },
    //点击确认编辑
    async sumitEditor({ title }) {
      let params = {
        title,
        id: this.rowId
      };
      let res = await this.$store.dispatch("updata_resource", params);
      let value = res.data;
      if (value.error === 0) {
        this.get_resourcelist();
        this.$Message.success({
          content: "修改成功",
          duration: 5
        });
        this.$refs.c_editor.clearFrom(); //清空表单
      } else {
        this.$Message.error({
          content: "修改失败！" + value.message,
          duration: 5
        });
      }
      this.isShowEditorModal = false;
    },
    renderContent(h, { root, node, data }) {
      if (data.type === 1) {
        return h(
          "span",
          {
            style: {
              display: "inline-block",
              width: "100%"
            }
          },
          [
            h("span", [h("span", data.title)]),
            h(
              "span",
              {
                style: {
                  display: "inline-block",
                  float: "right",
                  marginRight: "32px"
                }
              },
              [
                h("Button", {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-create-outline"
                  }),
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.clickeditor(data);
                    }
                  }
                }),
                h("Button", {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-add"
                  }),
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.isShowAddModal = true;
                      this.type = 2;
                      this.parentId = data.id;
                    }
                  }
                }),
                h("Button", {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-remove"
                  }),
                  on: {
                    click: () => {
                      this.remove(root, node, data);
                    }
                  }
                })
              ]
            )
          ]
        );
      } else if (data.type === 2) {
        return h(
          "span",
          {
            style: {
              display: "inline-block",
              width: "100%"
            }
          },
          [
            h("span", [h("span", data.title)]),
            h(
              "span",
              {
                style: {
                  display: "inline-block",
                  float: "right",
                  marginRight: "32px"
                }
              },
              [
                h("Button", {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-create-outline"
                  }),
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.clickeditor(data);
                    }
                  }
                }),
                h("Button", {
                  props: Object.assign({}, this.buttonProps, {
                    icon: "ios-remove"
                  }),
                  on: {
                    click: () => {
                      this.remove(root, node, data);
                    }
                  }
                })
              ]
            )
          ]
        );
      }
    },
    //保存添加
    async append(title, path) {
      let params = {
        title,
        type: this.type,
        parentId: this.parentId,
        path
      };
      let res = await this.$store.dispatch("create_resource", params);
      let value = res.data;
      if (value.error === 0) {
        this.get_resourcelist();
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
      this.$refs.c_add.clearFrom(); //清空表单
    },
    //删除
    async remove(root, node, data) {
      let params = {
        id: data.id
      };
      let res = await this.$store.dispatch("delete_resource", params);
      let value = res.data;
      if (value.error === 0) {
        this.get_resourcelist();
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
    }
  },
  mounted() {
    this.get_resourcelist();
  }
};
</script>