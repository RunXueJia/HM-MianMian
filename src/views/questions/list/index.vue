<template>
	<div>
		<el-card>
			<!-- 输入框 -->
			<el-form :model="queryData" :inline="true" label-width="100px" class="demo-form-inline">
				<el-row type="flex" justify="end" style="margin-bottom: 15px;">
					<el-form-item style="margin-right:20px">
					<!-- 给新增按钮绑定点击事件,路由跳转到试题录入页面 -->
						<el-button @click="$router.push('/questions/new')" icon="el-icon-edit" type="success">新增试题</el-button>
					</el-form-item>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="学科">
							<el-select v-model="queryData.subjectID" style="width:285px;" placeholder="请选择">
								<el-option
									v-for="item in subjectList"
									:key="item.id"
									:label="item.subjectName"
									:value="item.id"
								>{{ item.subjectName }}</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="目录">
							<el-select v-model="queryData.directoryName" style="width:285px;" placeholder="请选择">
								<el-option
									v-for="item in directoryList2"
									:key="item.id"
									:label="item.directoryName"
									:value="item.id"
								/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="标签">
							<el-select v-model="queryData.tagName" style="width:285px;" placeholder="请选择">
								<el-option v-for="item in tagList2" :key="item.id" :label="item.tagName" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="关键字">
							<el-input v-model="queryData.keyword" style="width:285px;" placeholder />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="试题类型">
							<el-select v-model="queryData.questionType" tag-name style="width:285px;" placeholder="请选择">
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
							<el-select v-model="queryData.difficulty" style="width:285px;" placeholder="请选择">
								<el-option
									v-for="item in difficulty"
									:key="item.val"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="方向">
							<el-select v-model="queryData.direction" style="width:285px;" placeholder="请选择">
								<el-option v-for="item in direction" :key="item.index" :label="item.index" :value="item" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="录入人">
							<el-select v-model="queryData.username" style="width:285px;" placeholder="请选择">
								<el-option v-for="item in userList" :key="item.id" :label="item.username" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="题目备注">
							<el-input v-model="queryData.remarks" style="width:285px;" placeholder />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="企业简称">
							<el-input v-model="queryData.shortName" style="width:285px;" placeholder />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="城市">
							<el-select v-model="province" style="width:100px;" placeholder="请选择">
								<el-option
									v-for="item in provinceList"
									:key="item.value"
									:label="item.label"
									:value="item.label"
								/>
							</el-select>
							<el-select v-model="city" style="margin-left: 20px;width:100px;" placeholder="请选择">
								<el-option
									v-for="item in cityList"
									:key="item.value"
									:label="item.label"
									:value="item.label"
								/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item style="margin-left: 230px;">
						<!-- 清空表单中的查询数据,若是已经查询数据,再次点击清除按钮则会重新渲染表单 -->
							<el-button @click="resetBtn">清除</el-button>
							<!-- 给按钮绑定点击事件,调用initData事件,根据关键字和学科搜索相关试题,并重新渲染页面 -->
							<el-button type="primary" @click="initData">查询</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<!-- pageTools -->
			<PageTools :text="`共${counts}道题目`" />
			<!-- 表格 -->
			<el-table :data="list" stripe style="width: 100%">
				<el-table-column prop="number" label="试题编号" width="180" />
				<el-table-column prop="subject" label="学科" width="180" />
				<el-table-column prop="catalog" label="目录" />
				<el-table-column prop="questionType" label="题型">
					<template slot-scope="{row}">{{ row.questionType | getquestionType }}</template>
				</el-table-column>
				<el-table-column prop="question" label="题干">
					<template slot-scope="{row}">
						<div v-html="row.question"></div>
					</template>
				</el-table-column>

				<el-table-column prop="addDate" label="录入时间" />
				<el-table-column prop="difficulty" label="难度">
					<template slot-scope="{row}">{{ row.difficulty * 1 === 1 ? '简单' : '困难' }}</template>
				</el-table-column>
				<el-table-column prop="creator" label="录入人" />
				<el-table-column prop="address" label="操作">
					<template slot-scope="{row}">
						<el-button
							plain
							circle
							size="small"
							type="primary"
							icon="el-icon-view"
							@click="LookInfoHandler(row.id)"
						/>
						<el-button
							plain
							circle
							size="small"
							type="success"
							icon="el-icon-edit"
							@click="editInfoHandler(row)"
						/>
						<el-button
							plain
							circle
							size="small"
							type="danger"
							icon="el-icon-delete"
							@click="delInfoHandler(row.id)"
						/>
						
						<el-button
							plain
							circle
							size="small"
							type="warning"
							icon="el-icon-star-off"
							@click="saveInfoHandler(row.id)"
						/>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页组件 -->
			<el-row type="flex" justify="center" align="middle" style="height: 60px">
				<el-pagination
					background
					layout="total, sizes, prev, pager, next, jumper"
					:page-sizes="[5, 10, 15, 20]"
					:page-size="queryData.pagesize"
					:total="counts"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</el-row>
		</el-card>
		<InfoList ref="InfoList" />
	</div>
</template>

<script>
	import {
		getQuestionListApi,
		saveQuestionApi,
		getQuestionInfoApi,
		delQuestionApi,
	} from "@/api/question";
	import { getSubjectApi } from "@/api/mySubject";
	import { getDirectoryslistApi } from "@/api/myCatalog";
	import { getTaglistApi } from "@/api/myTag";
	import { getBgUserList } from "@/api/bg-user";
	import { questionType, difficulty, direction } from "@/constant/questionType";
	import { regionData } from "element-china-area-data";
	import InfoList from "@/components/questionsinfo";

	export default {
		name: "BaseQuestion",
		components: { InfoList },
		data() {
			return {
				list: [],
				queryData: {
					page: 1,
					pagesize: 5,
				},
				counts: 0,
				subjectList: [],
				directoryList: [],
				userList: [],
				provinceList: [],
				cityList: [],
				province: "",
				city: "",
				tagList: [],
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
			directoryList2() {
				return this.directoryList.filter(
					(item) => item.subjectID === this.queryData.subjectID
				);
			},
			tagList2() {
				return this.tagList.filter(
					(item) => item.subjectID === this.queryData.subjectID
				);
			},
		},
		watch: {
			//监听城市
			province(n, o) {
				if (n !== o) {
					this.city = "";
					this.cityList = [];
					const res = this.provinceList.find((ele) => ele.label === n).children;
					res.forEach((ele) => {
						if (ele.value) this.cityList.push(ele);
					});
				}
				this.queryData.province = n;
			},
			city(val) {
				this.queryData.city = val;
			},
		},
		created() {
			this.initData();
			this.getSubjectList();
			this.getDirectoryslist();
			this.getTaglist();
			this.getBgUserList();
			// console.log(regionData)
			regionData.forEach((ele) => {
				if (ele.children && ele.children[0].label !== "市辖区") {
					ele.children.forEach((item) => {
						if (item.value) {
							this.provinceList.push(item);
						}
					});
				}
				if (ele.children && ele.children[0].label === "市辖区") {
					this.provinceList.push({
						value: ele.value,
						label: ele.label,
						children: ele.children[0].children,
					});
				}
			});
			// console.log(this.provinceList)
		},
		methods: {
			async initData() {
				const { items, counts } = await getQuestionListApi(this.queryData);
				// await getSubjectApi({
				//   page: 1,
				//   pagesize: 100
				// })
				// await getUserSimpleListApi(this.queryData)
				// const res = await getQuestionListApi(this.queryData)
				// console.log(res)
				this.list = items;
				this.counts = counts;
			},
			async getSubjectList() {
				const { items } = await getSubjectApi();
				// console.log(items)
				this.subjectList = items;
			},
			async getDirectoryslist() {
				const { items } = await getDirectoryslistApi();
				// console.log(res)
				this.directoryList = items;
			},
			async getTaglist() {
				const { items } = await getTaglistApi();
				// console.log(res)
				this.tagList = items;
			},
			async getBgUserList() {
				const { list } = await getBgUserList();
				this.userList = list;
				// console.log(list);
			},
			//查看
			// 给查看按钮绑定点击事件,通过Dialog弹框查看选中的试题详情,回显数据,用Radio组件查看视频实现并播放
			async LookInfoHandler(val) {
				// console.log(val)
				const res = await getQuestionInfoApi(val);
				this.$refs.InfoList.isShow = true;
				this.$refs.InfoList.info = res;
			},
			//利用slot-scoped={ row }获取当前行的数据,使用template插槽给删除的点击事件传递row.id,在methods里面调用删除事件,接收ID,删除点击的那一项数据
			async delInfoHandler(val) {
				await this.$confirm("此操作将永久删除该题目, 是否继续?");
				await delQuestionApi(val);
				if (this.queryData.page > 1 && this.list.length === 1) {
					this.queryData.page--;
				}
				this.$message.success("删除成功");
				this.initData();
			},
			// 将点击的试题收藏到精选题库中
			async saveInfoHandler(val) {
				await this.$confirm("此操作将该题目加入精选, 是否继续?");
				await saveQuestionApi(val);
				this.$message.success("收藏成功");
				this.initData();
			},
			//用插槽获取到当前点击事件的ID,通过路径拼接ID实现跳转,在试题录入页面获取到当前ID,调用获取基础试题详情的接口传入id,获取到当前试题的详情赋值给formData,并对ID进行判断,如果有ID就调用修改事件,传入formData数据.给按钮绑定点击事件,实现修改功能
			async editInfoHandler(val) {
				// console.log(val)

				this.$router.push("/questions/new?id=" + val.id);
			},
			resetBtn() {
				this.queryData = {
					page: 1,
					pagesize: 5,
				};
				this.city = "";
				this.province = "";
				this.initData();
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
		},
	};
</script>

<style lang="scss" scoped>
</style>
