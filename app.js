//app.js
import {wxlogin} from './service/login'
// import {getBaiduToken} from './service/distApi'
App({
  onLaunch: function () {
    const that = this;
    wx.checkSession({
      success: (res) => {
        console.log('获取登录态成功');
        wx.getStorage({
          key: 'token',
          success(res) {
            that.globalData.openid = res.data.split(',')[1];
          },
          fail(err) {
            console.log(err);
            wx.showToast({
              title: 'get openid error',
              icon: 'none'
            })
          }
        })
      },
      fail: (err) => {
        console.log('获取登录态失败');
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
      }
    })
    //短语音识别key
    // getBaiduToken(distApiKey,distSecretKey).then(res => {
    //   const data = res.data;
    //   if(data.err) {
    //     wx.showToast({
    //       title: data.error_description,
    //       icon: 'none'
    //     })
    //   }else {
    //     // wx.setStorage({
    //     //   data: data.access_token,
    //     //   key: 'baidu_dist_token',
    //     // })
    //     that.globalData.baidu_dist_token = data.access_token;
    //   }
    // }).catch(err => {
    //   console.log(err);
    //   wx.showToast({
    //     title: 'get baidu access_token fail',
    //     icon: 'none'
    //   })
    // });
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
    trainTicketDistResult: {}
  }
})