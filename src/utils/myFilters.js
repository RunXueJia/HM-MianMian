import dayjs from 'dayjs'
import Vue from 'vue'
import { questionType, difficulty } from "@/constant/questionType";

Vue.filter('format', (value) => {
    return dayjs(value).format('YYYY-MM-DD hh:mm:ss')
})
Vue.filter('getquestionType', (val) => {
    const res = questionType.find((item) => item.value === val * 1);
    if (res) return res.label;
    return "暂无数据";
})
Vue.filter('getdifficulty', (val) => {
    const res = difficulty.find((item) => item.value === val * 1);
    if (res) return res.label;
    return "暂无数据";
})

