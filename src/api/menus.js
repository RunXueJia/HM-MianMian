import request from "@/utils/request";
export const getPermissionMenus = () =>
  request({
    url: "/menus",
    method: "GET",
  });

export const addPermissionMenus = (data) =>
  request({
    url: "/menus",
    method: "POST",
    data,
  });

export const delPermissionMenus = (id) =>
  request({
    url: "/menus/" + id,
    method: "delete",
  });

export const getPermissionInfo = (id) =>
  request({
    url: "/menus/" + id,
    method: "get",
  });

export const editPermissionInfo = (data) =>
  request({
    url: "/menus/" + data.id,
    method: "put",
    data,
  });
