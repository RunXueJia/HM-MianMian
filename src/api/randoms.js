import request from "@/utils/request";

//获取组题列表
export const getrandomListApi = (params) => request({
    url: `/questions/randoms`,
    method: 'get',
    params
})
//删除
export const delrandomListApi = (params) => request({
    url: `/questions/randoms`,
    method: 'delete',
    params
})
