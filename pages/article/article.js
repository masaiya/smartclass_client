import { postNormalNotebookHistory } from '../../service/history'
import { getArticleData, postArticleData } from '../../service/article'
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    content: [],
    currentArticleKey: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const currentTime = wx.getStorageSync('currentTime');
    const currentArticleKey = wx.getStorageSync('currentArticleKey');
    if(Date.now() - currentTime > 86400000) {
      wx.setStorageSync('currentArticleKey', currentArticleKey++)
      wx.setStorageSync('currentTime', currentTime)
      this.getArticleData(currentArticleKey++);
    } else {
      this.getArticleData(currentArticleKey);
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
    // this.postArticleData();
  },
  postArticleData() {
    const title = '最美的遇见';
    const content = [
      '题记：遇见无需要理由，无需要刻意的追求，无意中的遇见是常有的，而最美的遇见也许是寒冷中的一股暖流，也许是风雨后的一抺彩虹，其实遇见本身就没有值得与不值得……',
      '　　冬天了，雪姑娘舞展着她的舞步说来就来了，那些散落的雪瓣，漫过柔唇浸湿了心海，很轻，也很疼，甚至有些冰凉，这个冬天，并没有与众不同。一样的冷，一样的凉寒，一样的雪花飘落。',
      '　　时光就这样昏开在眼底，让我们遇见了，遇见，是缘分的开始。可是很多时候，我们无法选择这样的开始，也无法预料结局，只守着最后一个句点，让无奈游离。生命的路上，总是有赏不完的风景。喜欢看的花，不一定永远喜欢。曾经迷恋的故事，或许有一天也会忘记。这世上在不经意中演绎着错过的，除了风景，还有缘分。',
      '　　岁月有时就像一本深刻的回忆录，偶然间将其拾起，掸去陨落的埃尘，铺平泛黄的褶皱，心怀素念，一字一句的念完，感动之余，便会觉得即使在那些最不起眼的日子，也能把寻常的风景看到泪流满襟，叫人不禁慨叹光阴的消逝，欢愉的短促。回眸驻足间，沿着来路留下的深浅印记，一路寻去，有花开鸟语，也会有雨雪风霜。冷暖如流，多少往昔掺杂着琐碎的点滴，悄悄的浸润在这无声无息的岁月里。纵然时光不语，而你依然会在某个不经意的时刻让人想起，无需刻意的起承转合，也无需担心能否运筹帷幄，当你蓦然落笔的瞬间，岁月便帮你填满了最美的期许。',
      '　　内心深处，情意依旧。思念如倾城，将我满腔的热血心墨泼在尘世之外，轻拥这隆冬时节的寒冷，踏寻有温暖的地方，总有一个能暖心的感觉早已储存在心间，也许你就是住在我回忆里的那个人，你是我期待的那个人，你是我在这冬天最美的遇见。',
      '   其实你一直在我的梦中，我们无法选择命运，但我们都想法改变生活。其实生活是晨起暮落。日子就是柴米油盐。走过的路，经过的事，看过的风景，已经随着光阴渐行渐远，我们不必哀叹，也无需伤感，梦如蝉衣，心若琉璃，而遇见，本就没有值得与不值得。唯有让这寂静的文字与你我同行，将碎碎的念想打结成一串串音符，穿过空间，飞越你的耳畔，若是有心，一切尽在不言中。',
      '   我不能和你牵手雪花，但我可以和你相拥这个冬寒！些许在下一个春暖花开的季里！'
    ]
    const key = 4;
    postArticleData(key, title, content).then(res => {
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