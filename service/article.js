import request from './network'

export function getArticleData(key) {
  return request({
    url: `/getArticleData?key=${key}`,
  })
}

export function postArticleData(key, title, content) {
  return request({
    url: `/postArticleData`,
    method: 'post',
    data: {
      content,
      key,
      title
    },
    contentType: 'application/json',
  })
}