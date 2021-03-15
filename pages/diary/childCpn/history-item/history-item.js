import {formatTime} from '../../../../utils/util'
// pages/history/childCpn/history-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    formatData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {
      const data = this.properties.data
      const date = formatTime(data.date)
      let word = ''
      const result = data.result.words_result
      if(Array.isArray(result)) {
        result.forEach((item) => {
          word += (item.words+'.')
        })
      }else {
        for(let key in result) {
          word += result[key]
        }
      }
      this.setData({
        formatData: {
          date,
          word,
          type
        }
      })
    }
  }
})
