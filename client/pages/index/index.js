// pages/index/index.js
import {
  setTabBar
} from '../../utils/business'
import config from '../../config/index'
import store from '../../store/common'
import create from '../../utils/create'
import {
  getCardDetail
} from '../../api/card'
import {
  updateUserInfo
} from '../../api/user'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    canIUseGetUserProfile: false,

    fixed: 0, //允许纵向滚动
    TASrollTop: null, //TA切换栏距离顶部距离
    currentId: 1,
    is_select: 0, //协议
    isOverShare: true,

    navigationBarTitleText: '我的名片',
    userInfo: null,
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
    tabbarH: null,

    navStatus: 'isEntryWithShare', //isEmpty

    // isCardEmpty: null, //有无名片
    currentSwiperIndex: 0, //初始值为0
    mapBackground: [{
      tit: '便捷发放星片',
      des: '转发给微信好友/面对面扫码查看'
    }, {
      tit: '更全面的展示自己',
      des: '多样展示、信息齐全'
    }, {
      tit: '访客数据全方位记录',
      des: '数据雷达监测、实时动态'
    }, {
      tit: '统一管理客户信息',
      des: '云端批量管理客户资料'
    }], //对象背景图的内容
    // swiper
    background: ['/assets/images/home_img_a.png', '/assets/images/home_img_b.png', '/assets/images/home_img_c.png', '/assets/images/home_img_d.png'],
    indicatorDots: false,
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
      // 分享好友 名片码
      share: {
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
  // 滚动时触发
  scrollHandle(e) {
    console.log(e.detail.scrollTop)
    console.log(this.data.TASrollTop)

    const fixed = this.data.fixed
    if (this.data.TASrollTop <= e.detail.scrollTop) {
      if (!fixed) {
        this.setData({
          fixed: 1
        })
      }
    } else {
      if (fixed) {
        this.setData({
          fixed: 0
        })
      }
    }


  },
  createCardHandle() {
    // 跳转至创建名片-极简 需用户勾选同意协议，若未勾选，toast:请阅读并同意《用户协议》和《隐私协议》后，在创建数字名片
    if (!this.data.is_select) {
      wx.showToast({
        icon: 'none',
        title: '请阅读并同意《用户协议》和《隐私协议》后，在创建数字名片',
      })
      return
    }

    wx.navigateTo({
      url: '/pages/bizEdit/easy',
    })

  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        // this.store.data.userInfo = res.userInfo
        this.store.data.userInfo['avatarUrl'] = res.userInfo.avatarUrl
        this.store.data.userInfo['city'] = res.userInfo.city
        this.store.data.userInfo['country'] = res.userInfo.country
        this.store.data.userInfo['gender'] = res.userInfo.gender
        this.store.data.userInfo['language'] = res.userInfo.language
        this.store.data.userInfo['nickName'] = res.userInfo.nickName
        this.store.data.userInfo['province'] = res.userInfo.province
        this.update()

        // 上传用户信息
        updateUserInfo(res.userInfo).then(res => {
          console.log(res.msg)
          wx.redirectTo({
            url: '/pages/authorization/phone',
          })
        }).catch(err => {
          console.log('更新微信信息:' + err.msg)
        })
      }
    })
  },
  // 无名片轮播图
  bindchangeHandle(e) {
    // console.log(e.detail.current)
    this.setData({
      currentSwiperIndex: e.detail.current
    })
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
  dropdownShareMaskTap() {
    this.setData({
      'dialog.share.opened': 0
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
        'dialog.share.opened': 1,
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
  getCardDetail(data) {
    return new Promise((resolve, reject) => {
      getCardDetail(data).then(res => {
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

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    // this.getCardDetail({
    //   type: 1
    // }).then(res => {

    // })

    this.setData({
      isCardEmpty: 0
    })

    this.store.data.isCardEmpty = 0
    this.update()

    // getApp().setWatcher(this) //设置监听器
    //第一次登陆提示json动图 显示一次 来过吗 0 没来过 1 来过
    const jsonAddDialogVisibile = wx.getStorageSync('jsonAddDialogVisibile')
    // console.log(jsonAddDialogVisibile)
    if (!jsonAddDialogVisibile) {
      this.setData({
        jsonAddDialogVisibile: 1
      })
      wx.setStorageSync('jsonAddDialogVisibile', 1)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let list = [{
        "pagePath": "/pages/index/index",
        "text": "我的星片",
        "iconPath": "/assets/images/btn_my_card_f.png",
        "selectedIconPath": "/assets/images/btn_my_card_n.png"
      },
      {
        "pagePath": "/pages/bizholder/bizholder",
        "text": "星片夹",
        "iconPath": "/assets/images/btn_card_holder_f.png",
        "selectedIconPath": "/assets/images/btn_card_holder_n.png"
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

    query.select('.section5').boundingClientRect(function (rect) {
      that.data.TASrollTop = (rect.top - that.store.data.compatibleInfo.navHeight-11)
    })

    query.select('.tab').boundingClientRect(function (rect) {
      that.setData({
        tabWidth: rect.width,
        tabHeight: rect.height
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