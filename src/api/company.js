
//wangmo

import request from "@/utils/request";

//企业管理列表
export const getCompanyListApi = (params) => {
  return request({
    url: "/companys",
    method: "GET",
    params,
  });
};
//企业管理设置状态
export const changeCompanyStateApi = (id, state) => {
  return request({
    url: `/companys/${id}/${state}`,
    method: "post",
  });
}
////企业管理添加
export const addCompanyApi = (data) => {
  return request({
    url: "/companys",
    method: "POST",
    data,
  });
};
////企业管理详情
export const getCompanyInfoApi = (id) => {
  return request({
    url: "/companys/" + id,
    method: "GET",
  });
};
//企业管理修改
export const editCompanyApi = (data) => {
  return request({
    url: "/companys/" + data.id,
    method: "PUT",
    data
  });
};
//企业管理删除
export const delCompanyApi = (id) => {
  return request({
    url: "/companys/" + id,
    method: "DELETE",
  });
};

