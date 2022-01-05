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

    // 数据
    cardData: {
      avatars: ['/assets/images/home_n.png', '/assets/images/home_n.png', '/assets/images/home_n.png', '/assets/images/home_n.png']
    },

    // 简介 产品 企业 评价
    tabbar: ['TA的简介', 'TA的产品', 'TA的企业', 'TA的评价'],
    tabIndex: 0, //'TA的简介', 'TA的产品', 'TA的企业', 'TA的评价'
    tabWidth: null,

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
      // 电话弹窗
      telephone: {
        opened: 0,
        telephoneObj: ''
      },
      // 授权弹窗
      auth: {
        opened: 0,
      },
      // 制作名片弹窗
      diy: {
        opened: 0
      },
      // 禁用弹窗
      forbidden: {
        opened: 0
      }
    },
    tadeOptions: [
      // 简介
      {
        cache: [],
        count: 1,
        total_page: 1
      },
      // 产品
      {
        cache: [],
        count: 1,
        total_page: 1
      },
      // 企业
      {
        cache: [],
        count: 1,
        total_page: 1
      },
      // 评价
      {
        cache: [],
        count: 1,
        total_page: 1
      }
    ]
  },
  watch: {
    tabIndex: {
      handler(nv, ov, obj) {
        console.log(nv)
        // this.getOrderList({
        //   status: this.parseStatus(nv)
        // })
      },
      // immediate: true
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
      'dialog.telephone.opened': 0
    })
  },
  // 关闭授权弹窗
  dropdownAuthMaskTap() {
    this.setData({
      'dialog.auth.opened': 0
    })
  },
  dropdownDiyMaskTap() {
    this.setData({
      'dialog.diy.opened': 0
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
        'dialog.telephone.telephoneObj': item,
        'dialog.telephone.opened': 1,
        'dialog.auth.opened': 1,
        'dialog.diy.opened': 1,
        'dialog.forbidden.opened': 1,
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
  changeTab(e) {
    console.log(e)
    const index = e.target.dataset.index

    let objData = {
      tabIndex: index,
    }

    this.setData(objData)
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

    const that = this;
    const query = wx.createSelectorQuery();

    query.select('.tab').boundingClientRect(function (rect) {
      that.setData({
        tabWidth: rect.width,
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