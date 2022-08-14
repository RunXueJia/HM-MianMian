
import request from "@/utils/request";


//学科简单列表
export const getSimpleSubjectApi = (data) => {
  return request({
    url: "/subjects/simple",
    method: "get",
    data
  });

}

// 获取学科列表
export const getSubjectApi = (params) => {

  return request({
    url: "/subjects",
    method: "get",
    params,
  });

}

// 添加学科数据
export const addSubjectApi = (data) => {

  return request({
    url: "/subjects",
    method: "POST",
    data
  });

}

// 获取学科数据详情
export const getSubjectInfoApi = (id) => {

  return request({
    url: "/subjects/" + id,
    method: "get",
  });

}

// 修改学科数据
export const editSubjectApi = (data) => {

  return request({
    url: "/subjects/" + data.id,
    method: "put",
    data
  });

}

// 删除学科数据
export const delSubjectApi = (id) => {

  return request({
    url: "/subjects/" + id,
    method: "DELETE",
  });

}
