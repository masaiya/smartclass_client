import request from './network'

export function getArticleData(key) {
  return request({
    url: `/getArticleData?key=${key}`,
  })
}

export function postArticleData(data) {
  return request({
    url: `/postArticleData`,
    method: 'post',
    data: {
      content: data.content,
      key: data.key,
      title: data.title
    },
    contentType: 'application/json',
  })
}