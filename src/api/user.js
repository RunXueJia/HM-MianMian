import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/frame/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/frame/profile',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
