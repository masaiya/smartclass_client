// pages/home.js
const app = getApp();
import {wordDist, ticketDist, busTicketDist} from '../../service/distApi'
import {getTargetLag,updateTargetLag} from '../../service/targetLag'
import {getHistory, postHistory} from '../../service/history'
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
    targetLanguage: [
      '中文','英语','日语','韩语','法语','西班牙语','德语','泰语','俄语','意大利语',
      '丹麦语','葡萄牙语','繁体中文'
    ],
    targetLanguageValue: [
      'zh','en','jp','kor','fra','spa','de','th','ru','it',
      'dan','pt','cht'
    ],
    value: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              app.globalData.userInfo = res.userInfo;
            },
            fail: (err) => {
              wx.showToast({
                title: '获取用户信息失败',
                icon: 'none'
              })
            }
          })
        }else {
          that.setData({
            isShowLogin: true
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '获取用户权限失败',
          icon: 'none'
        })
      }
    })
  },
  onShow() {
  },
  hrefVideo() {
    wx.navigateTo({
      url: '/pages/video/video'
    })
  },
  bindGetUserInfo(res) {
    this.setData({
      isShowLogin: false
    })
    const userInfo = res.detail.userInfo;
    if(userInfo) {
      app.globalData.userInfo = userInfo;
    }else {
      wx.showToast({
        title: '您并没有对我们进行身份授权，将无法获取当前用户信息',
        icon: 'none'
      })
    }
  },
  bindChange(e) {
    const val = e.detail.value;
    const targetLag = this.data.targetLanguageValue[val[0]];
    const openid = app.globalData.openid;
    updateTargetLag(openid,targetLag).then(res => {
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '修改目标语言失败',
        icon: 'none'
      })
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
      case '学习文章': {
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