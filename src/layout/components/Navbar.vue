<template>
	<div class="navbar">
		<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

		<breadcrumb class="breadcrumb-container" />
		<div class="right-menu">
			<el-tooltip class="item" effect="dark" content="搜索" placement="bottom-start">
				<i @click="openInp" class="el-icon-search screenFull"></i>
				<!-- 搜索框 -->
			</el-tooltip>
			<!-- 搜索弹出框 -->
			<div v-if="inpShow" class="box">
				<el-popover placement="top" trigger="focus">
					<el-scrollbar style="height: 300px">
						<!-- 滚动条要包裹的内容 -->
						<div
							@click="btnsearch(val)"
							style="margin: 10px 0"
							v-for="(val,index) in gridData"
							:key="index"
						>{{val}}</div>
					</el-scrollbar>

					<!-- <el-button >click 激活</el-button> -->
					<el-input
						slot="reference"
						@blur="close"
						ref="inp"
						size="mini"
						placeholder="请输入内容"
						v-model="search"
					></el-input>
				</el-popover>
			</div>
			<!-- <el-button slot="reference" @click="visible = !visible">手动激活</el-button> -->

			<el-tooltip class="item" effect="dark" content="全屏" placement="bottom-start">
				<screen-full class="screenFull" />
			</el-tooltip>

			<el-tooltip class="item" effect="dark" content="切换中英文" placement="bottom-start">
				<lang />
			</el-tooltip>
			<theme-picker class="ithem" />
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
					<el-tooltip class="item" effect="dark" content="头像" placement="bottom-start">
						<img v-imgerror="defaultImg" :src="avatar" class="user-avatar" />
					</el-tooltip>

					<span class="username">{{$store.getters.name}}</span>
					<i style="color : #fff" class="el-icon-caret-bottom" />
				</div>
				<el-dropdown-menu slot="dropdown" class="user-dropdown">
					<router-link to="/">
						<el-dropdown-item>首页</el-dropdown-item>
					</router-link>

					<el-dropdown-item divided @click.native="logout">
						<span style="display:block;">退出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import Breadcrumb from "@/components/Breadcrumb";
	import Hamburger from "@/components/Hamburger";
	import { getsearchListApi } from "@/api/Layout";
	export default {
		components: {
			Breadcrumb,
			Hamburger,
		},
		data() {
			return {
				//
				gridData: [],
				visible: false,
				inpShow: false,
				search: "",
				defaultImg: require("@/assets/huangchengzi.png"),
			};
		},
		computed: {
			...mapGetters(["sidebar", "avatar"]),
		},
		methods: {
			//关闭搜索框
			close() {
				setTimeout(() => {
					this.inpShow = false;
				}, 500);
			},
			btnsearch(val) {
				// console.log("ok");
				this.$message.success(`选择了${val}`);
			},
			//打开搜索框
			async openInp() {
				if (this.inpShow) {
					this.btnsearch(this.search);
				} else {
					this.inpShow = true;
					await this.$nextTick(() => {
						this.$refs.inp.focus();
					});
					const { data } = await getsearchListApi();
					// console.log(res);
					this.gridData = data.searchList;
				}
			},
			toggleSideBar() {
				this.$store.dispatch("app/toggleSideBar");
			},
			logout() {
				this.$store.dispatch("user/logout");
			},
		},
	};
</script>

<style lang="scss" scoped>
	.ithem {
		vertical-align: middle;
		margin-right: 10px;
		margin-left: 10px;
	}
	.popoverbox {
		height: 300px;
	}
	.box {
		width: 200px;
		height: 100%;
		display: inline-block;
		vertical-align: middle;
		margin-right: 10px;
	}
	.navbar {
		height: 70px;
		overflow: hidden;
		position: relative;
		background: linear-gradient(90deg, #1493fa, #01c6fa);
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
		.screenFull {
			display: inline-block;
			margin-right: 10px;
			color: #fff;
		}
		.hamburger-container {
			line-height: 70px;
			height: 100%;
			float: left;
			cursor: pointer;
			transition: background 0.3s;
			-webkit-tap-highlight-color: transparent;

			&:hover {
				background: rgba(0, 0, 0, 0.025);
			}
		}

		.breadcrumb-container {
			line-height: 70px;
			float: left;
		}

		.right-menu {
			float: right;
			height: 100%;
			line-height: 70px;

			&:focus {
				outline: none;
			}

			.right-menu-item {
				display: inline-block;
				padding: 0 8px;
				height: 100%;
				font-size: 18px;
				color: #5a5e66;
				vertical-align: text-bottom;

				&.hover-effect {
					cursor: pointer;
					transition: background 0.3s;

					&:hover {
						background: rgba(0, 0, 0, 0.025);
					}
				}
			}

			.avatar-container {
				line-height: 70px;
				margin-right: 30px;

				.avatar-wrapper {
					position: relative;
					.username {
						margin-left: 10px;
						color: #fff;
					}
					.user-avatar {
						cursor: pointer;
						width: 40px;
						height: 40px;
						border-radius: 10px;
						vertical-align: middle;
					}

					.el-icon-caret-bottom {
						cursor: pointer;
						position: absolute;
						right: -20px;
						top: 25px;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
