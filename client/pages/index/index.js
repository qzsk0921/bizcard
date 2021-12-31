// pages/index/index.js
import {
  setTabBar
} from '../../utils/business'
import config from '../../config/index'
import store from '../../store/common'
import create from '../../utils/create'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    isOverShare: true,

    userInfo: null,
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
    tabbarH: null,

    navStatus: 'isEmpty',

    isCardEmpty: 1,
    // swiper
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    interval: 2000,
    autoplay: true,
    duration: 500,
    indicatorActiveColor: '#4980F9'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // getApp().setWatcher(this) //设置监听器

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let list = [{
        "pagePath": "pages/index/index",
        "text": "我的星片",
        "iconPath": "/assets/images/btn_home.png",
        "selectedIconPath": "/assets/images/btn_home_focus.png"
      },
      {
        "pagePath": "pages/index/index",
        "text": "星片夹",
        "iconPath": "/assets/images/btn_home.png",
        "selectedIconPath": "/assets/images/btn_home_focus.png"
      }
    ]
    if (this.data.isCardEmpty) {
      setTabBar.call(this, {
        list
      })
    } else {
      setTabBar.call(this)
    }
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