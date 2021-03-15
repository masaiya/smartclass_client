import request from './network'

export function feedback(openid,word,imageUrls,feedbackType) {
  return request({
    url: `/feedback`,
    method: 'post',
    data: {openid,word,imageUrls,feedbackType},
  })
}