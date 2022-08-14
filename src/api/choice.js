//题库 / 精选题库
import request from "@/utils/request";

//获取题库列表
export const getChoiceListApi = (params) => request({
    url: '/questions/choice',
    method: 'get',
    params
})
//获取用户列表
// /users
export const getUserApi = (params) => request({
    url: '/users',
    method: 'get',
    params
})
//上架
// /questions/choice/
export const publishApi = (data) => request({
    url: `/questions/choice/${data.id}/${data.publishState}`,
    method: 'post',
    data
})

//删除
export const DelquestionApi = (data) => request({
    url: `/questions/${data.id}`,
    method: 'DELETE',
    data
})

//审核 /questions/check/
export const questioncheckApi = (data) => request({
    url: `/questions/check/${data.id}`,
    method: 'post',
    data
})
//获取题目选项
export const getquestionOptApi = (params) => request({
    url: `/questions/${params.id}`,
    params
})

