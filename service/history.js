import request from './network'

export function getLongVideoHistory(openid) {
  return request({
    url: `/audioNotebook?openid=${openid}`
  })
}

export function postLongVideoHistory(openid,historyData) {
  return request({
    url: `/audioNotebook`,
    method: 'post',
    data: {
      openid,
      key: historyData.key,
      createTime: historyData.createTime,
      fileUrls: historyData.fileUrls,
      distResult: historyData.distResult,
      title: historyData.title
    },
    contentType: 'application/json'
  })
}

export function deleteLongVideoHistory(openid,key) {
  return request({
    url: `/delete/audioNotebook?openid=${openid}&key=${key}`,
    method: 'delete'
  })
}

export function getSmallVideoHistory(openid) {
  return request({
    url: `/smallVideo?openid=${openid}`
  })
}

export function postSmallVideoHistory(openid,historyData) {
  return request({
    url: `/smallVideo`,
    method: 'post',
    data: {
      openid,
      key: historyData.key,
      createTime: historyData.createTime,
      fileUrls: historyData.fileUrls,
      distResult: historyData.distResult,
      title: historyData.title
    },
    contentType: 'application/json'
  })
}

export function deleteSmallVideoHistory(openid,key) {
  return request({
    url: `/delete/smallVideo?openid=${openid}&key=${key}`,
    method: 'delete'
  })
}

export function getNormalNotebookHistory(openid) {
  return request({
    url: `/normalNotebook?openid=${openid}`
  })
}

export function postNormalNotebookHistory(openid,historyData) {
  return request({
    url: `/normalNotebook`,
    method: 'post',
    data: {
      openid,
      key: historyData.key,
      createTime: historyData.createTime,
      distResult: historyData.distResult,
      title: historyData.title
    },
    contentType: 'application/json'
  })
}

export function deleteNormalNotebookHistory(openid,key) {
  return request({
    url: `/delete/normalNotebook?openid=${openid}&key=${key}`,
    method: 'delete'
  })
}

export function mergeFiles(filename) {
  return request({
    url: `/mergeFiles?filename=${filename}`,
  })
}

export function test(filename) {
  return request({
    url: `/test?filename=${filename}`,
  })
}