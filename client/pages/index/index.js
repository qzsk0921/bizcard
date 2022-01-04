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
    is_select: 0, //协议
    isOverShare: true,

    userInfo: null,
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
    tabbarH: null,

    navStatus: 'isEntryWithShare', //isEmpty

    isCardEmpty: 0,
    // swiper
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    interval: 2000,
    autoplay: true,
    duration: 500,
    indicatorActiveColor: '#4980F9',
    section4: [{
      id: 1,
      img: '/assets/images/card_phone.png',
      title: '电话',
      content: '136-0603-2423',
      toast: '',
    }, {
      id: 2,
      img: '/assets/images/card_email.png',
      title: '邮箱',
      content: '13606032423@qq.com',
      toast: '已为您复制Ta的邮箱至您的粘贴板',
    }, {
      id: 3,
      img: '/assets/images/card_location.png',
      title: '地址',
      content: '深圳市福田区新一代产业园1栋30楼',
      toast: '已将地址存至手机粘贴板' //然后，跳转至地图导航
    }, {
      id: 4,
      img: '/assets/images/card_call.png',
      title: '座机',
      content: '0592-5923912'
    }],
    dialog: {
      opened: 0,
      telephoneObj: ''
    }
  },
  // 选择阅读协议
  agreementHandle() {
    this.setData({
      is_select: !this.data.is_select
    })
  },
  // 关闭购物车弹窗
  dropdownTelephoneMaskTap() {
    this.setData({
      'dialog.opened': 0
    })
  },
  // 电话 邮箱 地址 座机
  itemHandle(e) {
    const item = e.currentTarget.dataset.item

    if (item.toast) {
      // 邮箱 地址
      this.copyHandle(item.content, item.toast)

      if (item.id === 3) {
        // 地址
        setTimeout(() => {
          // wx.chooseLocation({
          //   success: res => {
          //     that.getValueMap(res)
          //   },
          //   fail: res => {
          //     console.log('打开地图选择位置取消', res)
          //   },
          //   complete: res => {
          //     // 接口调用结束的回调函数（调用成功、失败都会执行）
          //     console.log('chooseLocation complete')
          //     console.log(res)
          //   }
          // })
          wx.openLocation({
            latitude: 24.44579,
            longitude: 118.08243
          })
        }, 100)
      }
    } else {
      // 电话 座机

      // if (item.id === 1) {
      //   // 电话

      // } else if (item.id === 4) {
      //   // 座机
      // }

      this.setData({
        'dialog.telephoneObj': item,
        'dialog.opened': 1
      })
    }
  },
  // 复制订单编号
  copyHandle(data, title) {
    this.copyToClipboard(data, title)
  },
  // 复制到剪贴板
  copyToClipboard(data, title) {
    title ? title : '复制到剪贴板'
    wx.setClipboardData({
      data,
      success: (res) => {
        wx.showToast({
          title,
          icon: 'none'
        })
      },
    })
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