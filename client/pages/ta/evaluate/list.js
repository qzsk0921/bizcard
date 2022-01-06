// pages/ta/evaluate/list.js
import store from '../../../store/common'
import create from '../../../utils/create'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    navigationBarTitleText: 'Ta的评价',
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone

    evaluateData: {
      cache: [{
          avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
          name: '陈冠希',
          content: '在线二维码生成器提供免费的在线二维码生成服务,可以把电子名片、文本、二维码手机扫描软件下载。',
          date: '2021-09-01 15：12',
          starNum: 4
        }, {
          avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
          name: '陈冠希',
          content: '在线二维码生成器提供免费的在线二维码生成服务,可以把电子名片、文本、二维码手机扫描软件下载。',
          date: '2021-09-01 15：12',
          starNum: 5
        },
        {
          avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
          name: '陈冠希',
          content: '在线二维码生成器提供免费的在线二维码生成服务,可以把电子名片、文本、二维码手机扫描软件下载。',
          date: '2021-09-01 15：12',
          starNum: 2
        }
      ],
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 10,

    refresherEnabled: false,
    triggered: false,
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let evaluateData = this.data.evaluateData

    if (evaluateData.count + 1 > evaluateData.total_page) return

    this.setData({
      [`evaluateData.count`]: ++evaluateData.count
    })

    this.getEvaluateData('scrollToLower')
  },
  getEvaluateData(dataObj) {
    const tempData = {
      page: this.data.evaluateData.count,
      page_size: this.data.page_size,
      shop_id: this.store.data.shop_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getEvaluateData(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.evaluateData.cache.push(...res.data.data)
          this.setData({
            [`evaluateData.cache`]: this.data.evaluateData.cache,
            [`evaluateData.total_page`]: res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            [`evaluateData.cache`]: res.data.data,
            [`evaluateData.total_page`]: res.data.last_page
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.data.compatibleInfo.navHeight) {
      this.setData({
        compatibleInfo: this.store.data.compatibleInfo
      })
    }

    if (!this.data.userInfo) {
      this.setData({
        userInfo: this.store.data.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})