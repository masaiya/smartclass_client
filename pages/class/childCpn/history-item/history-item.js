import {formatTime} from '../../../../utils/util'
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    seeDetails() {
      app.globalData.currentItemData = this.properties.data;
      wx.navigateTo({
        url: "/pages/item-details/item-details"
      })
    }
  },
  lifetimes: {
  }
})
