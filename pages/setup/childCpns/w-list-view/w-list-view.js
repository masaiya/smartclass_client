// pages/profile/childCpns/w-list-view/w-list-view.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infos: {
      type: Array
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
    handleTap(event) {
      const itemName = event.currentTarget.dataset.itemname;
      switch(itemName) {
        case '问题反馈': {
          wx.navigateTo({
            url: '/pages/feedback/feedback',
          })
          break;
        }
        case '历史记录': {
          wx.navigateTo({
            url: '/pages/history/history',
          })
          break;
        }
        case '设置': {
          wx.navigateTo({
            url: '/pages/setting/setting',
          })
          break;
        }
        default: 
          break;
      }
    }
  }
})
