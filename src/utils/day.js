import dayjs from "dayjs";
import Vue from "vue";
// 导入相对时间插件
import relativeTime from "dayjs/plugin/relativeTime";
// 安装时间插件
dayjs.extend(relativeTime);
// 加载语言包
import "dayjs/locale/zh-cn";
// 安装中文语言包
dayjs.locale("zh-cn"); // 全局使用简体中文

// dayjs()返回一个当前时间的dayjs实例时间处理对象
// dayjs(时间对象)
// dayjs(时间戳)
// dayjs(时间戳).format("格式") 将指定时间戳格式成对应时间

// console.log(dayjs().from(dayjs("1990-01-01"))); // 31 年后;
// console.log(dayjs().to(dayjs("1990-01-01"))); // 31 年前);

// 定义全局过滤器
Vue.filter("relativeTime", (value) => {
  return dayjs(value).format("YYYY-MM-DD");
});
