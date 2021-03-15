import request from './network'

export function getUserInfo(openid) {
  return request({
    url: `/get/userInfo?openid=${openid}`
  })
}

export function editUserInfo(data) {
  return request({
    url: `/edit/userInfo`,
    method: 'post',
    data
  })
}