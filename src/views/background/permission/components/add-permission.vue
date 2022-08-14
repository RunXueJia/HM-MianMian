<template>
  <el-dialog
    @close="close"
    title="创建权限组"
    :visible.sync="showDialog"
    class="main"
    destroy-on-close
  >
    <el-row type="flex" justify="center">
      <el-form
        ref="form"
        :model="formData"
        :rules="formRules"
        label-width="80px"
        v-if="showDialog"
      >
        <el-form-item label="用户名" prop="title">
          <el-input
            v-model="formData.title"
            placeholder="请输入用户名"
            :style="{ width: '280px' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限分配">
          <el-tree
            :default-checked-keys="permissionId"
            show-checkbox
            node-key="id"
            :data="permissionMenus"
            :props="{ label: 'title' }"
            ref="tree"
            :default-expanded-keys="defaultArr"
          ></el-tree>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row type="flex" justify="end">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPermissionMenus } from "@/api/menus";
import { addPermission, editPermission } from "@/api/permission";
export default {
  name: "AddPerm",
  data() {
    return {
      showDialog: false,
      formData: {
        title: "",
        permissions: null,
      },
      formRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度在3-5之间",
            trigger: "blur",
          },
        ],
      },
      permissionMenus: [
        {
          id: 0,
          title: "系统菜单和页面权限点",
          children: null,
        },
      ],
      permissionId: [],
      roleId: "",
      // 默认展开的节点
      defaultArr: [0],
    };
  },
  created() {
    this.initData();
  },
  computed: {},
  methods: {
    // 初始化数据
    async initData() {
      // 登陆了 获取权限菜单 并处理
      const res = await this.$store.dispatch("background/getPermMenus");
      // console.log(res);
      this.permissionMenus[0].children = res;
    },

    // 关闭弹框
    close() {
      this.permissionId = [];
      this.formData = {};
      this.showDialog = false;
    },
    async btnOk() {
      // 判断当前是否有勾选
      const permIds = this.$refs.tree.getCheckedKeys();

      //   const params = [this.permissions.toString()];
      //   console.log(params);
      //   console.log(permissions);
      if (permIds.length === 0) return this.$message.error("请勾选");
      //  判断是修改还是添加
      if (this.roleId) {
        await editPermission({
          title: this.formData.title,
          id: this.roleId,
          permissions: permIds,
        });
      } else {
        await addPermission({
          title: this.formData.title,
          permissions: permIds,
        });
      }

      this.$message.success("操作成功");
      this.showDialog = false;
      this.$emit("updateList");
    },
  },
// 监听权限角色的变化
  watch: {
    permissionMenus() {
      this.initData();
    },
  },
};
</script>

<style scoped lang="less">
.main {
  /deep/ .el-dialog__header {
    background-color: #409eff;
    .el-dialog__title,
    .el-icon-close {
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>
