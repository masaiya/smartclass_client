import request from './network'

export function updateTargetLag(openid,targetLanguage) {
  return request({
    url: `/update/targetlag`,
    method: 'post',
    data: {openid,targetLanguage}
  })
}

export function getTargetLag(openid) {
  return request({
    url: `/get/targetlag?openid=${openid}`
  })
}