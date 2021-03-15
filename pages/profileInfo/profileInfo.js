// pages/profileInfo/profileInfo.js
import { getUserInfo, editUserInfo } from '../../service/userInfo'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    gender: "暂无",
    avatar: '',
    phone: '暂无',
    disabled: false,
    birthday: '暂无',
    country: '暂无'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickname: app.globalData.userInfo?app.globalData.userInfo.nickName : '',
      avatar: app.globalData.userInfo?app.globalData.userInfo.avatarUrl : '/assets/profile/avatar.png'
    })
    this.getUserInfo()
  },
  getUserInfo() {
    wx.getStorage({
      key: 'token',
    }).then(res => {
      if(res.data) {
        const openid = res.data.split(',')[1]
        getUserInfo(openid).then(res => {
          if(res.data.message !== 'ok') {
            wx.showToast({
              title: '请求失败',
              icon: 'none'
            })
          }else {
            const data = res.data.data;
            this.setData({
              gender: data.gender,
              country: data.country,
              birthday: data.birthday,
              phone: data.phone
            })
          }
        }).catch(err => {
          console.log(err);
        })
      }else {
        wx.showToast({
          title: '获取用户token失败',
          icon: 'none'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  formSubmit(event) {
    const data = event.detail.value;
    wx.getStorage({
      key: 'token',
    }).then(res => {
      if(res.data) {
        const openid = res.data.split(',')[1]
        editUserInfo({...data,openid}).then(res => {
          if(res.data.message !== 'ok') {
            wx.showToast({
              title: '请求失败',
              icon: 'none'
            })
          }else {
            this.getUserInfo()
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
})