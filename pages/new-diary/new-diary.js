// pages/newClass/newclass.js
const app = getApp();
import { baseURL } from '../../service/config'
import { postSmallVideoHistory } from '../../service/history';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },
  onLoad: function (options) {
    
  },
  onStatusChange() {

  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  inputTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  saveDiary() {

  }
})