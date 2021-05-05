// pages/class/class.js
const app = getApp();
import { baseURL } from '../../service/config'
import { formatTime } from '../../utils/util'
import { getNormalNotebookHistory, mergeFiles } from '../../service/history';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyData: [],
    res: '',
    hasHistory: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistoryData()
  },
  onDelete() {
    this.getHistoryData();
  },
  getHistoryData() {
    const that = this;
    const openid = app.globalData.openid;
    getNormalNotebookHistory(openid).then(res => {
      if(res.data.code !== 0 || !res.data.data) {
        that.setData({
          hasHistory: false
        })
      }else {
        that.setData({
          hasHistory: true,
          historyData: res.data.data.content
        })
      }
    })
  },
  bottomClick() {
    wx.navigateTo({
      url: '/pages/new-diary/new-diary'
    })
  },
})