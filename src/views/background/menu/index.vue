<template>
  <div>
    <el-card class="main">
      <!-- 操作区域 -->
      <el-row type="flex" justify="end">
        <el-button
          size="small"
          icon="el-icon-edit"
          type="primary"
          @click="addHandler"
          >添加</el-button
        >
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="list"
        style="width: 100%"
        row-key="id"
        default-expand-all
      >
        <el-table-column prop="title" label="标题" width="180px">
          <template slot-scope="{ row }">
            <i
              class="el-icon-folder-opened"
              v-if="firstId.includes(row.id)"
              style="margin-right: 10px; font-size: 20px"
            ></i>
            <i
              class="el-icon-document"
              v-if="secondId.includes(row.id)"
              style="margin-right: 10px; font-size: 20px"
            ></i>
            <i
              class="el-icon-view"
              v-if="thirdId.includes(row.id)"
              style="margin-right: 10px; font-size: 20px"
            ></i>
            &nbsp;&nbsp;
            {{ row.title }}
          </template>
        </el-table-column>

        <el-table-column prop="code" label="权限点代码"></el-table-column>

        <el-table-column label="操作" width="180px">
          <template slot-scope="{ row }">
            <el-button
              size="mini"
              style="width: 60px; padding: 7px 0px"
              type="primary"
              icon="el-icon-edit"
              @click="editHandler(row.id)"
              >修改</el-button
            >
            <el-button
              size="mini"
              style="width: 60px; padding: 7px 0px"
              icon="el-icon-delete"
              type="danger"
              @click="delHandler(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- -----添加、修改弹框--------- -->
    <AddMenu ref="addMenu" @updateList="initData" :thirdId="thirdId" />
  </div>
</template>

<script>
import AddMenu from "./components/add-menu.vue";
import { delPermissionMenus, getPermissionInfo } from "@/api/menus";
export default {
  name: "BgMenus",
  components: { AddMenu },
  data() {
    return {
      list: [],
      firstId: [],
      secondId: [],
      thirdId: [],
    };
  },
  created() {
    this.initData();
  },
  computed: {},
  methods: {
    // 获取权限数据列表
    async initData() {
      // 调用store里面的方法
      const data = await this.$store.dispatch("background/getPermMenus");
      // console.log(res);
      this.list = data;
      // 一级权限的id
      this.firstId = this.list.map((item) => item.id);

      // 二级权限的id
      this.list.forEach((item) => {
        item.children?.forEach((val) => this.secondId.push(val.id));
      });

      // 三级权限
      this.list.forEach((item) => {
        item.children?.forEach((val) => {
          const arr = val.children?.map((key) => key.id);
          if (arr) {
            this.thirdId.push(...arr);
          }
        });
      });
    },
    // 删除
    async delHandler(id) {
      await this.$confirm("确定删除吗？");
      await delPermissionMenus(id);
      this.initData();
    },

    // 修改
    async editHandler(id) {
      const res = await getPermissionInfo(id);
      // console.log(res);
      this.$refs.addMenu.showDialog = true;
      this.$refs.addMenu.formData = res;
      this.$refs.addMenu.pidArr = res.id;
      this.$refs.addMenu.RadioType = true;
      this.initData();
    },

    // 添加
    async addHandler() {
      // 获取权限数据
      const data = await this.$store.dispatch("background/getPermMenus");
      // 打开弹框渲染赋值
      this.$refs.addMenu.pidOptions[0].children = data;
      this.$refs.addMenu.showDialog = true;
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
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  /deep/ .el-table__expand-icon {
    display: none !important;
  }
  /deep/ .el-table__placeholder {
    display: none;
  }
}
</style>
