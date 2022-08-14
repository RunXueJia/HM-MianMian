<template>
	<el-dialog @close="playerVisible = false" destroy-on-close title="考题预览" :visible.sync="isShow">
		<div id="box">
			<el-row>
				<el-col :span="6">
					<span>【题型】: {{ info.questionType | getquestionType }}</span>
				</el-col>
				<el-col :span="6">
					<span>【编号】: {{ info.id }}</span>
				</el-col>
				<el-col :span="6">
					<span>【难度】: {{ info.difficulty | getdifficulty }}</span>
				</el-col>
				<el-col :span="6">
					<span>【标签】: {{ info.tags }}</span>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<span>【学科】: {{ info.subject || info.subjectName }}</span>
				</el-col>
				<el-col :span="6">
					<span>【目录】: {{ info.directoryName }}</span>
				</el-col>
				<el-col :span="6">
					<span>【方向】: {{ info.direction }}</span>
				</el-col>
				<el-col :span="6"></el-col>
			</el-row>
			<hr />
			<p>【题干】</p>
			<p class="question" v-html="info.question"></p>
			<p>{{ info.questionType | getquestionType }}题选项</p>
			<div v-if="info.questionType < 3">
				<el-radio
					:value="true"
					:label="item.isRight ? true : false"
					v-for="item in info.options"
					:key="item.id"
				>{{ item.code + " " + item.title }}</el-radio>
			</div>
			<div v-else v-html="info.answer"></div>
			<hr />
			<div>
				【题干】
				<el-button @click="playerVisible = true" type="danger">视频答案解析</el-button>
				<div>
					<meta name="referrer" content="no-referrer" />
					<!-- 解决视频标签的跨域资源问题 -->
					<video
						ref="video"
						:src="info.videoURL"
						v-if="playerVisible"
						width="320"
						height="240"
						:autoplay="true"
						controls
					>您的浏览器不支持 video 标签。</video>
				</div>
			</div>
			<hr />
			<p>【答案解析】: https://cn.vuejs.org/ 有答案</p>
			<hr />
			<p>【题目备注】: https://cn.vuejs.org/ 有答案</p>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="isShow = false">关 闭</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		name: "QueInfo",
		props: {},
		data() {
			return {
				isShow: false,
				info: {},
				video: {},
				playerVisible: false,
				videoURL: "",
			};
		},
		watch: {
			isShow() {
				this.info.options.sort((a, b) => {
					return a.code.charCodeAt(0) - b.code.charCodeAt(0); //选项排序问题
				});
			},
		},
		mounted() {},

		methods: {},
	};
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

