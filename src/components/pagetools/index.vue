<template>

  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <div class="before">

          <i class="el-icon-info"></i>

          <span>{{ text }}</span>
        </div>
      </el-col>
      <div class="right">

        <slot></slot>

      </div>
    </el-row>
  </el-card>

</template>

<script>
export default {


  name: "pagetools",
  props: {
    text: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {};

  },

  mounted() {},



  methods: {},
};
</script>

<style lang="scss" scoped>

.page-tools {
  margin: 10px 0;
  font-size: 14px;
  .before {
    line-height: 28px;
    i {
      margin-right: 5px;
      color: #999;
    }
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid #f4f4f5;
    background: #f4f4f5;
  }
  .right {
    display: flex;
    justify-content: end;
  }
}


</style>
