// pages/returnbiz/returnbiz.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  returnCard
} from '../../api/card'
const duration = 500
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    currentCount: 0,
    content: '',

    userInfo: null,
    navigationBarTitleText: '回递名片',
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
  },
  inputHandle(e) {
    // console.log(e)
    let content = e.detail.value
    let len = e.detail.value.length

    if (len > 100) {
      len = 100
      // content = this.data.content.slice(0, 100)
    }

    this.setData({
      currentCount: len,
      content
    })
  },
  // 回递名片
  returnbizHandle() {
    // console.log(this.data.content)
    this.returnCard({
      sq_business_card_id: this.store.data.card.data.id,
      remark: this.data.content
    }).then(res => {
      wx.showToast({
        icon: 'none',
        // title: res.msg,
        title: '回递成功',
        duration
      })

      setTimeout(() => {
        wx.navigateBack({
          delta: 0,
        })
      }, duration)
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

    this.setData({
      card: this.store.data.card
    })
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

  },
  returnCard(data) {
    return new Promise((resolve, reject) => {
      returnCard(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
})