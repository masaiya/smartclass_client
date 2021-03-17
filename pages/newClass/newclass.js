// pages/newClass/newclass.js
const app = getApp();
import { baseURL } from '../../service/config'
import { longAudioDist, shortAudioDist } from "../../service/distApi";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive: false,
    recorderManager: wx.getRecorderManager(),
    audioUrl: '',
    res: ''
  },
  beginRecoder() {
    this.setData({
      isActive: !this.data.isActive
    })
    const recorderManager = this.data.recorderManager;
    recorderManager.start({
      format: 'wav',
      sampleRate: 16000,
      encodeBitRate: 64000,
      numberOfChannels: 1,
    })
    recorderManager.onError((errmsg) => {
      wx.showToast({
        title: '录音失败',
        icon: 'none'
      })
      recorderManager.stop();
    })
    recorderManager.onStop((res) => {
      const filePath = res.tempFilePath;
      this.uploadFile(filePath).then(res => {
        longAudioDist({
          filename: res.filename
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
        shortAudioDist({
          filename: res.filename
        }).then(res => {
          console.log(res);
          this.setData({res: this.data.res + res.data.data.result})
        }).catch(err => {
          console.log(err);
        })
      });
    })
  },
  colseRecoder() {
    this.setData({
      isActive: !this.data.isActive
    })
    this.data.recorderManager.stop();
  },
  uploadFile(files) {
    const openid = app.globalData.openid;
    const that = this;
    return new Promise((reslove,reject) => {
      wx.uploadFile({
        filePath: files,
        name: 'files',
        url: baseURL + '/upload',
        formData: {
          openid
        },
        success(res) {
          reslove(JSON.parse(res.data).data);
        },
        fail(err) {
          console.log(err)
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          })
          reject();
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const recorderManager = wx.getRecorderManager();
    this.setData({
      uplaodFile: this.uploadFile.bind(this)
    })
    this.setData({
     recorderManager
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})