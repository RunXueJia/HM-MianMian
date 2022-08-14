<template>
	<div>
		<el-card>
			<!-- 输入框 -->
			<el-row type="flex" justify="end" style="margin-bottom: 15px;">
				<el-button
					@click="$router.push('/questions/new')"
					style="margin-right: 53px;"
					icon="el-icon-edit"
					type="success"
				>新增试题</el-button>
			</el-row>
			<el-form :model="searchData" :inline="true" label-width="100px" class="demo-form-inline">
				<el-row>
					<el-col :span="6">
						<el-form-item label="学科">
							<el-select v-model="searchData.subjectID" style="width:250px;" placeholder="请选择">
								<el-option
									v-for=" item in SubjectList"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="目录">
							<el-select
								@focus="getDirectoryslist"
								v-model="searchData.catalogID"
								style="width:250px;"
								placeholder="请选择"
							>
								<el-option
									v-for=" item in Directoryslist"
									:key="item.id"
									:label="item.directoryName"
									:value="item.id"
								/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="标签">
							<el-select
								@focus="getTaglist"
								v-model="searchData.tags"
								style="width:250px;"
								placeholder="请选择"
							>
								<el-option v-for="item in Taglist" :key="item.id" :label="item.tagName" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="关键字">
							<el-input v-model="searchData.keyword" style="width:250px;" placeholder />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="试题类型">
							<el-select v-model="searchData.questionType" style="width:250px;" placeholder="请选择">
								<el-option
									v-for="item in questionType"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="难度">
							<el-select v-model="searchData.difficulty" style="width:250px;" placeholder="请选择">
								<el-option
									v-for="item in difficulty"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="方向">
							<el-select v-model="searchData.direction" style="width:250px;" placeholder="请选择">
								<el-option v-for="item in direction" :key="item" :label="item" :value="item" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="录入人">
							<el-select v-model="searchData.creatorID" style="width:250px;" placeholder="请选择">
								<el-option v-for="item in UserList" :key="item.id" :label="item.username" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="题目备注">
							<el-input v-model="searchData.remarks" style="width:250px;" placeholder />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="企业简称">
							<el-input v-model="searchData.shortName" style="width:250px;" placeholder />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="城市">
							<el-select v-model="searchData.province" style="width:100px;" placeholder="请选择">
								<el-option v-for="item in CityList" :key="item.city" :label="item.city" :value="item.city" />
							</el-select>
							<el-select
								v-model="searchData.city"
								collapse-tags
								style="margin-left: 20px;width:100px;"
								placeholder="请选择"
							>
								<el-option v-for="item in CityArea" :key="item" :label="item" :value="item" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-row type="flex" justify="end">
							<el-button @click="reset">清除</el-button>
							<el-button @click="search" style="margin-right: 53px;" type="primary">查询</el-button>
						</el-row>
					</el-col>
				</el-row>
			</el-form>
			<!-- pageTools -->
			<PageTools :text="`共${counts}道题目`" />

			<!-- 表格 -->

			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="全部" name="0"></el-tab-pane>
				<el-tab-pane label="待审核" name="1"></el-tab-pane>
				<el-tab-pane label="已审核" name="2"></el-tab-pane>
				<el-tab-pane label="已拒绝" name="3"></el-tab-pane>
			</el-tabs>
			<MyTable
				:parmasData="parmasData"
				@updata="initData"
				:Directoryslist="Directoryslist"
				:SubjectList="SubjectList"
				:choiceList="choiceList"
			/>

			<div class="page">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="parmasData.page"
					:page-sizes="[4,6,10, 15]"
					:page-size="parmasData.pagesize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="counts"
				></el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { CityList } from "@/constant/cityList";
	import { getSimpleSubjectApi } from "@/api/mySubject";
	import { getDirectoryslistApi } from "@/api/myCatalog";
	import { getTaglistApi } from "@/api/myTag";
	import MyTable from "./components/table.vue";
	import { getChoiceListApi, getUserApi } from "@/api/choice";
	import { questionType, difficulty, direction } from "@/constant/questionType";
	export default {
		name: "choice",
		components: { MyTable },
		data() {
			return {
				SubjectList: [],
				Directoryslist: [],
				Taglist: [],
				activeName: "",
				options: [],
				searchData: {
					subjectID: "",
					difficulty: "",
					questionType: "",
					tags: "",
					province: "",
					city: "",
					keyword: "",
					remarks: "",
					shortName: "",
					direction: "",
					creatorID: "",
					catalogID: "",
					chkState: "",
				},
				parmasData: {
					page: 1,
					pagesize: 10,
				},
				choiceList: [],
				counts: 0,
				UserList: [],
			};
		},
		computed: {
			questionType() {
				return questionType;
			},
			difficulty() {
				return difficulty;
			},
			direction() {
				return direction;
			},
			CityList() {
				return CityList;
			},
			CityArea() {
				if (this.searchData.province) {
					const res = this.CityList.find(
						(item) => item.city === this.searchData.province
					);
					return res.area || [];
				} else {
					return [];
				}
			},
		},
		created() {
			this.initData();
			this.getSimpleSubjectList();
			this.getUser();
		},
		methods: {
			//获取用户列表
			async getUser() {
				const { list } = await getUserApi({
					page: 1,
					pagesize: 9999,
					disabled: 0,
				});
				// console.log("用户", list);
				this.UserList = list;
			},
			//获取学科列表
			async getSimpleSubjectList() {
				const res = await getSimpleSubjectApi();
				// console.log(res);
				this.SubjectList = res;
			},
			//获取标签列表
			async getTaglist() {
				const { items } = await getTaglistApi({
					subjectID: this.searchData.subjectID,
				});
				// console.log("标签", items);
				this.Taglist = items;
			},
			//获取目录列表
			async getDirectoryslist() {
				const { items } = await getDirectoryslistApi({
					page: 1,
					pagesize: 9999,
					subjectID: this.searchData.subjectID,
				});
				// console.log("目录", items);
				this.Directoryslist = items;
			},
			//tab切换
			handleClick() {
				this.searchData.chkState =
					this.activeName * 1 > 0 ? this.activeName - 1 : "";
				this.initData();
			},
			//清空搜索框
			reset() {
				this.searchData = {
					subjectID: "",
					difficulty: "",
					questionType: "",
					tags: "",
					province: "",
					city: "",
					keyword: "",
					remarks: "",
					shortName: "",
					direction: "",
					creatorID: "",
					catalogID: "",
					chkState: "",
				};
				this.parmasData = {
					page: 1,
					pagesize: 10,
				};
				this.initData();
			},
			//查询
			search() {
				this.initData();
			},
			async initData() {
				const params = { ...this.parmasData };
				Object.keys(this.searchData).forEach((key) => {
					//遍历出有值的属性
					if (key === "chkState") {
						//排除chkstate为0的情况被过滤掉
						if (this.searchData[key] === 0 || this.searchData[key]) {
							params[key] = this.searchData[key];
						}
					} else if (this.searchData[key]) {
						params[key] = this.searchData[key];
					}
				});
				try {
					const { items, counts } = await getChoiceListApi(params);
					// console.log(items, counts);
					this.counts = counts;
					this.choiceList = items;
				} catch (error) {}
			},
			//分页相关
			handleSizeChange(val) {
				this.parmasData.pagesize = val;
				this.initData();
			},
			handleCurrentChange(val) {
				this.parmasData.page = val;
				this.initData();
			},
		},
	};
</script>

<style lang="scss">
	.page {
		margin-top: 15px;
		display: flex;
		justify-content: end;
	}
</style>
