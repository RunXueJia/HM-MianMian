<template>
  <div class>
    <el-card style="margin: 10px">
      <!-- 头部搜索区域 -->
      <el-form :inline="true" style="width: 823px" label-width="110px">
        <el-form-item label="标签名称">
          <el-input
            v-model="queryData.tags"
            placeholder="请输入内容"
            size="small"
            style="width: 326px"
          ></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <!-- <el-input
            v-model="queryData.city"
            placeholder="请选择"
            size="small"
            style="width: 326px"
					></el-input>-->
          <el-select
            clearable
            v-model="queryData.province"
            placeholder="请选择"
            @change="changeFn2"
          >
            <el-option
              v-for="(item, index) in provincesList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区">
          <!-- <el-input
            v-model="queryData.province"
            placeholder="请选择"
            size="small"
            style="width: 326px"
					></el-input>-->
          <el-select clearable v-model="queryData.city" placeholder="请选择">
            <el-option
              v-for="(item, index) in citysList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业简称">
          <el-input
            v-model="queryData.shortName"
            placeholder="请输入内容"
            size="small"
            style="width: 326px"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input
            v-model="queryData.state"
            placeholder="请输入内容"
            size="small"
            style="width: 326px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-refresh" @click="reseat" type="success" plain
            >清除</el-button
          >
          <el-button type="primary" icon="el-icon-search" @click="initData"
            >搜索</el-button
          >
          <el-button
            type="success"
            icon="el-icon-refresh"
            @click="showDialog = true"
            >新增用户</el-button
          >
        </el-form-item>
      </el-form>
      <el-alert
        :title="'共' + counts + '条记录'"
        type="info"
        show-icon
        :closable="false"
      />
      <!-- 渲染数据 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="序号"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="企业编号"
          width="220"
        ></el-table-column>
        <el-table-column
          prop="shortName"
          label="企业简称"
          width="120"
        ></el-table-column>
        <el-table-column prop="tags" label="标签" width="80"></el-table-column>
        <el-table-column
          prop="creatorID"
          label="创建者"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="addDate"
          label="创建日期"
          width="190"
        ></el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          width="370"
        ></el-table-column>
        <el-table-column prop="state" label="状态" width="70">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state === 0 ? 'success' : 'warning'">{{
              scope.row.state === 0 ? "禁用" : "启用"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="210">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
              circle
              @click="editHandler(row.id)"
            ></el-button>
            <!-- 修改状态 -->
            <el-button
              type="warning"
              plain
              icon="el-icon-close"
              circle
              @click="changeState(row.id, row.state)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              circle
              @click="delHandler(row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--  分页器-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryData.page"
        :page-sizes="[10, 5, 3]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
      ></el-pagination>
    </el-card>
    <!-- 增加/编辑 -->
    <el-dialog
      v-if="showDialog"
      :title="formData.id ? '编辑用户' : '创建用户'"
      :visible.sync="showDialog"
      @close="close"
    >
      <el-form
        :inline="true"
        :model="formData"
        :rules="formRules"
        ref="form"
        label-width="120px"
      >
        <el-form-item label="企业名称" prop="shortName">
          <el-input
            v-model="formData.shortName"
            size="small"
            style="width: 520px"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属公司" prop="company">
          <el-input
            v-model="formData.company"
            size="small"
            style="width: 520px"
          ></el-input>
        </el-form-item>
        <!-- <div>66666666666666666</div> -->
        <el-form-item label="城市地区" prop="province">
          <!-- <el-select clearable v-model="formData.province" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.province"
              :value="item.province"
            >
            </el-option>
					</el-select>-->
          <!-- <el-select clearable v-model="formData.city" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.city"
              :value="item.city"
            >
            </el-option>
					</el-select>-->
          <el-select
            v-model.trim="formData.province"
            placeholder="请选择"
            @change="changeFn"
          >
            <el-option
              v-for="(item, index) in provincesList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="city">
          <!-- <el-select clearable v-model="formData.city" placeholder="请选择">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.city"
              :value="item.city"
            >
            </el-option>
					</el-select>-->
          <el-select v-model="formData.city" placeholder="请选择">
            <el-option
              v-for="(item, index) in citysList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <city :formData="formData"></city> -->
        <el-form-item label="方向(企业标签)" prop="tags">
          <el-input
            v-model="formData.tags"
            size="small"
            style="width: 520px"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            v-model="formData.remarks"
            size="small"
            style="width: 520px"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="showDialog = false">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK"
            >立即创建</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  getCompanyListApi,
  changeCompanyStateApi,
  addCompanyApi,
  getCompanyInfoApi,
  editCompanyApi,
  delCompanyApi,
} from "@/api/company";
import city from "@/views/company/components/city";
import { provinces, citys } from "@/api/hmmm/citys";

export default {
  name: "Company",
  components: { city },
  props: {},
  data() {
    return {
      queryData: {
        page: 1, //当前页数
        pagesize: 10, //页尺寸
        tags: "", //标签名称
        province: "", //企业所在地省份
        city: "", //企业所在城市
        shortName: "", //企业简称
        // state: "", //状态
      },
      list: [],
      counts: 0, //总数
      showDialog: false,
      formData: {
        isFamous: true,
        shortName: "", //企业简称
        company: "", //所属公司
        province: "", //省份
        city: "", //城市
        tags: "", //标签
        remarks: "", //备注
        // id: "",
        // number: 1,
      },
      formRules: {
        shortName: [{ required: true, message: "请输入" }],
        company: [{ required: true, message: "请输入" }],
        province: [{ required: true, message: "请输入" }],
        city: [{ required: true, message: "请输入" }],
        tags: [{ required: true, message: "请输入" }],
        remarks: [{ required: true, message: "请输入" }],
      },
      st: "0",
      // //>> 地区  form表单数据
      provincesList: provinces(), // 城市
      citysList: [], // 地区
    };
  },
  created() {
    this.initData();
  },
  methods: {
    // 选择城市的方法
    changeFn() {
      // 获取地区赋值给本地
      this.citysList = citys(this.formData.province);
    },
    changeFn2() {
      // 获取地区赋值给本地
      this.citysList = citys(this.queryData.province);
    },
    //初始化数据
    async initData() {
      const { items, counts } = await getCompanyListApi(this.queryData);
      console.log(items);
      this.list = items;
      this.counts = counts;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryData.pagesize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryData.page = val;
      this.initData();
    },
    //重置
    reseat() {
      this.queryData = {};
      this.initData();
    },
    // 改变状态
    async changeState(id, state) {
      console.log(state, id);
      await this.$confirm("确认更改状态吗?");
      if (state === 0) {
        state = 1;
      } else {
        state = 0;
      }
      // state === 0 ? (state = 1) : (state = 0);
      await changeCompanyStateApi(id, state);
      this.initData();
    },
    //添加/编辑
    async btnOK() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return console.log(error);
      }
      if (this.formData.id) {
        if (this.formData.isFamous === 1) {
          this.formData.isFamous = true;
        } else {
          this.formData.isFamous = false;
        }
        await editCompanyApi(this.formData);
      } else {
        await addCompanyApi(this.formData);
      }
      this.$message.success("操作成功");
      this.showDialog = false;
      this.initData();
    },
    //关闭弹窗
    close() {
      this.formData = {
        isFamous: true,
        shortName: "", //企业简称
        company: "", //所属公司
        province: "", //省份
        city: "", //城市
        tags: "", //标签
        remarks: "", //备注
      };
    },
    //数据回显
    async editHandler(id) {
      console.log(id);
      const res = await getCompanyInfoApi(id);
      console.log(res);
      this.formData = res;
      this.showDialog = true;
    },
    //删除
    async delHandler(id) {
      console.log(id);
      await this.$confirm("你确定要删除吗?");
      await delCompanyApi(id);
      this.$message.success("删除成功");
      if (this.queryData.page !== 1 && this.list.length === 1) {
        this.queryData.page--;
      }
      this.initData();
    },
  },
};
</script>
<style  lang='scss' scoped>
</style>
