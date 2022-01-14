// pages/bizEdit/style.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  getStyleList,
  getStyleImageList
} from '../../api/cardEdit'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    navigationBarTitleText: '编辑信息',
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone

    card: null,
    navStatus: '', //isEmpty
    currentStyleId: null, //当前选中版式id
    currentStyleImageObj: null, //当前选中星片图对象
    styleList: null, //名片编辑详情
    currentId: 1, //版式id
    readed: 0, //购买须知 0 1
    styleData: {
      show: [{
        name: '姓名',
        require: 0, //0非必须 1必须
        status: 0 //1选中 0非选中,
      }, {
        name: '公司名',
        require: 1, //0非必须 1必须
        status: 0 //1选中 0非选中,
      }, {
        name: '电话号码',
        require: 1, //0非必须 1必须
        status: 1 //1选中 0非选中,
      }, {
        name: '头像',
        require: 0, //0非必须 1必须
        status: 1 //1选中 0非选中,
      }, {
        name: '电话号码',
        require: 1, //0非必须 1必须
        status: 1 //1选中 0非选中,
      }, {
        name: '头像',
        require: 0, //0非必须 1必须
        status: 0 //1选中 0非选中,
      }]
    }
  },
  // 选择版式
  styleHandle(e) {
    const dataset = e.currentTarget.dataset
    this.getStyleImageList({
      style_id: dataset.item.id
    }).then(res => {
      this.setData({
        'styleList.style_image_list': res.data,
        currentStyleId: dataset.item.id,
        currentStyleImageObj: res.data[0]
      })
    })
  },
  // 选择星片图
  styleImageHandle(e) {
    if (!this.data.currentStyleId) {
      wx.showToast({
        title: '请先选择版式',
        icon: 'none'
      })
      return
    }

    const dataset = e.currentTarget.dataset

    this.setData({
      currentStyleImageObj: dataset.item
    })
  },
  readHandle() {
    this.setData({
      readed: !this.data.readed
    })
  },
  toPurinstruction() {
    wx.navigateTo({
      url: '../richtext/purinstruction',
    })
  },
  getStyleImageList(data) {
    return new Promise((resolve, reject) => {
      getStyleImageList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getStyleList(data) {
    return new Promise((resolve, reject) => {
      getStyleList(data).then(res => {
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
    this.setData({
      card: this.store.data.card,
      currentStyleImageObj: this.store.data.card.style
    })

    this.getStyleList().then(res => {
      this.setData({
        styleList: res.data,
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