import request from '@/utils/request'
// 获取分类列表
export const getCateListApi = (params) => {
  return request({
    url: '/vue-admin-template/cate',
    method: 'GET',
    params
  })
}
// 获取分类详情
export const getCateInfoApi = (id) => {
  return request({
    url: '/vue-admin-template/cate/' + id,
    method: 'GET'
  })
}
// 增加分类详情
export const addCateApi = (data) => {
  return request({
    url: '/vue-admin-template/cate',
    method: 'post',
    data
  })
}
// 修改分类详情
export const editCateApi = (data) => {
  return request({
    url: '/vue-admin-template/cate/' + data.id,
    method: 'put',
    data
  })
}
// 删除分类数据
export const delCateApi = (id) => {
  return request({
    url: '/vue-admin-template/cate/' + id,
    method: 'delete'
  })
}
