<template>
  <div class="main">
    <el-dialog
      @close="close"
      destroy-on-close
      :title="RadioType ? '修改菜单' : '创建菜单'"
      :visible.sync="showDialog"
    >
      <el-row type="flex" justify="center">
        <el-form
          ref="form"
          :model="formData"
          :rules="formRules"
          size="medium"
          label-width="100px"
        >
          <el-form-item label="权限组名称">
            <template>
              <el-radio
                :disabled="RadioType"
                v-model="formData.is_point"
                :label="false"
                >菜单</el-radio
              >
              <el-radio
                :disabled="RadioType"
                v-model="formData.is_point"
                :label="true"
                >权限点</el-radio
              >
            </template>
          </el-form-item>
          <el-form-item label="权限组名称">
            <el-cascader
              v-model="pidArr"
              :options="pidOptions"
              :props="{ label: 'title', value: 'id', checkStrictly: true }"
              :show-all-levels="false"
              ref="cascader"
              @change="changeHandler"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="权限代码" prop="code">
            <el-input
              v-model="formData.code"
              placeholder="请输入权限代码"
              :style="{ width: '280px' }"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限标题" prop="title">
            <el-input
              v-model="formData.title"
              placeholder="请输入权限标题"
              clearable
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
import { addPermissionMenus, editPermissionInfo } from "@/api/menus";
export default {
  name: "AddMenu",
  props: {
    thirdId: {
      type: Array,
    },
  },
  data() {
    return {
      showDialog: false,
      formData: {
        is_point: false,
        pid: "0",
        code: undefined,
        title: "",
      },
      // 层级选择器会把当前项及其前置的选项的id一起保存到变量里
      pidArr: ["0"],
      RadioType: false,
      formRules: {
        code: [
          {
            required: true,
            message: "请输入权限代码",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入权限标题",
            trigger: "blur",
          },
        ],
      },
      // 权限列表
      pidOptions: [{ title: "主导航", id: "0", pid: "0", children: null }],
      disabledId: [0],
      flag: "",
    };
  },
  created() {
    this.initData();
    this.changeHandler();
  },

  methods: {
    async initData() {
      // 获取权限菜单数据
      const res = await this.$store.dispatch("background/getPermMenus");
      this.pidOptions[0].children = res;
      // 获取一级的id
      const arr = res.map((item) => item.id);
      // 一级的id是不可以选中的id 用来判断
      this.disabledId.push(...arr);
    },

    // 权限组改变的时候触发
    changeHandler() {
      // 给pid赋值
      this.formData.pid = this.pidArr[this.pidArr.length - 1] * 1;
      // 判断不可选中的id是否包括当前的爬pid
      this.flag = this.disabledId.includes(this.formData.pid);
    },
    async btnOk() {
      // 提交的时候触发判断
      if (this.formData.is_point && this.flag)
        return this.$message.warning("权限点不能挂在菜单项上!");
      if (!this.formData.is_point && !this.flag)
        return this.$message.warning("菜单项不能挂在权限点上!");
      if (this.thirdId.includes(this.formData.pid))
        return this.$message.warning("权限点上无法挂载！");
      // 提交和修改
      try {
        if (this.RadioType) {
          await editPermissionInfo(this.formData);
        } else {
          await addPermissionMenus(this.formData);
        }
      } catch (error) {
        console.log(error);
      }

      this.$message.success("操作成功");
      this.showDialog = false;
      this.$emit("updateList");
    },

    // 弹框关闭触发
    close() {
      this.formData = {
        is_point: false,
        pid: "",
        code: undefined,
        title: "",
      };

      this.pidArr = ["0"];
      this.RadioType = false;
      this.showDialog = false;
    },
  },
  watch: {
    pidOptions() {
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
  .el-dropdown-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 0 8px;
    // display: inline-block;
    width: 280px;
    border: 1px solid #ccc;
    cursor: pointer;
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>
