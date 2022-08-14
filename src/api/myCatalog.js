
import request from "@/utils/request";


// 获取目录列表
export const getDirectoryslistApi = (params) => {
  return request({
    url: "/directorys",
    method: "get",
    params
  });

}

// 添加目录数据
export const addDirectorysApi = (data) => {

  return request({
    url: "/directorys",
    method: "post",
    data
  });

}

// 获取目录数据详情
export const getDirectorysInfoApi = (id) => {

  return request({
    url: "/directorys/" + id,
    method: "get",
  });

}

// 修改目录数据
export const editDirectorysApi = (data) => {

  return request({
    url: "/directorys/" + data.id,
    method: "put",
    data
  });

}

// 删除目录数据
export const delDirectorysApi = (id) => {

  return request({
    url: "/directorys/" + id,
    method: "DELETE",
  });
}


// 修改目录的状态
export const editDirectorysStateApi = (id, state) => {
  return request({
    url: `/directorys/${id}/${state}`,
    method: "post",
  });
}


