// pages/newClass/newclass.js
const app = getApp();
import { baseURL } from '../../service/config'
import { formatTime } from '../../utils/util'
import { postNormalNotebookHistory, postSmallVideoHistory } from '../../service/history';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    text: '',
    title: '',
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 400,
    keyboardHeight: 0,
    isIOS: false,
    showSave: true,
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    wx.showLoading({
      title: '富文本编辑器正在加载'
    })
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS})
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)
      that.setData({
        showSave: !that.data.showSave
      })
    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  uploadFile(filepath) {
    const openid = app.globalData.openid;
    const that = this;
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        filePath: filepath,
        name: 'files',
        url: baseURL + '/upload',
        formData: {
          openid
        },
        success(res) {
          const url = JSON.parse(res.data).data.url
          resolve({
            urls: [url]
          })
        },
        fail(err) {
          console.log(err)
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          })
        }
      })
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: async function (res) {
        console.log(res.tempFilePaths)
        const uploadResult = await that.uploadFile(res.tempFilePaths[0]);
        const url = uploadResult.urls[0]
        console.log(url);
        that.editorCtx.insertImage({
          src: url,
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
            console.log('insert image success')
          }
        })
      }
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec(() => {
      wx.hideLoading({
        success: (res) => {
          console.log('富文本编辑器加载完成')
        },
      })
    })
  },
  inputTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindinput(e) {
    this.setData({
      content: e.detail.delta,
      text: e.detail.text
    })
  },
  saveDiary() {
    const content = this.data.content;
    const title = this.data.title;
    const text = this.data.text;
    const openid = app.globalData.openid;
    const time = Date.now();
    const params = {
      delta: content,
      title,
      text,
      createTime: formatTime(time),
      key: openid + time
    }
    if(!title || JSON.stringify(content) == '{}' ) {
      wx.showToast({
        title: '内容或者标题为空',
        icon: 'none'
      })
    } else {
      postNormalNotebookHistory(openid, params).then(res => {
        if(res.data.code !== 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          console.log(res.data);
        } else {
          wx.reLaunch({
            url: '/pages/diary/diary',
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
})