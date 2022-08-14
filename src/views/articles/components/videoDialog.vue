<template>
  <div class="container">
    <el-dialog title :visible.sync="isShow" width="70%" @close="closeDialog">
      <video
        :src="videoUrl"
        controls
        autoplay
        class="video"
        width="100%"
      ></video>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "VideoDialog",
  data() {
    return {
      isShow: false,
      // 测试地址
      // videoUrl: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
      videoUrl: "",
    };
  },

  created() {
    console.log(this.videoUrl, "视频");
  },
  methods: {
    // 视频播放
    playVideo(row) {
      this.isShow = true;
      // 将接受的值赋值给srcvideoURL
      this.videoUrl = row.videoURL;
    },
    closeDialog() {
      // 关闭弹框
      this.isShow = false;
      this.videoUrl = ""; // 清空数据 关闭视频播放
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-dialog__headerbtn {
  top: -85px;
  right: 50%;
  padding: 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 45px;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  transform: translateX(50%);
  background-color: rgba(107, 107, 107, 0.5);
}
::v-deep .el-dialog__header {
  background: transparent;
  height: 0;
  padding: 0;
}
::v-deep .el-dialog__body {
  background: transparent;
  height: 0;
  padding: 0;
}
</style>
