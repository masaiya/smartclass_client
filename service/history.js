import request from './network'

export function getHistory(openid) {
  return request({
    url: `/get/history?openid=${openid}`
  })
}

export function postHistory(openid,historyData) {
  return request({
    url: `/post/history`,
    method: 'post',
    data: {openid,historyData},
    contentType: 'application/json'
  })
}