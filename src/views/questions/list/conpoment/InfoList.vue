<template>
  <div>
    <el-dialog :visible.sync="showDialog" title="提示">
      <div id="box">
        <el-form v-if="showDialog" :model="formData">
          <el-row>

            <el-col :span="6" :offset="0">
              <el-form-item v-model="formData.questionType" label="【题型】:" size="small">
                {{ +formData.questionType|questionType }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item v-model="formData.id" label="【编号】:" size="small">
                {{ formData.id }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item v-model="formData.difficulty" label="【难度】:" size="small">
                {{ formData.difficulty }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item v-model="formData.tags" label="【标签】:" size="small">
                {{ formData.tags }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item v-model="formData.subjectName" label="【学科】:" size="small">
                {{ formData.subjectName }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item v-model="formData.directoryName" label="【目录】:" size="small">
                {{ formData.directoryName }}
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item v-model="formData.direction" label="【方向】:" size="small">
                {{ formData.direction }}
              </el-form-item>
            </el-col>
          </el-row>
          <p>【题干】</p>
          <p class="question" v-html="info.question" />
          <p>`{{+formData.questionType | questionType }}题选项`</p>
          <div v-if="formData.questionType<3">
            <el-radio
              v-for="item in formData.options"
              :key="item.id"
              :value="true"
              :label="item.isRight ?true :false"
            >{{ item.code + ' ' + item.title }}</el-radio>
          </div>
          <div v-else v-html="formData.answer" />
          <hr>
          <div>
            【题干】
            <el-button type="danger" @click="playerVisible=true">视频答案解析</el-button>
            <div>
              <meta name="referrer" content="no-referrer">
              <video
                v-if="playerVisible"
                ref="video"
                :src="formData.videoURL"
                width="320"
                height="240"
                :autoplay="true"
                controls
              >您的浏览器不支持 video 标签。</video>
            </div>
          </div>
          <hr>
          <p>【答案解析】: https://cn.vuejs.org/ 有答案</p>
          <hr>
          <p>【题目备注】: https://cn.vuejs.org/ 有答案</p>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="showDialog = false">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'InfoList',
  filters: {
    questionType(val) {
      if (val === 1) return '单选'
      if (val === 2) return '多选'
      if (val === 3) return '简答'
    }
  },
  data() {
    return {
      showDialog: false,
      formData: {},
      questionId: '',
      video: {},
      playerVisible: false,
      videoURL: ''
    }
  },
  created() {
    // this.getQuestionInfo()
  },
  methods: {
    // async getQuestionInfo() {

    // }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
		background-color: #409eff;
		.el-dialog__title {
			color: #fff;
		}
		.el-dialog__close {
			color: #fff !important;
		}
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin: 0;

}
	}
	#box {
		// padding: 20px;

		::v-deep .el-col {
			height: 36px;
		}
		.question {
			color: #409eff;
		}
	}
</style>
