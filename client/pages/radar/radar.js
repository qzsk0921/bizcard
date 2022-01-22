// pages/radar/radar.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  setTabBar
} from '../../utils/business'
import {
  getCardRadarList
} from '../../api/cardHolder'
// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    date: '', //date: '2021-09',

    navigationBarTitleText: '星片雷达',
    userInfo: null,
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
    navStatus: 'isEmpty', //isEmpty

    listData: {
      cache: [
        // {
        //   "id": 12,
        //   "user_id": 2,
        //   "card_user_id": 1,
        //   "sq_business_card_id": 23,
        //   "nick_name": "任剑飞",
        //   "avatar_url": 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        //   "create_time": 1641950535,
        //   "num": 13,
        //   "company": "未来健康",
        //   "profession": "",
        //   "card_status": 1,
        //   "content": "第13次查看了你的名片“厦门星辰追梦-技术"
        // }, {
        //   "id": 13,
        //   "user_id": 2,
        //   "card_user_id": 1,
        //   "sq_business_card_id": 23,
        //   "nick_name": "任剑飞",
        //   "avatar_url": 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        //   "create_time": 1641950535,
        //   "num": 13,
        //   "company": "未来健康",
        //   "profession": "",
        //   "card_status": 2,
        //   "content": "第13次查看了你的名片“厦门星辰追梦-技术"
        // }
      ],
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 10,
  },
  watch: {
    date: {
      handler(nv, ov, obj) {
        // console.log(nv)
        this.getCardRadarList({
          time: nv
        }).then(res => {
          this.setData({
            'listData.cache': res.data.data
          })
        })
      }
    }
  },
  dateChandeHandle(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    const index = e.detail.value
    this.setData({
      index
    })
  },
  scrollToLower() {
    console.log(e)
    console.log('scrollToLower')

    let listData = this.data.listData

    if (listData.count + 1 > listData.total_page) return

    this.setData({
      'listData.count': ++listData.count
    })

    this.getCardRadarList('scrollToLower')
  },

  getCardRadarList(dataObj) {
    const tempData = {
      page: this.data.listData.count,
      page_size: this.data.page_size,
      time: this.data.dete
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getCardRadarList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.listData.cache.push(...res.data.data)
          this.setData({
            'listData.cache': this.data.listData.cache,
            'listData.total_page': res.data.last_page
          })
          resolve(res)
          console.log(this.data.listData)
        } else {
          this.setData({
            'listData.cache': res.data.data,
            'listData.total_page': res.data.last_page
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 设置日期
  setDate() {
    if (!this.data.date) {
      const dateObj = new Date()
      const year = dateObj.getFullYear()
      const month = this.formatNumber(dateObj.getMonth() + 1)

      this.setData({
        date: `${year}-${month}`,
        startDate: `${year-5}-${month}`,
        endDate: `${year}-${month}`
      })

    }
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : `0${n}`
  },
  bindDateChange(e) {
    // console.log(e)
    const value = e.detail.value
    this.setData({
      date: value
    })
  },
  getCardRadarList(data) {
    return new Promise((resolve, reject) => {
      getCardRadarList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().setWatcher(this) //设置监听器
    this.setDate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTabBar.call(this, {
      selected: 1
    })

    const that = this
    const query = wx.createSelectorQuery();

    query.select('.picker').boundingClientRect(function (rect) {
      that.setData({
        pickH: rect.height
      })
    }).exec();
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