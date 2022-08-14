import request from '@/utils/request'
// 基础题库列表
export const getQuestionListApi = (params) => request({
  url: '/questions',
  params
})
// 学科简单列表
export const getSubjectsSimpleListApi = (params) => request({
  url: '/subjects/simple',
  params
})
// 用户列表
export const getUserSimpleListApi = params => request({
  url: '/users',
  params
})
// // 基础题库查看详情
// export const getQuestionApi = id => request({
//   url: `/questions/${id}?id=${id}`
// })
// 基础题库详情
export const getQuestionInfoApi = id => request({
  url: `/questions/${id}?id=${id}`

})

// 基础题库详情
export const delQuestionApi = id => request({
  url: '/questions/' + id,
  method: 'DELETE'
})

// 基础题库收藏
export const saveQuestionApi = id => request({
  url: '/questions/choice/' + id + '/1',
  method: 'PATCH',
  id
})

// 基础题库添加
export const addQuestionApi = data => request({
  url: '/questions',
  method: 'POST',
  data
})

// 基础题库修改
export const editQuestionApi = data => request({
  url: '/questions/' + data.id,
  method: 'put',
  data
})

