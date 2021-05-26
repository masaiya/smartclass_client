import { postNormalNotebookHistory } from '../../service/history'
import { getArticleData, postArticleData } from '../../service/article'
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    content: [],
    currentArticleKey: 0,
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const currentTime = wx.getStorageSync('currentTime');
    let currentArticleKey = wx.getStorageSync('currentArticleKey');
    if(!currentTime && !currentArticleKey) {
      wx.setStorageSync('currentArticleKey', 0)
      wx.setStorageSync('currentTime', Date.now())
      this.getArticleData(0);
    } else {
      if(Date.now() - currentTime > 8640000) {
        wx.setStorageSync('currentArticleKey', currentArticleKey+1)
        wx.setStorageSync('currentTime', Date.now());
        console.log(currentArticleKey)
        this.getArticleData(currentArticleKey+1);
      } else {
        this.getArticleData(currentArticleKey);
      }
    }
  },
  getArticleData(key) {
    getArticleData(key).then(res => {
      if(res.data.code !== 0) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }else {
        this.setData({
          content: res.data.data.content,
          title: res.data.data.title
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  toFirend() {
    this.postArticleData();
  },
  postArticleData() {
    const data =       {
      "title": "人间烟火",
      "content": [
        "  我时常无端地喜欢一些东西，比如烟火。",
        "  在乡村，傍晚的时候，我喜欢抬头望天，看那些飘飘渺渺从各家烟窗里冒出来的烟，于是我的魂常常被炊烟摄走。看着它们从烟窗冒出来，使我总以为有一个人在屋子里抽着一根大大的香烟，我能想象他狠狠吸一口，再慢慢把烟从鼻孔里喷出来。烟由浓到淡，由粗到细，由近到远，起先是结实的，像根烟柱子，后来袅袅成婀娜的样子，再悠悠飘忽成一缕缕，弥漫成一片。它们要去哪儿呢？你看，东家的，西家的，前面的，后面的，烟窗里的，瓦面上的，都混到了一起，最后消失不见了。",
        "  早上的时候，炊烟要淡一些，一切都是朦胧的，仿佛刚睡醒的样子。如果站在高处往下看，房子是长在云端里的，周遭弥漫着一层薄薄的云烟。云烟缠着树，鸡鸭从树下走来走去，人们云里出云里进，锅碗瓢盆，鸡鸭狗叫，那是人间还是天上？是凡夫俗子还是神仙眷侣？或者是一幅淡淡的水墨画？我摇摇头，却又不知身在何处。我被弄糊涂了。",
        "  这些炊烟生发出来的地方是瓦房子，房子是厨房，矮矮小小的一间，木窗木门，有的窗户甚至连门都没有，直接用几个砖竖起来，搭成八字或者十字的形状，从里面漏出来几点光，像是房子眯缝着的小眼睛。把头往房子里一探，乌漆麻黑的，哦，那是烟熏黑的。屋里一个大灶，火塘塞满柴草，旁边还有一个小灶，火舌吐出来，直舔到煲盖儿上面，像个调皮的孩子在吐舌头。窝里或煮粥或炒菜，煲里或熬汤或煲水。烟在这里可不客气了，大大方方在墙上，椽子上，瓦面上，全抹了个大黑脸。烟熏的房子可没有仙境的美，可是人们似乎并不在意这个，饭菜依然飘香，人们依然大快朵颐。所谓人间烟火，不正是这样么？",
        "  炊烟透露了村庄许多秘密：东家的婆婆熬了粥，西家的婶婶还没回来，前面的伯母已经在炒菜了……而有些房子终年地沉默，不飘起一缕烟，那是主人已经离开了家乡，他们的烟火大多数飘散在城市的天空，再觅不得了。",
        "  天空上的烟，飘着飘着，不经意会偷偷减少了那么一缕。我常常看见那个孤寡老人从他的老房子里出入。他的房子只有一间，里边放了一张床，外边是一个小灶。他的人连同他的房子都被烟熏成了同一种颜色——黑色。他没有亲人，整日的没有说一两句话，整个冬天的时候，他呆在房子里，陪着两个漆黑的瓦罐，守着一堆火，把自己埋在火堆里。炊烟是他唯一的伴儿。于是他的房子在冬天里常常冒着烟，像个刚出锅的芋头。有时候，一些孩子畏惧北风的凛冽，哆哆嗦嗦、跑跑跳跳躲到这漆黑的一屋温暖里去，他便像临了贵宾，忙从里间翻找出来一些糖啊饼干啦，用同样漆黑的手一一分发给这些小贵宾们：吃，吃，干净的……孩子也不管，拿了就吃。老人高兴，拿棍子醒了醒闷声闷气的木柴，用嘴吹了又吹，火塘里的火映红了老人的脸，烟熏得他直咳嗽个不停，他的身子蜷缩成了一块火炭。",
        "  后来，几天没看到老人的房子冒烟了，邻居推门探望，老人生命的烟火熄灭，他睡在一个没有炊烟的地方里了。此后每次抬头，在村子的上空又少了一缕可供我怀念的炊烟了。"
      ],
      "key": 0
    }
    postArticleData(data).then(res => {
      if(res.data.code !== 0) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      } else {
        this.getArticleData(key);
      }
    }).catch(err => {
      console.log(err)
    })
  },
  addToDiary() {
    postNormalNotebookHistory().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
})