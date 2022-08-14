<template>
  <div>
    <el-card class="main">
      <!-- -------操作区域------- -->
      <el-row type="flex" justify="space-between">
        <div>
          <el-input
            style="width: 300px; margin-right: 20px"
            v-model="queryData.username"
            placeholder="请输入用户名"
          ></el-input>
          <el-button size="small" plain @click="clearHandler">清空</el-button>
          <el-button
            size="small"
            type="primary"
            plain
            @click="initData"
            :disabled="!checkPermPoints('base-users-search')"
            >搜索</el-button
          >
        </div>
        <el-button
          size="medium"
          icon="el-icon-edit"
          type="success"
          @click="$refs.addUser.showDialog = true"
          :disabled="!checkPermPoints('base-users-add')"
          >新增用户</el-button
        >
      </el-row>
      <!-- -------信息栏--------- -->
      <PageTools class="table" :text="`共${total}条记录`" />
      <!-- -----表格------ -->
      <el-table stripe :data="list" border style="width: 100%">
        <el-table-column align="center" prop="id" label="序号" width="180">
        </el-table-column>
        <el-table-column align="center" prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column align="center" prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column align="center" prop="username" label="用户名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="permission_group_title"
          label="权限组名称"
        >
        </el-table-column>
        <el-table-column align="center" prop="role" label="角色">
        </el-table-column>
        <el-table-column align="center" prop="describe" label="操作">
          <template slot-scope="{ row }">
            <el-button
              circle
              type="primary"
              plain
              icon="el-icon-edit"
              @click="editHandler(row.id)"
            ></el-button>
            <el-button
              v-if="row.id !== 2"
              circle
              icon="el-icon-delete"
              type="danger"
              plain
              @click="delHandler(row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- ------分页-------- -->
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
          :disabled="!checkPermPoints('base-users-paging')"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- -----添加、修改弹框--------- -->
    <AddUser ref="addUser" @updateList="initData" />
  </div>
</template>

<script>
import { getBgUserList, getBgUserInfo, delBgUser } from "@/api/bg-user";
import AddUser from "./components/add-user.vue";
export default {
  name: "BgUser",
  components: { AddUser },
  data() {
    return {
      list: [],
      queryData: {
        page: 1,
        pagesize: 10,
        username: "",
        disabled: 0,
      },
      total: 0,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    // 改变每页显示的条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryData.pagesize = val;
      this.initData();
    },
    // 改变当前页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryData.page = val;
      this.initData();
    },
    // 初始化数据
    async initData() {
      try {
        const { list, counts } = await getBgUserList(this.queryData);
        // console.log(counts);
        this.list = list;
        this.total = counts;
      } catch (error) {
        return console.log(error);
      }
    },
    // 重置功能
    clearHandler() {
      this.queryData.username = "";
      this.initData();
    },
    // 修改
    async editHandler(id) {
      try {
        const res = await getBgUserInfo(id);
        // console.log(res);
        this.$refs.addUser.showDialog = true;
        this.$refs.addUser.formData = res;
        // 调用获取权限角色的函数
        this.$refs.addUser.focus()
      } catch (error) {
        return console.log(error);
      }
    },

    // 删除
    async delHandler(id) {
      await this.$confirm("确认删除吗？");
      await delBgUser(id);
      this.$message.success("删除成功");
      this.initData();
    },
  },
};
</script>

<style scoped lang="less">
.main {
  margin: 15px;
  .table {
    margin-top: 15px;
    margin-bottom: 10px;
  }
}
</style>
