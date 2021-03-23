// pages/voice_notes/voice_notes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [
      {
        word: '余固知謇謇之为患兮，忍而不能舍也。指九天以为正兮，夫惟灵修之故也。曰黄昏以为期兮，羌中道而改路。初既与余成言兮，后悔遁而有他。余既不难夫离别兮，伤灵修之数化。余既滋兰之九畹兮，又树蕙之百亩。',
        date: '2021.2.8 11.12.36'
      },
      {
        word: '岂曰无衣？与子同袍。王于兴师，修我戈矛。与子同仇。岂曰无衣？与子同泽。王于兴师，修我矛戟。与子偕作。岂曰无衣？与子同裳。王于兴师，修我甲兵。与子偕行。',
        date: '2021.2.8 12.01.18'
      },
      {
        word: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。',
        date: '2021.2.9 12.50.17'
      }
    ]
  },
  bottomClick() {
    wx.navigateTo({
      url: '/pages/new_voice_notes/new_voice_notes'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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