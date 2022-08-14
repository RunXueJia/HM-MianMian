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
          <el-button size="small" type="primary" plain @click="initData"
            >搜索</el-button
          >
        </div>
        <el-button
          size="medium"
          icon="el-icon-edit"
          type="success"
          @click="$refs.addPerm.showDialog = true"
          >新增权限组</el-button
        >
      </el-row>
      <!-- -------信息栏--------- -->
      <PageTools class="table" :text="`共${total}条记录`" />
      <!-- -----表格------ -->
      <el-table stripe :data="permissionList" border style="width: 100%">
        <el-table-column type="selection" width="180"> </el-table-column>

        <el-table-column align="center" prop="title" label="用户名">
        </el-table-column>

        <el-table-column
          align="center"
          prop="update_date"
          label="日期"
          sortable
        >
          <template slot-scope="{ row }">
            {{ row.update_date | relativeTime }}
          </template>
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
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- -----添加、修改弹框--------- -->
    <AddPerm ref="addPerm" @updateList="initData" />
  </div>
</template>

<script>
// import { getBgUserInfo } from "@/api/bg-user";
import {
  getPermissionList,
  delPermission,
  getPermissionInfo,
} from "@/api/permission";
import dayjs from "@/utils/day";
import AddPerm from "./components/add-permission.vue";
export default {
  name: "MyPermission",
  components: { AddPerm },
  data() {
    return {
      list: [],
      queryData: {
        page: 1,
        pagesize: 10,
        title: "",
      },
      total: 0,
      permissionList: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    // 切换每页页数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryData.pagesize = val;
      this.initData();
    },
    // 切换页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryData.page = val;
      this.initData();
    },

    // 获取权限角色初始数据
    async initData() {
      try {
        const { list, counts } = await getPermissionList(this.queryData);
        // console.log(res);
        this.permissionList = list;
        this.total = counts;
      } catch (error) {
        return console.log(error);
      }
    },

    // 搜索功能的重置
    clearHandler() {
      this.queryData.username = "";
      this.initData();
    },

    // 修改
    async editHandler(id) {
      try {
        // 获取当前角色的详细信息
        const { permissions, title } = await getPermissionInfo(id);
        // console.log(res);
        // 打开弹框
        this.$refs.addPerm.showDialog = true;
        // 渲染权限的id
        this.$refs.addPerm.permissionId = permissions;

        this.$refs.addPerm.formData.title = title;
        this.$refs.addPerm.roleId = id;
      } catch (error) {
        return console.log(error);
      }
    },
    async delHandler(id) {
      await this.$confirm("确认删除吗？");
      await delPermission(id);
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
