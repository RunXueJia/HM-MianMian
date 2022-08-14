<template>
	<el-card>
		<el-table :data="choiceList" stripe style="width: 100%">
			<el-table-column width="280" prop="number" label="试题编号" />
			<el-table-column label="学科" width="180">
				<template slot-scope="{row}">{{row.subject }}</template>
			</el-table-column>
			<el-table-column label="目录">
				<template slot-scope="{row}">{{row.catalog }}</template>
			</el-table-column>
			<el-table-column prop="questionType" label="题型">
				<template slot-scope="{row}">{{row.questionType | getquestionType}}</template>
			</el-table-column>
			<el-table-column width="300" prop="question" label="题干">
				<template slot-scope="{row}">
					<p v-html="row.question"></p>
				</template>
			</el-table-column>
			<el-table-column width="160" prop="addDate" label="录入时间">
				<template slot-scope="{row}">{{row.addDate | format}}</template>
			</el-table-column>
			<el-table-column prop="difficulty" label="难度">
				<template slot-scope="{row}">{{row.difficulty | getdifficulty}}</template>
			</el-table-column>
			<el-table-column width="180" prop="creator" label="录入人" />
			<el-table-column fixed="right" width="240" label="操作">
				<template slot-scope="{row}">
					<div class="btnbox">
						<el-button @click="showQueInfo(row)" type="text">预览</el-button>
						<el-button @click="chk(row)" :disabled="row.chkState ? true: false" type="text">审核</el-button>
						<el-button @click="edit(row)" :disabled="row.publishState ? true: false" type="text">修改</el-button>
						<el-button @click="publishFn(row)" type="text">{{row.publishState?'下架':'上架'}}</el-button>
						<el-button @click="del(row)" :disabled="row.publishState ? true: false" type="text">删除</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<!-- 弹窗 -->
		<el-dialog
			destroy-on-close
			@close="close"
			width="700px"
			title="提示"
			:visible.sync="dialogFormVisible"
		>
			<el-form :model="chkForm" label-position="top">
				<el-form-item>
					<el-radio-group v-model="chkForm.chkState">
						<el-radio :label="1">同意</el-radio>
						<el-radio :label="2">拒绝</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="审核意见">
					<el-input type="textarea" style="width:500px" v-model="chkForm.chkRemarks" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button @click="submit" type="primary">确 定</el-button>
			</div>
		</el-dialog>
		<QuestionsInfo ref="QueInfo" />
		<!--//  -->
	</el-card>
</template>

<script>
	import {
		getquestionOptApi,
		publishApi,
		DelquestionApi,
		questioncheckApi,
	} from "@/api/choice";
	export default {
		name: "HmmmZyTable",
		props: {
			choiceList: {
				type: Array,
				required: true,
			},
			SubjectList: {
				type: Array,
				retuired: true,
			},
			Directoryslist: {
				type: Array,
				required: true,
			},
			parmasData: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {
				dialogFormVisible: false,
				that: this,
				chkForm: {
					chkRemarks: "",
					chkState: 1,
					id: "",
				},
			};
		},
		mounted() {},

		methods: {
			// 修改
			edit(row) {
				this.$router.push({
					path: "/questions/new",
					query: {
						id: row.id,
					},
				});
			},
			//考题预览
			async showQueInfo(row) {
				const res = await getquestionOptApi({ id: row.id });
				// console.log(res);
				this.$refs.QueInfo.info = { ...row, ...res };
				this.$refs.QueInfo.isShow = true;
			},
			//关闭弹窗
			close() {
				this.chkForm = {
					chkRemarks: "",
					chkState: 1,
					id: "",
				};
			},
			//提交审核
			async submit() {
				if (!this.chkForm.chkRemarks.trim())
					return this.$message.warning("请输入审核意见");
				try {
					await questioncheckApi(this.chkForm);
				} catch (error) {
					return;
				}

				this.$message.success("操作成功");
				this.$emit("updata");
				this.dialogFormVisible = false;
			},

			//审核
			chk(row) {
				this.dialogFormVisible = true;
				this.chkForm.id = row.id;
			},
			//上下架
			async publishFn(row) {
				const h = this.$createElement;
				try {
					const h = this.$createElement;
					await this.$msgbox({
						//自定义弹窗
						title: "消息",
						message: h("p", null, [
							h(
								"i",
								{
									class: "el-icon-info info",
								},
								null
							),
							h(
								"span",
								null,
								`您确定${row.publishState ? "下架" : "上架"}这道题目吗?`
							),
						]),
						showCancelButton: true,
						confirmButtonText: "确定",
						cancelButtonText: "取消",
					});
				} catch (error) {
					return;
				}
				await publishApi({
					id: row.id,
					publishState: row.publishState ? 0 : 1,
				});
				this.$message.success("操作成功");
				this.$emit("updata");
			},
			//删除
			async del(row) {
				const h = this.$createElement;
				try {
					const h = this.$createElement;
					await this.$msgbox({
						title: "消息",
						message: h("p", null, [
							h(
								"i",
								{
									class: "el-icon-warning info",
									style: "color:red",
								},
								null
							),
							h("span", null, `此操作将永久删除该题,是否继续?`),
						]),
						showCancelButton: true,
						confirmButtonText: "确定",
						cancelButtonText: "取消",
					});
				} catch (error) {
					return;
				}
				try {
					await DelquestionApi(row);
				} catch (error) {
					return;
				}
				this.$message.success("操作成功");
				if (this.parmasData.page > 1 && this.choiceList.length <= 1) {
					this.parmasData.page--;
				}
				this.$emit("updata");
			},
		},
	};
</script>

<style lang="scss" scoped>
	::v-deep.info {
		font-size: 16px;
		margin-right: 10px;
	}
</style>