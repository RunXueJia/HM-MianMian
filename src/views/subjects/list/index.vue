<template>
  <el-card class="mySubject">
    <el-row type="flex" justify="space-between">
      <el-form :inline="true" :model="queryData">
        <el-form-item label="学科名称">
          <el-input
            v-model="queryData.subjectName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="eliminate">清除</el-button>
          <el-button type="primary" @click="initData">搜索</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="success" @click="showDialog = true">
          <i class="el-icon-edit" style="margin-right: 15px"></i>新增学科
        </el-button>
      </div>
    </el-row>
    <PageTools :text="`一共${counts}条数据`"></PageTools>
    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="subjectName" label="学科名称"></el-table-column>
      <el-table-column prop="username" label="创建者"></el-table-column>
      <el-table-column prop="addDate" label="创建日期">
        <template slot-scope="{ row }">
          <span>{{ row.addDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="isFrontDisplay"
        label="前台是否显示"
      ></el-table-column>
      <el-table-column
        prop="twoLevelDirectory"
        label="二级目录"
      ></el-table-column>
      <el-table-column prop="tags" label="标签"></el-table-column>
      <el-table-column prop="totals" label="题目数量"></el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            @click="
              $router.push({
                path: '/subjects/directorys',
                query: { id: row.id },
              })
            "
            >学科分类</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="
              $router.push({ path: '/subjects/tags', query: { id: row.id } })
            "
            >学科标签</el-button
          >
          <el-button type="text" size="small" @click="editHandler(row.id)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="delHandler(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹框 -->
    <el-dialog
      class="main"
      title="新增学科"
      :visible.sync="showDialog"
      width="400px"
      @close="close"
    >
      <el-form
        :model="formData"
        label-width="80px"
        :rules="formRules"
        ref="form"
      >
        <el-form-item label="学科名称" prop="subjectName">
          <el-input
            style="width: 200px"
            v-model="formData.subjectName"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            v-model="formData.isFrontDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-button size="small" @click="showDialog = false">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryData.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="counts"
    ></el-pagination>
  </el-card>
</template>

<script>
import {
  getSubjectApi,
  addSubjectApi,
  getSubjectInfoApi,
  editSubjectApi,
  delSubjectApi,
} from "@/api/mySubject";
export default {
  name: "mySubject",
  data() {
    return {
      showDialog: false,
      queryData: {
        page: 1,
        pagesize: 10,
        subjectName: "",
      },
      tableData: [],
      formData: {
        subjectName: "",
        isFrontDisplay: 1,
      },
      formRules: {
        subjectName: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      counts: 0,
    };
  },
  created() {
    // 初始化 并渲染
    this.initData();
  },
  methods: {
    async initData() {
      // 获取页面数据
      const { counts, items } = await getSubjectApi(this.queryData);
      this.counts = counts;
      this.tableData = items;
    },
    // 清除
    eliminate() {
      this.queryData.subjectName = "";
      this.initData();
    },
    // 每页条数
    handleSizeChange(val) {
      this.queryData.pagesize = val;
      this.initData();
    },
    // 当前页
    handleCurrentChange(val) {
      this.queryData.page = val;
      this.initData();
    },
    // 添加
    async btnOk() {
      // 校验
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      // formData.id  有 是编辑状态 无正常添加状态
      if (this.formData.id) {
        await editSubjectApi(this.formData);
        this.$message.success("修改成功！");
      } else {
        await addSubjectApi(this.formData);
        this.$message.success("添加成功！");
      }
      this.showDialog = false;
      this.initData();
    },
    // 点击编辑 获取数据 并且回显
    async editHandler(id) {
      const res = await getSubjectInfoApi(id);
      this.formData = res;
      this.showDialog = true;
    },
    // 删除
    async delHandler(id) {
      // console.log(id);
      await this.$confirm("你确定要删除吗？");
      await delSubjectApi(id);
      this.$message.success("删除成功！");
      this.initData();
    },
    // 关闭弹框 清空数据
    close() {
      this.formData = {
        subjectName: "",
        isFrontDisplay: 1,
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
