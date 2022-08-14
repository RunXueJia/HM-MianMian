import request from '@/utils/request'
//销售总额
export const getNumberApi = (params) => {
    return request({
        url: "/goods/Number"
    })
}
//柱状图
export const getHistogramApi = (params) => {
    return request({
        url: "/goods/Histogram"
    })
}
//雷达图
export const getRadarChartListApi = (params) => {
    return request({
        url: "/goods/RadarChart"
    })
}
//柱状图
export const getBiaogeApi = (data) => {
    return request({
        url: "/goods/Biaoge",
        method: 'post',
        data
    })
}
// 获取折线数据
export const getzhexianApi = () => {
    return request({
        url: "/goods/shuju"
    })
}
//玫瑰图
export const getserchListApi = (params) => {
    return request({
        url: "/goods/goodAll"
    })
}