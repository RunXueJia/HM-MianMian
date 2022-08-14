import request from "@/utils/request";
export const getPermissionList = (params) =>
  request({
    url: "/permissions",
    method: "GET",
    params,
  });

export const addPermission = (data) =>
  request({
    url: "/permissions",
    method: "post",
    data,
  });

export const delPermission = (id) =>
  request({
    url: "/permissions/" + id,
    method: "delete",
  });

export const getPermissionInfo = (id) =>
  request({
    url: "/permissions/" + id,
    method: "GET",
  });

export const editPermission = (data) =>
  request({
    url: "/permissions/" + data.id,
    method: "put",
    data,
  });
