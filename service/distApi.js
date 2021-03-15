import request from './network'

// export function getBaiduToken(apiKey,secretKey) {
//   return request({
//     url: `/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`,
//   })
// }
export function longAudioDist(data) {
  return request({
    url: `/longAudioDist`,
    method: 'post',
    data,
    contentType: 'application/json',
    timeout: '600000'
  })
}
export function shortAudioDist(data) {
  return request({
    url: `/shortAudioDist`,
    method: 'post',
    data,
    contentType: 'application/json',
    timeout: '600000'
  })
}
