// pages/diary-details/diary-details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '富文本编辑器正在加载'
    })
  },
  onEditorReady() {
    const that = this;
    console.log(app.globalData.currentDiaryData)
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec((res) => {
      wx.hideLoading({
        success: (res) => {
          console.log('detail 富文本编辑器加载完成')
        },
      })
      that.editorCtx.setContents({
        delta: app.globalData.currentDiaryData.delta
      });
    })
  },
})