// pages/welcome/welcome.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  setTabBar
} from '../../utils/business'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const list = [{
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
    setTabBar.call({
      selected: 0,
      list
    })
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

  }
})