<template>
	<el-card>
		<!-- 搜索框 -->
		<el-card>
			<el-form :model="searchForm">
				<el-row type="flex" justify="space-between">
					<el-col :span="4">
						<el-form-item label="关键词" label-width="60px">
							<el-input placeholder="输入搜索词" v-model="searchForm.keyword"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-button @click="search" type="primary">搜索</el-button>
						<el-button @click="clean">清除</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<!-- 消息通知 -->
		<PageTools :text="`一共${pageData.counts}条数据`" />
		<!-- 表格 -->
		<el-card>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="randomId" label="编号"></el-table-column>
				<el-table-column prop="questionType" label="题型">
					<template slot-scope="{row}">{{row.questionType | getquestionType }}</template>
				</el-table-column>
				<el-table-column label="题目编号">
					<template slot-scope="{row}">
						<div class="btnbox" v-for="(item,index) in row.list" :key="index">
							<el-button @click="yulan(item)" size="small" type="text">{{item.number}}</el-button>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="addDate" label="录入时间"></el-table-column>
				<el-table-column prop="answerDate" label="答题时间"></el-table-column>
				<el-table-column prop="Accuracy" label="正确率"></el-table-column>
				<el-table-column prop="username" label="录入人"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="{row}">
						<el-button @click="del(row)" type="danger" icon="el-icon-delete" circle></el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<br />
			<el-row type="flex" justify="end">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="1"
					:page-sizes="[4, 8, 10, 20]"
					:page-size="pageData.pagesize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pageData.counts"
				></el-pagination>
			</el-row>
		</el-card>
		<!-- 详情 -->
		<QuestionsInfo ref="queInfo" />
	</el-card>
</template>

<script>
	import { getrandomListApi, delrandomListApi } from "@/api/randoms";
	import { getquestionOptApi } from "@/api/choice";
	export default {
		name: "randoms",

		data() {
			return {
				searchForm: {
					keyword: "",
				},
				tableData: [],
				pageData: {
					page: 1,
					pagesize: 10,
					counts: 172,
				},
			};
		},

		mounted() {},
		created() {
			this.initData();
		},
		methods: {
			//预览
			async yulan(item) {
				// console.log(item);
				try {
					const res = await getquestionOptApi(item);
					// console.log(res);
					this.$refs.queInfo.info = res;
					this.$refs.queInfo.isShow = true;
				} catch (error) {
					return this.message.error("暂无数据");
				}
			},
			//清除
			clean() {
				this.pageData = {
					page: 1,
					pagesize: 10,
					counts: this.pageData.counts,
				};
				this.searchForm = {
					keyword: "",
				};
				this.initData();
			},
			//搜索
			search() {
				this.initData();
			},
			handleClick() {},
			//翻页
			handleSizeChange(val) {
				this.pageData.pagesize = val;
				this.initData();
			},
			handleCurrentChange(val) {
				this.pageData.page = val;
				this.initData();
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
							h("span", null, `此操作将永久删除该题组,是否继续?`),
						]),
						showCancelButton: true,
						confirmButtonText: "确定",
						cancelButtonText: "取消",
					});
				} catch (error) {
					return;
				}
				this.tableData.splice(
					//模拟删除操作
					this.tableData.findIndex((item) => item.randomId === row.randomId),
					1
				);

				this.pageData.counts--; //总数减一
				if (this.pageData.page > 1 && this.tableData.length < 1) {
					//如果页数大于1并且是本页最后一条删除后跳转上一页
					this.pageData.page--;
					this.initData();
				}
				if (this.pageData.counts / this.pageData.pagesize < this.pageData.page)
					return this.$message.success("操作成功");
				try {
					const { data } = await getrandomListApi({
						page: 1,
						pagesize: 1,
					});
					this.tableData = [...this.tableData, data.items];
				} catch (error) {
					return;
				}

				this.$message.success("操作成功");
			},
			//获取数据
			async initData() {
				// console.log("ok");
				const pageData = {
					...this.pageData,
					...this.searchForm,
				};
				const { data } = await getrandomListApi(pageData);
				// this.counts = counts;
				this.tableData = data.items;
			},
		},
	};
</script>

<style lang="scss" scoped>
	::v-deep .el-button--text {
		padding: 3px;
	}
	::v-deep.info {
		font-size: 16px;
		margin-right: 10px;
	}
</style>
