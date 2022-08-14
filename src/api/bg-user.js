
import request from "@/utils/request";

export const getBgUserList = (params) =>
  request({
    url: "/users",
    method: "get",
    params,
  });

export const addBgUser = (data) =>
  request({
    url: "/users",
    method: "post",
    data,
  });

export const getBgUserInfo = (id) =>
  request({
    url: "/users/" + id,
    method: "get",
  });

export const editBgUserInfo = (data) =>
  request({
    url: "/users/" + data.id,
    method: "put",
    data,
  });

export const delBgUser = (id) =>
  request({
    url: "/users/" + id,
    method: "delete",
  });

