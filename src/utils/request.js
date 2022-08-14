import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axiOS实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 配置基准地址
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // if (store.getters.token) {
    // 携带token
    // 注意不一定是x-token ，有可能是Authorization，也有可能是别的
    if (getToken()) {
      config.headers = {
        Authorization: `Bearer ` + getToken()
      }
    }

    // }
    // console.log(config);
    return config
  },
  (error) => {
    console.log(error) // for debug`
    return Promise.reject(error)

  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log(response);
    const { data } = response
    // console.log(response);
    return data
    // if (response.status ===200) {
    //   return data;
    // } else {
    //   // 业务错误
    //   Message.error(message);
    //   return Promise.reject(message);
    // }
  },
  (error) => {
    // 请求错误
    return Promise.reject(error)
  }
)

export default service
