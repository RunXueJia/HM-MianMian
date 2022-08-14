<template>
  <el-dialog title="预览文章" :visible.sync="showDialog">
    <h1>{{ formData.title }}</h1>
    <div>
      <span style="margin-right: 10px">{{
        formData.createTime | format
      }}</span>
      <span style="margin-right: 10px">{{ username }}</span>
      <span
        ><i class="el-icon-view" style="margin-right: 10px"></i
        >{{ formData.visits }}</span
      >
    </div>
    <div class="contain" v-html="formData.articleBody"></div>
  </el-dialog>
</template>

<script>
export default {
  name: "preview",
  data() {
    return {
      showDialog: false,
      formData: {},
      username: "",
    };
  },
  // watch: {
  //   formData: {
  //     handler: function () {
  //       var objE = document.createElement("div");
  //       objE.innerHTML = this.formData.articleBody;
  //       console.log(this.formData.articleBody);
  //       console.log(objE);
  //     },
  //     // immediate,
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.contain {
  width: 100%;
  min-height: 100px;
  padding-top: 10px;
  margin-top: 8px;
  background-color: #f5f5f5;
  font-size: 22px;
}
</style>
