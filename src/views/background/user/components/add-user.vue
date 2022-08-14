<template>
  <div class="main">
    <!-- <div> -->
    <el-dialog
      destroy-on-close
      :title="this.formData.id ? '修改用户' : '创建用户'"
      :visible.sync="showDialog"
      @close="close"
    >
      <el-row type="flex" justify="center">
        <el-form
          ref="form"
          :model="formData"
          :rules="formRules"
          size="medium"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="formData.username"
              placeholder="请输入用户名"
              :style="{ width: '280px' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="formData.email"
              placeholder="请输入邮箱"
              :style="{ width: '280px' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" v-if="!formData.id">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
              :style="{ width: '280px' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="角色" prop="role">
            <el-input
              v-model="formData.role"
              placeholder="请输入角色"
              :style="{ width: '280px' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="权限组名称" prop="permission_group_id">
            <el-select
              v-model="formData.permission_group_id"
              placeholder="请选择权限组名称"
              filterable
              :style="{ width: '280px' }"
              @focus="focusHandler"
            >
              <el-option
                v-for="item in permissionList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="联系电话" prop="phone">
            <el-input
              v-model="formData.phone"
              placeholder="请输入联系电话"
              :style="{ width: '280px' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="介绍" prop="introduction">
            <el-input
              v-model="formData.introduction"
              type="textarea"
              placeholder="请输入介绍"
              :autosize="{ minRows: 2, maxRows: 4 }"
              :style="{ width: '280px' }"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button size="small" @click="close">取消</el-button>
        <el-button size="small" type="primary" @click="btnOk">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { addBgUser, editBgUserInfo } from "@/api/bg-user";
import { getPermissionList } from "@/api/permission";
export default {
  name: "AddUser",
  data() {
    return {
      showDialog: false,
      formData: {
        username: undefined,
        email: undefined,
        password: undefined,
        role: undefined,
        permission_group_id: undefined,
        phone: undefined,
        introduction: undefined,
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
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            min: 5,
            max: 10,
            message: "长度在5-16之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        role: [
          {
            required: true,
            message: "请输入角色",
            trigger: "blur",
          },
        ],
        permission_group_id: [
          {
            required: true,
            message: "请选择权限组名称",
            trigger: "change",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
          },
        ],
        introduction: [
          {
            required: true,
            message: "请输入介绍",
            trigger: "blur",
          },
        ],
      },
      // 权限角色列表
      permissionList: [],
      queryData: {
        page: 1,
        pagesize: 10,
        title: "",
      },
    };
  },

  methods: {
    close() {
      this.formData = {};
      this.showDialog = false;
      this.permissionList = [];
    },
    async btnOk() {
      try {
        // 表单校验
        await this.$refs.form.validate();
        // 判断是提交还是修改
        if (this.formData.id) {
          await editBgUserInfo(this.formData);
          console.log(1111);
        } else {
          await addBgUser(this.formData);
          // console.log(222);
        }
      } catch (error) {
        return console.log(error);
      }

      this.$message.success("操作成功");
      this.showDialog = false;
      this.$emit("updateList");
    },
    // 使用递归获取角色列表
    async focus() {
      try {
        const { list, counts } = await getPermissionList(this.queryData);
        // console.log(res);
        this.permissionList.push(...list);
        // 递归判断条件 
        if (list.length <= counts && list.length === 10) {
          this.queryData.page++;
          this.focus();
        }
      } catch (error) {
        return console.log(error);
      }
    },
    // blur() {
    // 	this.permissionList = [];
    // },
    // 下拉选择框获取焦点的时候 触发获取角色列表函数
    focusHandler() {
      // 获取前先清除列表 不然会重复数据
      this.permissionList = [];
      this.focus();
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
