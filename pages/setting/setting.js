Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentVersion: 'V1.0.1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getCurrentVersion() {
    return 'V1.0.1'
  },
  updateVersion() {
    console.log('更新中...');
  },
  updateVersion() {
    const that = this;
    if(this.getCurrentVersion() !== this.data.currentVersion) {
      wx.showLoading({
        title: '更新中',
      })
      setTimeout(() => {
        that.updateVersion();
        wx.hideLoading({
          success: (res) => {
            console.log('update finish')
          },
        })
      },3000)
    } else {
      wx.showToast({
        title: '当前已经是最新版本，无需更新',
        icon: 'none'
      })
    }
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