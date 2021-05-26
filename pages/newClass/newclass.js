// pages/newClass/newclass.js
const app = getApp();
import { baseURL } from '../../service/config'
import { longAudioDist, shortAudioDist } from "../../service/distApi";
import { postLongVideoHistory, mergeFiles } from '../../service/history';
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
    showTime: '00:00:00',
    title: '',
    fileUrls: []
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
    var that = this;
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
      const fileTime = res.duration/1000;
      this.uploadFile(filePath).then(res => {
        that.data.fileUrls.push(res.url)
        that.setData({
          fileUrls: that.data.fileUrls
        })
        if(fileTime < 60) {
          shortAudioDist({
            filename: res.filename
          }).then(res => {
            const data = res.data.data;
            if(data.result[0] == '' || data.err_no !== 0) {
              wx.showToast({
                title: '识别失败',
                icon: 'error'
              })
            }else {
              that.setData({res: that.data.res + res.data.data.result})
            }
          }).catch(err => {
            console.log(err);
          })
        }else {
          longAudioDist({
            filename: res.filename
          }).then(res => {
            if(!res.data.data || typeof res.data.data == 'object') {
              wx.showToast({
                title: '识别失败',
                icon: 'error'
              })
            } else {
              that.setData({res: that.data.res + res.data.data})
            }
          }).catch(err => {
            console.log(err);
          })
        }
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
  inputTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  uploadYuyin() {
    const that = this;
    if(!this.data.title) {
      wx.showToast({
        title: '请输入标题再进行提交',
        icon: 'none'
      })
    }else if(!this.data.res) {
      wx.hideToast({});
      wx.showToast({
        title: '没有识别内容',
        icon: 'none'
      })
    } else {
      const historyData = {
        key: app.globalData.openid + Date.now(),
        createTime: Date.now(),
        fileUrls: this.data.fileUrls,
        distResult: that.data.res,
        title: this.data.title
      }
      postLongVideoHistory(app.globalData.openid, historyData).then(res => {
        if(res.data.code == 0) {
          wx.reLaunch({
            url: '/pages/class/class',
          })
        }else {
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
        }
      }).catch(err => {
        console.log(err);
      }) 
    }
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
})