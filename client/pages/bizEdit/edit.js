// pages/bizEdit/edit.js
import store from '../../store/common'
import create from '../../utils/create'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    cardData: {
      avatar: '', //头像
      video: '', //视频
      logo: ''
    },
    currentCountProfile: 0,
    currentCountTag: 0,
    currentCountIntroduction: 0, //公司简介

    userInfo: null,
    navigationBarTitleText: '编辑信息',
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
  },

  chooseImage(field) {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        that.setData({
          [`cardData.${field}`]: tempFilePaths[0]
        })
      }
    })
  },
  // 选择头像
  inputAvatarHandle() {
    this.chooseImage('avatar')
  },
  // 选择视频
  inputVideoHandle() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        // console.log(res.tempFilePath)
        that.setData({
          'cardData.video': res.tempFilePath
        })
      }
    })
  },
  // 选择logo图
  inputLogoHandle() {
    this.chooseImage('logo')
  },

  textareaInputHandle(num, type) {
    let len = e.detail.value.length

    if (len > num) {
      len = num
    }
    // const data = {
    //   type: len
    // }
    // this.setData(data)
  },
  textareaInputProfileHandle() {
    this.textareaInputHandle(100, 'currentCountProfile')
  },
  textareaInputIntroductionHandle() {
    this.textareaInputHandle(300, 'currentCountIntroduction')
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