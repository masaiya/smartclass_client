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
    res: '',
    timer: null,
    time: 0,
    showTime: '00:00:00'
  },
  format() {
    var secondTime = parseInt(this.data.time); // 秒
    var minuteTime = 0; // 分
    var hourTime = 0; // 小时
    if (secondTime > 60) {
      minuteTime = parseInt(secondTime / 60);
      secondTime = parseInt(secondTime % 60);
      if (minuteTime > 60) {
        hourTime = parseInt(minuteTime / 60);
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    if(secondTime <= 9) secondTime = "0"+secondTime;
    if(minuteTime <= 9) minuteTime = "0"+minuteTime;
    if(hourTime <= 9) hourTime = "0"+hourTime;
    this.setData({
      showTime: hourTime+':'+minuteTime+":"+secondTime
    })
  },
  beginRecoder() {
    let that = this;
    this.setData({
      isActive: !this.data.isActive,
      timer: setInterval(function(){
        that.setData({
          time: that.data.time + 1
        })
        that.format();
      }, 1000)
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
        // longAudioDist({
        //   filename: res.filename
        // }).then(res => {
        //   console.log(res);
        //   this.setData({res: this.data.res + res.data.data})
        // }).catch(err => {
        //   console.log(err);
        // })
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
    clearInterval(this.data.timer);
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
    // app.setWatcher(this.data, this.watch); // 设置监听器
    const recorderManager = wx.getRecorderManager();
    this.setData({
      uplaodFile: this.uploadFile.bind(this)
    })
    this.setData({
     recorderManager
    })
  },

  // watch: {
  //   isActive: function(newValue) {
  //     setTimeout(function(){
  //       this.setData({
  //         time: this.data.time + 1
  //       })
  //       console.log(this.data.time);
  //     }, 1000);
      // var timer;
      // if(newValue === true) {
      //   timer = setInterval(function(){
      //     this.setData({
      //       time: this.data.time + 1
      //     })
      //     console.log(this.data.time);
      //   }, 1000);
      // } else {
      //   timer = null;
      // }
  //   }
  // },
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