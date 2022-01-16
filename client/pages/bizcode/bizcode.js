// pages/bizcode/bizcode.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  getQRcode
} from '../../api/business'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    card: null,
    navStatus: 'isEmpty',
    userInfo: null,
    navigationBarTitleText: '',
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      card: this.store.data.card
    })
    const tempData = {
      // type: 3,
      // sq_jinzhu_id: this.data.detail.sq_jinzhu_id,
      // goods_id: this.data.detail.id,
      // share_user_id: store.data.userInfo.id
    }
    getQRcode(tempData).then(res => {
      this.setData({
        qrcode: res.data.url
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