// pages/setup/setup.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    setupList: [
      // { icon: 'xiaoxi.png', info: '我的消息' },
      { icon: 'feedback_active.svg', info: '问题反馈' },
      // { icon: 'history_active.svg', info: '历史记录' },
      { icon: 'setting_active.svg', info: '设置' },
    ],
    username: '请登录',
    avatar: '/assets/images/profile_white.svg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.setData({
      username: app.globalData.userInfo ? app.globalData.userInfo.nickName  : '请登录',
      avatar: app.globalData.userInfo ? app.globalData.userInfo.avatarUrl : '/assets/images/profile_white.svg'
    })
  },
  seeInfo() {
    if(!app.globalData.userInfo) {
      wx.showToast({
        title: '您还未进行登录，请在首页进行微信登录才能访问个人信息',
        icon: 'none',
        duration: 3000
      })
    }else {
      wx.navigateTo({
        url: '/pages/profileInfo/profileInfo',
      })
    }
  }
})