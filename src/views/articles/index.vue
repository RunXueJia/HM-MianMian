
<template>
  <el-card>
    <el-row type="flex" justify="space-between">
      <el-form :inline="true" :model="queryData">
        <el-form-item label="标签名称">
          <el-input v-model="queryData.keyword" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryData.state" placeholder="请选择活动区域">
            <el-option label="已启用" :value="1"></el-option>
            <el-option label="已禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetHandler">清除</el-button>
          <el-button type="primary" @click="initData">搜索</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="success" @click="$refs.addArticle.showDialog = true"
          ><i class="el-icon-edit" style="margin-right: 15px"></i
          >新增学科</el-button
        >
      </div>
    </el-row>
    <el-alert
      :title="'数据一共' + counts + '条'"
      type="info"
      show-icon
      :closable="false"
    />

    <!-- 列表 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="title" label="文章标题">
        <template slot-scope="{ row }"
          >{{ row.title
          }}<i
            v-if="row.videoURL"
            class="el-icon-film"
            @click="videoHandler(row)"
          ></i
        ></template>
      </el-table-column>
      <el-table-column prop="visits" label="阅读数"> </el-table-column>
      <el-table-column prop="username" label="录入人"> </el-table-column>
      <el-table-column prop="createTime" label="录入时间">
        <template slot-scope="{ row }">
          {{ row.createTime | format }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="{ row }">
          <span>{{ row.state === 0 ? "已禁用" : "已启用" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="preview(row)"
            >预览</el-button
          >
          <el-button @click="switchHandler(row)" type="text" size="small">{{
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
            @click="delHandler(row.id)"
            :disabled="row.state === 1"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
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

    <!-- 弹框添加-->
    <addArticle ref="addArticle" @updateList="initData" />

    <!-- 弹框预览 -->
    <preview ref="preview" />
    <videoDialog ref="videos" />
  </el-card>
</template>

<script>
import {
  getArticleslistApi,
  getArticlesInfoApi,
  delArticlesApi,
  editArticlesStateApi,
} from "@/api/articles";
import addArticle from "@/views/articles/components/add-article";
import preview from "@/views/articles/components/preview";
import videoDialog from "@/views/articles/components/videoDialog";
export default {
  name: "myInterview",
  components: { addArticle, preview, videoDialog },
  data() {
    return {
      queryData: {
        page: 1,
        pagesize: 10,
        keyword: "",
      },
      tableData: [],
      counts: 0,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { counts, items } = await getArticleslistApi(this.queryData);
      this.counts = counts;
      this.tableData = items;
    },
    // 每页条数
    handleSizeChange(val) {
      this.queryData.pagesize = val;
      this.initData();
    },
    // 当前页
    handleCurrentChange(val) {
      // console.log(val);
      this.queryData.page = val;
      this.initData();
    },
    // 重置
    resetHandler() {
      this.queryData = {
        page: 1,
        pagesize: 10,
        keyword: "",
      };
      this.initData();
    },
    // 预览
    async preview(val) {
      const res = await getArticlesInfoApi(val.id);
      // console.log(res);
      this.$refs.preview.formData = res;
      this.$refs.preview.formData.articleBody = res.articleBody;
      this.$refs.preview.username = val.username;
      this.$refs.preview.showDialog = true;
    },
    // 改变状态
    async switchHandler(val) {
      console.log(val);
      val.state === 1 ? (val.state = 0) : (val.state = 1);
      await editArticlesStateApi(val.id, val.state);
      this.$message.success("修改成功！");
    },
    // 修改
    async editHandler(id) {
      const res = await getArticlesInfoApi(id);
      this.$refs.addArticle.formData = res;
      this.$refs.addArticle.showDialog = true;
    },
    // 删除
    async delHandler(id) {
      await this.$confirm("你确定要删除吗");
      await delArticlesApi(id);
      this.$message.success("删除成功！");
      if (this.queryData.page !== 1 && this.list.length === 1) {
        this.queryData.page--;
      }
      this.initData();
    },
    // 视频
    videoHandler(val) {
      // console.log(val);
      this.$refs.videos.isShow = true;
      this.$refs.videos.playVideo(val);
    },
  },
};
</script>

<style></style>


