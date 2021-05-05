// pages/class/class.js
const app = getApp();
import { baseURL } from '../../service/config'
import { formatTime } from '../../utils/util'
import { longAudioDist, shortAudioDist } from "../../service/distApi";
import { getLongVideoHistory, deleteLongVideoHistory, mergeFiles } from '../../service/history';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    audioUrl: '',
    historyData: [],
    res: '',
    hasHistory: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistoryData();
  },
  onDelete() {
    this.getHistoryData();
  },
  getHistoryData() {
    const that = this;
    const openid = app.globalData.openid;
    getLongVideoHistory(openid).then(res => {
      if(res.data.code !== 0 || !res.data.data) {
        that.setData({
          hasHistory: false
        })
      }else {
        const data = res.data.data.content;
        that.setData({
          hasHistory: true
        })
        data.forEach((item) => {
          item.createTime = formatTime(item.createTime);
        })
        if(data) {
          that.setData({
            historyData: data
          })
        }
        // console.log(data)
        // mergeFiles(data[0].fileUrls).then(res => {
        //   console.log(res);
        // }).catch(err => {
        //   console.log(err)
        // })
      }
    })
  },
  bottomClick() {
    wx.navigateTo({
      url: '/pages/newClass/newclass'
    })
  },
})