<template>
	<div>
		<div style="display: flex; justify-content: space-around">
			<el-card style="width: 30%">
				<div slot="header" style="display: flex; justify-content: space-between">
					<span style="color: #97a8be">总销售额</span>
					<i class="el-icon-warning" style="color: #97a8be" />
				</div>
				<div class="money">
					<div>{{ num.two }}</div>
				</div>
				<div
					style="
            border-bottom: 1px solid #e8e8e8;
            padding-left: 10px;
            font-size: 14px;
          "
				>
					<span>
						周同比12%
						<i class="el-icon-caret-top" style="color: red"></i>
					</span>
					<span>
						日环比11%
						<i class="el-icon-caret-bottom" style="color: green; padding-bottom: 10px" />
					</span>
				</div>
				<p style="padding-left: 10px; font-size: 14px">日均销售额&nbsp;&nbsp; ￥ {{ str2 }}</p>
			</el-card>

			<el-card style="width: 30%">
				<div slot="header" style="display: flex; justify-content: space-between">
					<span style="color: #97a8be">访问量</span>
					<i class="el-icon-warning" style="color: #97a8be" />
				</div>
				<div id="main" class="money" style="border-bottom: 1px solid #e8e8e8"></div>
				<p style="padding-left: 10px; font-size: 14px">日访问量&nbsp;&nbsp;{{ str3 }}</p>
			</el-card>

			<el-card style="width: 30%">
				<div slot="header" style="display: flex; justify-content: space-between">
					<span style="color: #97a8be">支付笔数</span>
					<i class="el-icon-warning" style="color: #97a8be" />
				</div>
				<div id="main1" class="money" style="border-bottom: 1px solid #e8e8e8"></div>

				<p style="padding-left: 10px; font-size: 14px">转化率&nbsp;&nbsp;{{ str4 }}</p>
			</el-card>

			<el-card style="width: 30%">
				<div slot="header" style="display: flex; justify-content: space-between">
					<span style="color: #97a8be">运营活动效果</span>
					<i class="el-icon-warning" style="color: #97a8be" />
				</div>
				<div id="main2" class="money" style="border-bottom: 1px solid #e8e8e8"></div>

				<p style="padding-left: 10px; font-size: 14px">
					周同比&nbsp;&nbsp;12%
					<i class="el-icon-caret-top" style="color: red" />
					&nbsp;&nbsp;&nbsp;&nbsp; 日环比&nbsp;&nbsp;11%
					<i
						class="el-icon-caret-bottom"
						style="color: green"
					/>
				</p>
			</el-card>
		</div>
		<br />
		<el-card>
			<div style="padding: 20px">
				<el-row style="display: flex; justify-content: space-between">
					<el-col :span="15">
						<el-tabs>
							<el-tab-pane label="销售额">
								<div id="main3" class="box" style="width:994px ;height: 280px" ref="option1"></div>
							</el-tab-pane>
							<el-tab-pane label="访问量">
								<div id="main4" class="box" style="width:994px ; height: 280px" ref="option"></div>
							</el-tab-pane>
						</el-tabs>
					</el-col>
					<el-col :span="9">
						<el-date-picker
							v-model="time"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							style="width: 400px"
							@change="change"
							value-format="yyyy-MM-dd"
						></el-date-picker>
						<p style="margin-bottom: 15px">门店销售额排名</p>
						<el-row class="row" v-for="(item, index) in store" :key="index">
							<el-col :span="6" :class="index < 3 ? 'border' : 'boder1'">
								{{
								index + 1
								}}
							</el-col>
							<el-col :span="14" style="color: #595959">
								{{
								item.title
								}}
							</el-col>
							<el-col :span="4" style="color: #595959">{{ item.num }}</el-col>
						</el-row>
					</el-col>
				</el-row>
			</div>
		</el-card>
		<br />

		<div style="display: flex; justify-content: space-between">
			<el-card style="width: 50%">
				<div
					style="
            display: flex;
            justify-content: space-between;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ebeef5;
            padding: 0 20px;
          "
				>
					<div>线上热门搜索</div>
					<div>
						<el-dropdown>
							<span class="el-dropdown-link">
								...
								<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>菜单一</el-dropdown-item>
								<el-dropdown-item>菜单二</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				<div style="heigth: 30px">
					<el-table height="250" :data="tableData" style="width: 100%; margin-top: 10px">
						<el-table-column type="index" width="60"></el-table-column>
						<el-table-column prop="title" label="关键词  " width="360"></el-table-column>
						<el-table-column prop="num" label="人数"></el-table-column>
						<el-table-column prop="week" label="周增长率"></el-table-column>
					</el-table>
					<el-row type="flex" justify="end">
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="queryData.page"
							:page-size="queryData.pagesize"
							background
							layout="prev, pager, next"
							:total="500"
						></el-pagination>
					</el-row>
				</div>
			</el-card>
			<el-card style="width: 50%">
				<div
					style="
            display: flex;
            justify-content: space-between;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ebeef5;
            padding: 0 20px;
          "
				>
					<div>销售额类别占比</div>
					<div>
						<el-dropdown>
							<span class="el-dropdown-link">
								...
								<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>菜单一</el-dropdown-item>
								<el-dropdown-item>菜单二</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				<el-radio-group size="small" v-model="tabPosition" style="margin: 10px 10px">
					<el-radio-button label="top">全渠道</el-radio-button>
					<el-radio-button label="right">直达</el-radio-button>
					<el-radio-button label="bottom">百度</el-radio-button>
					<el-radio-button label="guge">谷歌</el-radio-button>
					<el-radio-button label="bing">必应</el-radio-button>
					<el-radio-button label="qita">其他</el-radio-button>
				</el-radio-group>
				<div id="main5" style="height: 300px; margin-left: 10px; padding-right: 40px"></div>
			</el-card>
		</div>
		<el-card>
			<div
				style="
          display: flex;
          justify-content: space-between;
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #ebeef5;
          padding: 0 20px;
        "
			>
				<div>周搜索趋势</div>
				<div>
					<el-dropdown>
						<span class="el-dropdown-link">
							...
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>菜单一</el-dropdown-item>
							<el-dropdown-item>菜单二</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
			<div id="main6" style="height: 300px"></div>
		</el-card>
	</div>
</template>
<script>
	import * as echarts from "echarts";
	import { gethotlistApi, getstoreApi } from "@/api/index";
	import {
		getserchListApi,
		getRadarChartListApi,
		getNumberApi,
		getHistogramApi,
		getzhexianApi,
	} from "@/api/wm-echarts";
	export default {
		name: "Dashboard",

		created() {
			this.initData();
			this.str2 = Math.floor(Math.random() * 100) + 689;
			this.str3 = Math.floor(Math.random() * 100) + 664;
			this.str4 = Math.floor(Math.random() * 100) + 765;
		},
		// echarts数据
		mounted() {
			this.getRadarChartList();
			this.getserchList();
			this.getHistogram();
			this.getnum();

			this.getzhexian();

			let myChart5 = echarts.init(document.getElementById("main5"));
			// 饼状图
			let option5 = {
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b}: {c} ({d}%)",
				},
				legend: {
					data: [
						"直达",
						"营销广告",
						"搜索引擎",
						"邮件营销",
						"联盟广告",
						"视频广告",
						"百度",
						"谷歌",
						"必应",
						"其他",
					],
				},
				legend: {
					orient: "vertical",
					left: "left",
				},
				series: [
					{
						name: "Access From",
						type: "pie",
						selectedMode: "single",
						radius: [0, "30%"],
						label: {
							position: "inner",
							fontSize: 14,
						},
						labelLine: {
							show: false,
						},
						center: ["60%", "50%"],
						data: [
							{ value: 679, name: "直达", selected: true },
							{ value: 775, name: "营销" },

							{ value: 1548, name: "搜索引擎" },
						],
					},
					{
						name: "Access From",
						type: "pie",
						radius: ["45%", "60%"],
						center: ["60%", "50%"],
						labelLine: {
							length: 30,
						},

						data: [
							{ value: 335, name: "直达" },
							{ value: 310, name: "邮件营销" },
							{ value: 234, name: "联盟广告" },
							{ value: 135, name: "视频广告" },
							{ value: 1048, name: "百度" },
							{ value: 251, name: "谷歌" },
							{ value: 147, name: "必应" },
							{ value: 102, name: "其他" },
						],
					},
				],
			};

			myChart5.setOption(option5);
			// 柱状图
			let myChart6 = echarts.init(document.getElementById("main6"));
			let option6 = {
				color: ["#2ec7c9", "#b6a2de", "#5ab1ef"],
				grid: {
					left: 10,
					right: 8,
					bottom: 15,
					top: 10,
					containLabel: true,
				},
				xAxis: {
					type: "category",
					data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						name: "Direct",
						type: "bar",
						stack: "total",
						label: {
							show: false,
						},
						emphasis: {
							focus: "series",
						},
						data: [120, 302, 401, 500, 390, 330, 120],
					},
					{
						name: "Mail Ad",
						type: "bar",
						stack: "total",
						label: {
							show: false,
						},

						data: [120, 432, 500, 894, 190, 530, 110],
					},
					{
						name: "Affiliate Ad",
						type: "bar",
						stack: "total",
						label: {
							show: false,
						},
						emphasis: {
							focus: "series",
						},
						data: [220, 182, 491, 434, 290, 330, 310],
					},
				],
			};

			myChart6.setOption(option6);
		},
		data() {
			return {
				tabPosition: "top",
				// 表格
				tableData: [],
				// 店家排名
				store: [],
				res: {},
				num: 0,
				dada: "",
				time: "",
				myChart4: "",
				myChart3: "",
				queryData: {
					page: 1,
					pagesize: 8,
				},
				str2: "",
				str3: "",
				str4: "",
			};
		},
		methods: {
			handleSizeChange(val) {
				this.queryData.pagesize = val;
				this.initData();
			},
			handleCurrentChange(val) {
				this.queryData.page = val;
				this.initData();
			},

			changePickerData(val) {
				// console.log(val);
				this.getzhexian();
			},
			// 雷达图
			async getRadarChartList() {
				let myChart = echarts.init(document.getElementById("main"));
				myChart.setOption({
					radar: {
						center: ["50%", "50%"],
						// 外半径占据容器大小
						radius: "65%",
						// 指示器轴的分割段数
						splitNumber: 4,
						// shape: 'circle',
						indicator: [
							{ name: "", max: 50 },
							{ name: "Administration", max: 50 },
							{ name: "Information Technology", max: 50 },
							{ name: "Customer Support", max: 50 },
							{ name: "Development", max: 50 },
							{ name: "Marketing", max: 50 },
						],

						splitArea: {
							show: true,
							areaStyle: {
								color: "rgba(207, 198, 209,1)", // 图表背景的颜色
							},
						},
						// 分割的圆圈线条的样式
						splitLine: {
							lineStyle: {
								color: "rgba(205, 200, 206, 1)",
								opacity: 1,
							},
						},
					},

					series: [
						{
							name: "Budget vs spending",
							type: "radar",
							symbolSize: 0,
							data: [],
							areaStyle: {
								color: "rgba(99, 194, 255, 1)",
								opacity: 1,
							},
							lineStyle: {
								normal: {
									color: "#fff",
									width: 1,
									opacity: 0.5,
								},
							},
						},
						{
							name: "女",
							type: "radar",
							symbolSize: 0,
							data: [],
							areaStyle: {
								color: "rgba(88, 94, 655, 1)",
							},
							lineStyle: {
								normal: {
									color: "#fff",
									width: 1,
									opacity: 1,
								},
							},
						},
						{
							name: "haiao",
							type: "radar",
							symbolSize: 0,
							data: [],
							areaStyle: {
								color: "rgba(88, 94, 655, 1)",
							},
							lineStyle: {
								normal: {
									color: "#fff",
									width: 1,
									opacity: 1,
								},
							},
						},
					],
				});

				const res = await getRadarChartListApi();
				// console.log(res);
				const data = res.data;
				console.log(data);
				myChart.setOption({
					series: [
						{
							name: "Budget vs spending",
							type: "radar",
							symbolSize: 0,
							data: [data[0]],
							areaStyle: {
								color: "rgba(99, 194, 255, 1)",
								opacity: 1,
							},
							lineStyle: {
								normal: {
									color: "#fff",
									width: 1,
									opacity: 0.5,
								},
							},
						},
						{
							name: "女",
							type: "radar",
							symbolSize: 0,
							data: [data[1]],
							areaStyle: {
								color: "rgba(88, 94, 655, 1)",
								opacity: 1,
							},
							lineStyle: {
								normal: {
									color: "#fff",
									width: 1,
									opacity: 1,
								},
							},
						},
						{
							name: "haiao",
							type: "radar",
							symbolSize: 0,
							data: [data[2]],
							areaStyle: {
								color: "rgba(216, 122, 128, 1)",
								opacity: 1,
							},
							lineStyle: {
								normal: {
									color: "#fff",
									width: 1,
									opacity: 1,
								},
							},
						},
					],
				});
			},

			// 排行
			async initData() {
				let { data } = await gethotlistApi(this.queryData);
				// console.log(data);
				let { items } = await getstoreApi();
				this.store = items;
				// console.log(this.store);
				this.tableData = data;
			},

			// 玫瑰图
			async getserchList() {
				let myChart1 = echarts.init(document.getElementById("main1"));
				myChart1.setOption({
					color: [
						"#32dadd",
						"#b6a2de",
						"#5ab1ef",
						"#ffb980",
						"#d87a80",
						"#a5c659",
					],
					tooltip: {
						// trigger 触发方式。  非轴图形，使用item的意思是放到数据对应图形上触发提示
						trigger: "item",
						// 格式化提示内容：
						// a 代表series系列图表名称
						// b 代表series数据名称 data 里面的name
						// c 代表series数据值 data 里面的value
						// d代表  当前数据/总数据的比例
						formatter: "{a} <br/>{b} : {c} ({d}%)",
					},
					legend: {
						data: ["rose1", "rose2", "rose3", "rose4", "rose5"],
					},

					series: [
						{
							name: "Area Mode",
							type: "pie",
							radius: ["20%", "80%"],
							center: ["50%", "50%"],
							roseType: "area",
							itemStyle: {
								//扇形的边角
								borderRadius: 0,
							},
							labelLine: {
								// 连接到图形的线长度
								length: 26,
								// 连接到文字的线长度
								length2: 18,
							},
							data: [],
						},
					],
				});

				const res = await getserchListApi();
				console.log(res);
				const data = res.data;
				// console.log(data);
				// console.log(data)
				myChart1.setOption({
					series: [
						{
							name: "Area Mode",
							type: "pie",
							radius: ["20%", "80%"],
							center: ["50%", "50%"],
							roseType: "area",
							itemStyle: {
								//扇形的边角
								borderRadius: 0,
							},
							labelLine: {
								// 连接到图形的线长度
								length: 26,
								// 连接到文字的线长度
								length2: 18,
							},
							data: data,
						},
					],
				});

				// console.log(this.res.data)
			},

			//柱状图
			async getHistogram() {
				let myChart2 = echarts.init(document.getElementById("main2"));
				myChart2.setOption({
					color: ["#5ab1ef", "#c8b6eb", "#2ec7c9"],
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow",
						},
					},
					// 图表边界控制
					grid: {
						// 距离 上右下左 的距离
						left: "0%",
						right: "2%",
						bottom: "0%",
						top: "10%",
						// 是否包含文本
						containLabel: true,

						//grid 四条边框的颜色
					},
					xAxis: [
						{
							type: "category",
							axisTick: {
								// true意思：图形在刻度中间
								// false意思：图形在刻度之间
								alignWithLabel: true,
							},
							// x坐标轴颜色设置
							axisLine: {
								lineStyle: {
									color: "rgba(0, 138, 205, 1)",
									// width:8,  x轴线的粗细
									// opcity: 0,   如果不想显示x轴线 则改为 0
								},
							},
							data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
						},
					],
					yAxis: [
						{
							type: "value",
							axisLabel: {
								color: "#4c9bfd",
							},
							// y坐标轴颜色设置
							axisLine: {
								show: true, //显示y轴线
								lineStyle: {
									color: "rgba(0, 138, 205, 0.3)",
									width: 2,
								},
							},
						},
					],
					series: [
						{
							name: "Direct",
							type: "bar",
							stack: "Ad",

							data: [],
						},
						{
							name: "Email",
							type: "bar",
							stack: "Ad",

							data: [],
						},
						{
							name: "Union Ads",
							type: "bar",

							stack: "Ad",

							data: [],
						},
					],
				});
				const { data } = await getHistogramApi();

				myChart2.setOption({
					series: [
						{
							name: "Direct",
							type: "bar",
							stack: "Ad",

							data: data[0].value,
						},
						{
							name: "Email",
							type: "bar",
							stack: "Ad",

							data: data[1].value,
						},
						{
							name: "Union Ads",
							type: "bar",

							stack: "Ad",

							data: data[2].value,
						},
					],
				});
			},

			// 销售额
			async getnum() {
				const num = await getNumberApi();
				// console.log(num);
				this.num = num;
				console.log(num);
			},

			//折现图
			async getzhexian() {
				let myChart3 = echarts.init(document.getElementById("main3"));
				this.myChart3 = myChart3;
				myChart3.setOption({
					color: [],
					legend: {}, //显示线的颜色
					tooltip: {
						trigger: "axis",
						axisPointer: {
							//显示x轴和y轴信息
							type: "cross",
							label: {
								backgroundColor: "#6a7985",
							},
						},
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true,
					},
					xAxis: {
						boundaryGap: false, // 不留白，从原点开始
						type: "category",
						data: [
							"1月",
							"2月",
							"3月",
							"4月",
							"5月",
							"6月",
							"7月",
							"8月",
							"9月",
							"10月",
							"11月",
							"12月",
						],
						axisTick: {
							show: false, // 去除刻度线
						},
						axisLabel: {
							color: "#4c9bfd", // 文本颜色
						},
						axisLine: {
							lineStyle: {
								color: "rgba(0, 138, 205, 1)",
								// width: 8, //x轴线的粗细
								// opcity: 0,   如果不想显示x轴线 则改为 0
							},
						},
					},
					yAxis: {
						type: "value",
						min: 0, // 配置 Y 轴刻度最小值
						max: 200,
					},
					series: [
						{
							name: "实际销售",
							data: [],
							type: "line",
							smooth: true,
						},
						{
							name: "预期销售额",
							data: [],
							type: "line",
							// 折线修饰为圆滑
							smooth: true,
							areaStyle: {
								color: "pink",
							},
						},
					],
				});

				let myChart4 = echarts.init(document.getElementById("main4"));
				myChart4.setOption({
					color: [],

					legend: {}, //显示线的颜色
					tooltip: {
						trigger: "axis",
						axisPointer: {
							//显示x轴和y轴信息
							type: "cross",
							label: {
								backgroundColor: "#6a7985",
							},
						},
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true,
					},
					xAxis: {
						boundaryGap: false, // 不留白，从原点开始
						type: "category",
						data: [
							"Mon",
							"Tue",
							"Wed",
							"Thu",
							"Fri",
							"Sat",
							"Sun",
							"Mon",
							"Tue",
							"Wed",
							"Thu",
							"Fri",
							"Sat",
							"Sun",
						],
						axisTick: {
							show: false, // 去除刻度线
						},
						axisLabel: {
							color: "pink", // 文本颜色
						},
						axisLine: {
							lineStyle: {
								color: "rgba(0, 138, 205, 1)",
								// width:8,  x轴线的粗细
								// opcity: 0,   如果不想显示x轴线 则改为 0
							},
						},
					},
					yAxis: {
						type: "value",
						min: 0, // 配置 Y 轴刻度最小值
						max: 200,
					},
					series: [
						{
							name: "实际销售",
							data: [],
							type: "line",
							smooth: true,
						},
						{
							name: "预期销售额",
							data: [],
							type: "line",
							// 折线修饰为圆滑
							smooth: true,
							areaStyle: {
								color: "rgba(0, 138, 205, 0.1)",
							},
						},
					],
				});
				const res = await getzhexianApi();
				// 保存mock数据
				this.data = res;
				// 拿到实例
				this.myChart4 = myChart4;
				myChart4.setOption({
					color: res.color,
					series: [
						{
							name: "实际销售",
							data: res.data.value,
							type: "line",
							smooth: true,
						},
						{
							name: "预期销售额",
							data: res.data.value1,
							type: "line",
							// 折线修饰为圆滑
							smooth: true,
							areaStyle: {
								color: "rgba(0, 138, 205, 0.1)",
							},
						},
					],
				});

				myChart3.setOption({
					color: res.color1,
					series: [
						{
							name: "实际销售",
							data: res.data.value2,
							type: "line",
							smooth: true,
						},
						{
							name: "预期销售额",
							data: res.data.value3,
							type: "line",
							// 折线修饰为圆滑
							smooth: true,
							areaStyle: {
								color: "rgba(0, 138, 205, 0.1)",
							},
						},
					],
				});
			},

			//日期
			change(val) {
				console.log(val);
				const arr = this.data.data.value;
				const arr1 = this.data.data.value1;
				const arr2 = this.data.data.value2;
				const arr3 = this.data.data.value3;
				let one = val[0].split("-")[1];
				let two = val[1].split("-")[1];

				let a = arr.map((item, index) => {
					if (index >= one - 1 && index <= two - 1) {
						item = item;
					} else {
						item = "";
					}
					return item;
				});

				let b = arr1.map((item, index) => {
					if (index >= one - 1 && index <= two - 1) {
						item = item;
					} else {
						item = "";
					}
					return item;
				});
				let c = arr2.map((item, index) => {
					if (index >= one - 1 && index <= two - 1) {
						item = item;
					} else {
						item = "";
					}
					return item;
				});
				let d = arr3.map((item, index) => {
					if (index >= one - 1 && index <= two - 1) {
						item = item;
					} else {
						item = "";
					}
					return item;
				});

				this.myChart3.setOption({
					series: [
						{
							name: "实际销售",
							data: a,
							type: "line",
							smooth: true,
						},
						{
							name: "预期销售额",
							data: b,
							type: "line",
							// 折线修饰为圆滑
							smooth: true,
							areaStyle: {
								color: "rgba(0, 138, 205, 0.1)",
							},
						},
					],
				});
				this.myChart4.setOption({
					series: [
						{
							name: "实际销售",
							data: c,
							type: "line",
							smooth: true,
						},
						{
							name: "预期销售额",
							data: d,
							type: "line",
							// 折线修饰为圆滑
							smooth: true,
							areaStyle: {
								color: "rgba(0, 138, 205, 0.1)",
							},
						},
					],
				});
			},
		},
	};

	// 样式
</script>
<style lang="less" scoped>
	.money {
		height: 140px;
		line-height: 140px;
		padding-left: 30px;
		font-size: 30px;
		font-style: 700;
	}
	.text {
		font-size: 10px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.clearfix:after {
		clear: both;
	}
	.el-card {
		margin-right: 20px;
	}

	.border {
		width: 20px;
		height: 20px;
		background-color: #314659;
		color: #fff;
		text-align: center;
		font-size: 12px;
		line-height: 20px;
		font-weight: 600;
		border-radius: 50%;
		margin-right: 30px;
		margin-bottom: 10px;
	}

	.boder1 {
		width: 20px;
		height: 20px;
		background-color: #f5f5f5;
		color: #ccc;
		text-align: center;
		font-size: 12px;
		line-height: 20px;
		font-weight: 600;
		border-radius: 50%;
		margin-right: 30px;
		margin-bottom: 10px;
	}

	/deep/ .el-card__body {
		padding: 0px !important;
	}
</style>
