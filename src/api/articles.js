import request from "@/utils/request";



// 获取文章列表

export const getArticleslistApi = (params) => {
    return request({
        url: "/articles",
        method: "get",
        params
    });
}


// 添加文章列表

export const addArticlesApi = (data) => {
    return request({
        url: "/articles",
        method: "post",
        data
    });
}
// 获取文章详情

export const getArticlesInfoApi = (id) => {
    return request({
        url: "/articles/" + id,
        method: "get",
    });
}


// 编辑文章列表

export const editArticlesApi = (data) => {
    return request({
        url: "/articles/" + data.id,
        method: "put",
        data
    });
}


// 删除文章列表

export const delArticlesApi = (id) => {
    return request({
        url: "/articles/" + id,
        method: "delete",
    });
}


// 修改目录的状态

export const editArticlesStateApi = (id, state) => {
    return request({
        url: `/articles/${id}/${state}`,
        method: "post",
    });

}

