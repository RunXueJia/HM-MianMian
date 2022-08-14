
import request from '@/utils/request'

export const gethotlistApi = (params) => {
    return request({
        url: "/vue-admin-template/index/hot",
        params
    })
}

// 获取门店Api
export const getstoreApi = () => {
    return request({
        url: "/get/ranking/list"
    })
}