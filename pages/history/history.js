import {getHistory} from '../../service/history'
const app = getApp()
// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyData: [],
    hasHistory: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const openid = app.globalData.openid
    getHistory(openid).then(res => {
      if(res.data.message==='ok')  {
        const data = res.data.data
        const historyData = data.historyData
        if(historyData.length === 0) {
          that.setData({
            hasHistory: false
          })
        }else {
          that.setData({
            historyData
          })
        }
      }else {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
        that.setData({
          hasHistory: false
        })
      }
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: 'get history error',
        icon: 'none'
      })
    })
  }
})