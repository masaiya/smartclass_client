import {formatTime} from '../../../../utils/util'
import { deleteNormalNotebookHistory } from '../../../../service/history';
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    },
    audioNum: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showDelete: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    seeDetails() {
      app.globalData.currentDiaryData = this.properties.data;
      wx.navigateTo({
        url: "/pages/diary-details/diary-details"
      })
    },
    handleMask() {
      this.setData({
        showDelete: false
      })
    },
    handleLongpress(e) {
      // this.setData({
      //   deleteButtonY: e.detail.y,
      //   deleteButtonX: e.detail.x
      // })
      this.setData({
        showDelete: true
      })
    },
    calcle() {
      this.setData({
        showDelete: false
      })
    },
    deleteItem() {
      deleteNormalNotebookHistory(app.globalData.openid, this.properties.data.key).then(res => {
        if(res.data.message == 'ok') {
          //让父组件更新
          this.triggerEvent('onDelete')
        }else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
  lifetimes: {
  }
})
