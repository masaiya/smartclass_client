import {timeout,baseURL} from "./config"
export default function (options) {
  wx.showLoading({
    title: '数据加载中...',
  })
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || "get",
      header: options.header || {},
      data: options.data || {},
      success: resolve,
      fail: reject,
      timeout: options.timeout || timeout,
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': options.contentType || 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}