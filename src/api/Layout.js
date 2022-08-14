import request from "@/utils/request";
// 获取分类列表
export const getsearchListApi = () => {
    return request({
        url: "/search/foods",
        method: "get",
    });
};