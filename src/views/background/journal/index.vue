<template>
  <div>
    <el-card class="main">
      <PageTools :text="`共${total}条记录`" />
      <el-table class="table" stripe :data="list" border style="width: 100%">
        <el-table-column prop="type" label="操作类型" width="180">
        </el-table-column>
        <el-table-column prop="name" label="操作人" width="180">
        </el-table-column>
        <el-table-column prop="result" label="执行结果"> </el-table-column>
        <el-table-column prop="create_time" label="操作时间"> </el-table-column>
        <el-table-column prop="describe" label="描述"> </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryData.page"
          :page-sizes="[10, 4, 8]"
          :page-size="queryData.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyJournal",
  data() {
    return {
      list: [],
      queryData: {
        page: 1,
        pagesize: 10,
      },
      total: 0,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryData.pagesize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryData.page = val;
      this.initData();
    },
    // 获取mock数据
    initData() {
      axios({
        url: "/vue-admin-template/journal",
        method: "get",
        params: {
          page: this.queryData.page,
          pagesize:this.queryData.pagesize
        },
      }).then(({ data }) => {
        // 赋值
        console.log(data);
        this.list = data.data.list;
        this.total = data.data.total;
      });
    },
  },
};
</script>

<style scoped lang="less">
.main {
  margin: 15px;
  .table {
    margin-top: 5px;
  }
}
</style>
