// components/voice/voice-line.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    duration: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: '200rpx',
    formatDuration: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //将语音时长转换成语音条程度的函数1s=1rpx
    duration2Width(duration) {
      if(duration >= 450) {
        return '450rpx'
      }
      if(duration <= 10) {
        return '10rpx'
      }
      return duration*5+'rpx'
    },
    formatDuration(duration) {
      if(duration < 60) return duration+"''"
      return parseInt(duration/60) + "'" + duration%60 + "''"
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        width: this.duration2Width(this.properties.duration),
        formatDuration: this.formatDuration(this.properties.duration)
      })
    }
  }
})
