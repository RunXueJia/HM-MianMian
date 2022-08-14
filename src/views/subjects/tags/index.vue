<template>
  <el-card>
    <el-row type="flex" justify="space-between">
      <el-form :inline="true" :model="queryData">
        <el-form-item label="标签名称">
          <el-input v-model="queryData.tagName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryData.state" placeholder="请选择活动区域">
            <el-option label="已启用" :value="1"></el-option>
            <el-option label="已禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="eliminate">清除</el-button>
          <el-button type="primary" @click="initData">搜索</el-button>
        </el-form-item>
      </el-form>
      <div>
        <i
          v-if="subjectID"
          class="el-icon-back"
          style="margin-right: 10px"
          @click="$router.back()"
          >返回学科</i
        >
        <el-button type="success" @click="$refs.addTags.showDialog = true"
          ><i class="el-icon-edit" style="margin-right: 15px"></i
          >新增学科</el-button
        >
      </div>
    </el-row>
    <PageTools :text="`一共${counts}条数据`"></PageTools>

    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="subjectName" label="所属学科"> </el-table-column>
      <el-table-column prop="tagName" label="标签名称"> </el-table-column>
      <el-table-column prop="username" label="创建者"> </el-table-column>
      <el-table-column prop="addDate" label="创建日期">
        <template slot-scope="{ row }">
          {{ row.addDate }}
        </template>
      </el-table-column>
      <el-table-column prop="totals" label="面试数量"> </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="{ row }">
          <span>{{ row.state === 0 ? "已禁用" : "已启用" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="switchHandler(row)">{{
            row.state === 1 ? "禁用" : "启用"
          }}</el-button>
          <el-button
            :disabled="row.state === 1"
            type="text"
            size="small"
            @click="editHandler(row.id)"
            >修改</el-button
          >
          <el-button
            :disabled="row.state === 1"
            type="text"
            size="small"
            @click="delHandler(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
    >
    </el-pagination>
    <!-- 弹框 -->、
    <addTags ref="addTags" :subjectID="subjectID" @updateList="initData" />
  </el-card>
</template>

<script>
import {
  getTaglistApi,
  getTagInfoApi,
  delTagApi,
  editTagStateApi,
} from "@/api/myTag";
import addTags from "@/views/subjects/tags/components/add-tags";
export default {
  name: "myTag",
  components: { addTags },
  data() {
    return {
      showDialog: false,
      queryData: {
        page: 1,
        pagesize: 10,
        tagName: "",
      },
      tableData: [],
      counts: 0,
      subjectID: this.$route.query.id,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      // 判断是否有路由携带参数   有 是页面跳转
      if (this.$route.query.id) {
        const cloneQueryData = JSON.parse(JSON.stringify(this.queryData));
        cloneQueryData["subjectID"] = this.subjectID;
        const { counts, items } = await getTaglistApi(cloneQueryData);
        this.tableData = items;
        this.counts = counts;
      } else {
        // 没有参数 正常添加
        const { items, counts } = await getTaglistApi(this.queryData);
        this.tableData = items;
        this.counts = counts;
      }
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
    // 清除
    eliminate() {
      this.queryData = {
        page: 1,
        pagesize: 10,
      };
      this.initData();
    },
    // 启用 禁用切换
    async switchHandler(val) {
      // console.log(val.state);
      val.state === 1 ? (val.state = 0) : (val.state = 1);
      // console.log(val.state);
      await editTagStateApi(val.id, val.state);
      this.$message.success("修改成功！");
    },
    // 编辑  判断携带的参数路由数据  判断是正常页面数据 还是 学科分类的数据
    async editHandler(id) {
      const res = await getTagInfoApi(id);
      this.$refs.addTags.formData = res;
      this.$refs.addTags.showDialog = true;
    },
    // 删除
    // 判断携带的参数路由数据  判断是正常页面数据 还是 学科分类的数据 判断删除的方向
    async delHandler(id) {
      if (this.subjectID) {
        await delTagApi(id);
      } else {
        await this.$confirm("你确定要删除吗");
        await delTagApi(id);
      }
      this.$message.success("删除成功！");
      this.initData();
    },
  },
};
</script>

<style></style>
