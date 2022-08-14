<template>
  <!-- <div class="app-container"> -->
  <!-- <el-form label-width="100px"> -->
  <el-form-item label="城市" style="width: 400px">
    <el-select
      style="width: 48%; margin-right: 4%"
      v-model.trim="formData.provinces"
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
    <el-select style="width: 48%" v-model="formData.citys" placeholder="请选择">
      <el-option
        v-for="(item, index) in citysList"
        :key="index"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
  </el-form-item>
  <!-- </el-form> -->
  <!-- </div> -->
</template>

<script>
// 引入 城市
import { provinces, citys } from "@/api/hmmm/citys";
export default {
  name: "city",
  props: {
    formData: {
      type: Object,
      default: true,
    },
  },
  data() {
    return {
      // //>> form表单数据
      provincesList: provinces(), // 城市
      citysList: [], // 地区
      form: {
        provinces: "", // 城市
        citys: "", // 地区
      },
    };
  },
  methods: {
    // 选择城市的方法
    changeFn() {
      // 获取地区赋值给本地
      this.citysList = citys(this.form.provinces);
    },
  },
};
</script>

<style scoped lang="less"></style>

