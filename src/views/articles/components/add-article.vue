<template>
  <el-dialog
    class="main"
    :title="formData.id ? '修改文章' : '添加文章'"
    :visible.sync="showDialog"
    @close="close"
  >
    <el-form :model="formData" label-width="80px" :rules="formRules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="articleBody">
        <vue-editor v-model="formData.articleBody"></vue-editor>
      </el-form-item>
      <el-form-item label="视频地址">
        <el-input
          v-model.trim="formData.videoURL"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-button size="small" @click="showDialog = false">取消</el-button>
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { addArticlesApi, editArticlesApi } from "@/api/articles";
export default {
  name: "AddArticle",
  components: {
    VueEditor,
  },
  data() {
    return {
      showDialog: false,
      formData: {
        articleBody: "",
        title: "",
        videoURL: "",
      },
      formRules: {
        articleBody: [{ required: true, message: "请输入", trigger: "blur" }],
        title: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    async btnOk() {
      if (this.formData.id) {
        await editArticlesApi(this.formData);
        this.$message.success("修改成功！");
      } else {
        await addArticlesApi(this.formData);
        this.$message.success("添加成功！");
      }

      this.showDialog = false;
      this.$emit("updateList");
    },
    close() {
      this.formData = {
        articleBody: "",
        title: "",
        videoURL: "",
      };
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
