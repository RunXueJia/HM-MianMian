<template>
  <el-dialog
    class="main"
    :title="formData.id ? '修改标签' : '新增标签'"
    :visible.sync="showDialog"
    width="400px"
    @close="close"
  >
    <el-form :model="formData" label-width="80px" :rules="formRules">
      <el-form-item v-if="!subjectID" label="所属学科">
        <el-select v-model="formData.subjectID" placeholder="请选择活动区域">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签名称" prop="tagName">
        <el-input v-model="formData.tagName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-button size="small" @click="showDialog = false">取消</el-button>
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { getSimpleSubjectApi } from "@/api/mySubject";
import { addTagApi, editTagApi } from "@/api/myTag";
export default {
  name: "AddTags",
  props: {
    subjectID: {
      type: [String, Number],
    },
  },
  data() {
    return {
      showDialog: false,
      options: [],
      formData: {
        subjectID: "",
        tagName: "",
      },
      formRules: {},
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      // 获取所属学科的信息
      const res = await getSimpleSubjectApi();
      this.options = res;
    },
    async btnOk() {
      // 判断 修改状态和 添加状态
      if (this.formData.id) {
        // 修改状态
        await editTagApi(this.formData);
        this.$message.success("修改成功！");
      } else {
        // 判断是本页面添加 还是页面跳转添加
        if (this.subjectID) {
          const cloneFormData = JSON.parse(JSON.stringify(this.formData));
          cloneFormData.subjectID = this.subjectID;
          await addTagApi(cloneFormData);
        } else {
          await addTagApi(this.formData);
        }
        this.$message.success("添加成功！");
      }
      this.showDialog = false;
      this.$emit("updateList");
    },
    // 弹框关闭清空
    close() {
      this.formData = {};
      this.showDialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  ::v-deep .el-dialog__header {
    background-color: #409eff;
    .el-dialog__title,
    .el-icon-close {
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>
