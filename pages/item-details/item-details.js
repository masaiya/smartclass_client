// pages/item-details/item-details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    playAudioIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      content: app.globalData.currentItemData,
    })
    console.log(this.data.content);
  },
  bindtimeupdate(e) {
    console.log(e.detail)
  },
  bindended() {
    if(this.data.playAudioIndex < this.data.content.fileUrls.length-1) {
      this.setData({
        playAudioIndex: this.data.playAudioIndex+1
      })
    } else {
      this.setData({
        playAudioIndex: 0
      })
    }
  }
})