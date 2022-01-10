// pages/bizholder/bizholder.js
import {
  setTabBar
} from '../../utils/business'
import store from '../../store/common'
import create from '../../utils/create'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    navStatus: 'bizholder',
    navigationBarTitleText: '星片夹',
    userInfo: null,
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
    tabbarH: null,

    searchKeyword: '',

    listData: {
      cache: [{
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        nickname: '昵称',
        company: '厦门星辰追梦科技有限公司',
        position: '产品经理',
        info: '第2次查看了你的名片“厦门星辰追梦科技有限公司-产品经理',
        date: '2021/05/14',
        precent: '80%'
      }, {
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        nickname: '昵称',
        company: '厦门星辰追梦科技有限公司',
        position: '产品经理',
        info: '第2次查看了你的名片“厦门星辰追梦科技有限公司-产品经理',
        date: '2021/05/14',
        precent: '60%'
      }],
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 10,

    status: ''
  },
  searchInputHandle(e) {
    // console.log(e)
    this.setData({
      searchKeyword: e.detail.value
    })
  },
  // 搜索
  btnSearchHandle() {
    // console.log('搜索')
    console.log(this.data.searchKeyword)
  },
  bindconfirmHandle(e) {
    console.log(e.detail.value)
  },
  scrollToLower() {
    console.log(e)
    console.log('scrollToLower')

    let listData = this.data.listData

    if (listData.count + 1 > listData.total_page) return

    this.setData({
      'listData.count': ++listData.count
    })

    // this.getGoodsList('scrollToLower').then(res => {
    //   listData.cache.push(...res.data.data)
    //   this.setData({
    //     [`listData.cache`]: listData.cache
    //   })
    // })
  },

  getGoodsList(dataObj) {
    const tempData = {
      page: this.data.listData.count,
      page_size: this.data.page_size,
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getGoodsList(tempData).then(res => {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTabBar.call(this, {
      selected: 2
    })

    const that = this;
    const query = wx.createSelectorQuery();
    query.select('.section3').boundingClientRect(function (rect) {
      that.setData({
        section3T: rect.top,
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