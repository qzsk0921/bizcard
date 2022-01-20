// pages/ta/evaluate/submit.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  addZanComment
} from '../../../api/comment'
const duration = 1000
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    starNum: 5, //星星数量
    currentCount: 0,
    content: '',

    userInfo: null,
    navigationBarTitleText: '',
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
  },
  inputHandle(e) {
    // console.log(e)
    let content = e.detail.value
    let len = e.detail.value.length
    if (len > 300) {
      len = 300
      // content = this.data.content.slice(0, 300)
    }

    this.setData({
      currentCount: len,
      content
    })
  },
  // 提交评价
  submitHandle() {
    const temp = {
      sq_business_card_id: this.store.data.card.data.id,
      comment: this.data.content,
      score: this.data.starNum
    }
    // 评价成功：toast:评价成功，显示2s后，返回上一级页面
    this.addZanComment(temp).then(res => {
      wx.showToast({
        icon: 'none',
        title: '评价成功',
        duration
      })

      setTimeout(() => {
        wx.navigateBack({
          delta: 0,
        })
      }, duration)
    })
  },
  onChange(e) {
    this.setData({
      starNum: e.detail
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
  addZanComment(data) {
    return new Promise((resolve, reject) => {
      addZanComment(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
})