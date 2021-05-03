//app.js
import {wxlogin} from './service/login'
// import {getBaiduToken} from './service/distApi'
App({
  onLaunch: function () {
    const that = this;
    wx.login({
      success (res) {
        that.globalData.code = res.code;
        //登录
        wxlogin(res.code).then(res => {
          wx.setStorage({
            data: res.data.data,
            key: 'token',
          })
          that.globalData.openid = res.data.data.split(',')[1];
        }).catch(err => {
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          })
        })
      },
      fail() {
        wx.showToast({
          title: 'login false',
          icon: 'none'
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    code: '',
    openid: '',
    baidu_dist_token: '',
    menuDistResult: {},
    identDistResult: {},
    baseDistResult: {},
    busTicketDistResult: {},
    trainTicketDistResult: {},
    currentItemData: {}
  }
})