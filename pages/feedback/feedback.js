// pages/feedback/feedback.js
import {feedback} from '../../service/feedback'
import {baseURL} from '../../service/config'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackTypes: [
      '录音异常','转换异常','报个bug','其他'
    ],
    index: 0,
    files: [],
    imageUrls: [],
    word: ''
  },
  onLoad() {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uploadFile.bind(this)
    })
  },
  chooseImage: function (e) {
      const that = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            files: that.data.files.concat(res.tempFilePaths)
          });
        }
      })
  },
  previewImage: function(e){
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    return true;
  },
  uploadFile(files) {
    const openid = app.globalData.openid;
    const that = this;
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        filePath: files.tempFilePaths[0],
        name: 'files',
        url: baseURL + '/upload',
        formData: {
          openid
        },
        success(res) {
          const url = JSON.parse(res.data).data.url
          that.data.imageUrls.push(url)
          const imageUrls = that.data.imageUrls
          that.setData({
            imageUrls
          })
          resolve({
            urls: [url]
          })
        },
        fail(err) {
          console.log(err)
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          })
        }
      })
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  inputWord(e) {
    this.setData({
      word: e.detail.value
    })
  },
  submitFeedback() {
    const openid = app.globalData.openid
    const word = this.data.word
    const feedbackType = this.data.feedbackTypes[this.data.index]
    const imageUrls = this.data.imageUrls
    feedback(openid, word, imageUrls, feedbackType).then(res => {
      if(res.data.message === 'ok') {
        wx.showToast({
          title: '您的反馈我们已经收到,感谢您的帮助',
          icon: 'none'
        })
      }else {
        wx.showToast({
          title: '服务器出错了，请稍后再试',
          icon: 'none'
        })
      }
    })
  }
})