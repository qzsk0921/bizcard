// pages/bizmsg/bizmsg.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  getCardMsgList,
  getCard
} from '../../api/cardHolder'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    navStatus: 'bizholder',
    navigationBarTitleText: '星片消息',
    userInfo: null,
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone

    listData: {
      cache: [
        //   {
        //   id: 1,
        //   avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        //   nickname: '昵称',
        //   company: '厦门星辰追梦科技有限公司',
        //   position: '产品经理',
        //   remark: '很高兴认识您，我们交换一下名片吧~',
        //   status: 0
        // }, {
        //   id: 2,
        //   avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        //   nickname: '昵称',
        //   company: '厦门星辰追梦科技有限公司打到几点第九大队京东到家的角度讲',
        //   position: '产品经理',
        //   remark: '很高兴认识您，我们交换一下名片吧很高兴认识您，我们交换一下名片吧很高兴认识您，我们交换一下名片吧~',
        //   status: 1
        // }, {
        //   id: 3,
        //   avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        //   nickname: '昵称',
        //   company: '厦门星辰追梦科技有限公司',
        //   position: '产品经理',
        //   remark: '',
        //   status: 0
        // }, {
        //   id: 4,
        //   avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        //   nickname: '昵称',
        //   company: '厦门星辰追梦科技有限公司',
        //   position: '产品经理',
        //   remark: '很高兴认识您，我们交换一下名片吧~',
        //   status: 0
        // }
      ],
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 10,
  },
  // 收下名片
  receiveHandle(e) {
    const dataset = e.currentTarget.dataset
    // 已收下名片
    if (dataset.item.status === 1) return

    this.getCard({
      message_id: dataset.item.id
    }).then(res => {
      this.getCardMsgList()
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
  getCardMsgList() {
    return new Promise((resolve, reject) => {
      getCardMsgList().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getCard(data) {
    return new Promise((resolve, reject) => {
      getCard(data).then(res => {
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
    this.getCardMsgList().then(res => {
      this.setData({
        'listData.cache': res.data.data
      })
    })
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