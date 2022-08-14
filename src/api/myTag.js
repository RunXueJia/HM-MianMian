
import request from "@/utils/request";


// 获取标签列表
export const getTaglistApi = (params) => {
  return request({
    url: "/tags",
    method: "get",
    params
  });

}

// 添加标签数据
export const addTagApi = (data) => {

  return request({
    url: "/tags",
    method: "post",
    data
  });

}

// 获取标签数据详情
export const getTagInfoApi = (id) => {

  return request({
    url: "/tags/" + id,
    method: "get",
  });

}

// 修改标签数据
export const editTagApi = (data) => {

  return request({
    url: "/tags/" + data.id,
    method: "put",
    data
  });

}

// 删除标签数据
export const delTagApi = (id) => {

  return request({
    url: "/tags/" + id,
    method: "DELETE",
  });
}

// 修改标签的状态
export const editTagStateApi = (id, state) => {
  return request({
    url: `/tags/${id}/${state}`,
    method: "post",
  });
}



