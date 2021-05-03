// pages/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowLogin: false,
    topImages: [
      '/assets/images/banner1.png',
    ],
    menuImages: [
      {
        image: '/assets/images/jingpinketang.png', 
        name: '智慧课堂'
      },
      {
        image: '/assets/images/yuyin.png', 
        name: '语音笔记'
      },
      {
        image: '/assets/images/riji.png', 
        name: '日记本'
      }
    ],
    menuImages1: [
      {
        image: '/assets/images/wenzhang.png', 
        name: '今日美文'
      },
      {
        image: '/assets/images/wo.png', 
        name: '个人信息'
      },
    ],
    isToUserInfo: false,
    value: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const userInfo = wx.getStorageSync('userInfo');
    if(!userInfo) {
      this.setData({
        isShowLogin: true
      })
      wx.hideTabBar({
        animation: true,
      })
    } else {
      app.globalData.userInfo = userInfo;
    }
  },
  denialAuthorization() {
    this.setData({
      isShowLogin: false,
    })
    wx.showToast({
      title: '您并没有对我们进行身份授权，将无法获取当前用户信息',
      icon: 'none'
    })
  },
  bindGetUserInfo() {
    const that = this;
    wx.getUserProfile({
      desc: "展示用户个人信息",
      success(res) {
        if(res.userInfo) {
          wx.setStorageSync('userInfo', res.userInfo);
          app.globalData.userInfo = res.userInfo;
        }else {
          wx.showToast({
            title: '您并没有对我们进行身份授权，将无法获取当前用户信息',
            icon: 'none'
          })
        }
        that.setData({
          isShowLogin: false
        })
        wx.showTabBar({
          animation: true,
        })
        if(that.data.isToUserInfo) {
          wx.navigateTo({
            url: '/pages/profileInfo/profileInfo'
          })
        }
      },
      fail(err) {
        console.log(err)
      }
    });
  },
  hrefVideo() {
    wx.navigateTo({
      url: '/pages/video/video'
    })
  },
  handleMenuTap(event) {
    const menuName = event.currentTarget.dataset.menuname;
    switch(menuName) {
      case '个人信息': {
        wx.login({
          success (res) {
            app.globalData.code = res.code;
          }
        })
        if(!app.globalData.userInfo) {
          wx.showModal({
            content: '您还未进行登录，如果要查看用户信息，请登录',
            success: (res) => {
              if(res.confirm) {
                this.setData({
                  isShowLogin: true,
                  isToUserInfo: true
                })
              }
            }
          })
        }else {
          wx.navigateTo({
            url: '/pages/profileInfo/profileInfo'
          })
        }
        break;
      }
      case '智慧课堂': {
        wx.navigateTo({
          url: '/pages/class/class'
        })
        break;
      }
      case '语音笔记': {
        wx.navigateTo({
          url: '/pages/voice_notes/voice_notes'
        })
        break;
      }
      case '日记本': {
        wx.navigateTo({
          url: '/pages/diary/diary'
        })
        break;
      }
      case '今日美文': {
        wx.navigateTo({
          url: '/pages/article/article'
        })
        break;
      }
      default: {
        break;
      }
    }
  }
})