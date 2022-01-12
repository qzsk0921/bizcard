// pages/index/index.js
import {
  setTabBar
} from '../../utils/business'
import config from '../../config/index'
import store from '../../store/common'
import create from '../../utils/create'
import {
  getCardDetail,
  getStyleInfo,
  setCardZan,
  setCardLabelZan
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

    type: 1, //	1:自己 2:他人
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
        cache: null,
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
        cache: null,
        count: 1,
        total_page: 1
      },
      // 评价
      {
        cache: [],
        count: 1,
        total_page: 1
      }
    ],
    allData: {
      "card_info": {
        "id": 23,
        "sq_jinzhu_id": 782,
        "template_card_id": 2,
        "name": "胡椒",
        "title": "UI",
        "mobile": "18046143570",
        "email": "2505655@qq.com",
        "wx_number": "2222333",
        "company": "厦门星辰追梦",
        "address": "厦门金海湾",
        "avatar": "https://wms.com/upload/20200922/f632f471db0dc259edfe0f08a4cea312.jpg",
        "wx_qr_code": "https://wms.com/upload/20200922/f632f471db0dc259edfe0f08a4cea312.jpg",
        "introduce_myself": "设计是最大的幸福",
        "personal_label": "a:2:{i:0;s:1:\"2\";i:1;s:1:\"5\";}",
        "personal_style": "a:2:{i:0;s:54:\"http://image.wms.wljkxys.com/201910305db95969e222e.png\";i:1;s:54:\"http://image.wms.wljkxys.com/201910305db959966fa68.png\";}",
        "create_time": 1554875788,
        "update_time": 1601432828,
        "del_flag": 0,
        "type": 1,
        "is_public": 0,
        "hometown": '福建厦门',
        "landline": null,
        "vidieo_url": 'https://vd3.bdstatic.com/mda-khqh5jcid4bgkur1/sc/mda-khqh5jcid4bgkur1.mp4?v_from_s=hkapp-haokan-nanjing&auth_key=1641983487-0-0-7704cdf23332db70415117a14553259b&bcevod_channel=searchbox_feed&pd=1&pt=3&logid=0086888447&vid=7450474287727338224&abtest=&klogid=0086888447',
        "profession_id": 1,
        "industry_id": 1,
        "company_avatar": 'http://image.wms.wljkxys.com/2022011061dbcddf655db.png',
        "company_introduce": '厦门脉呗科技营销有限公司于2019年04月10日成立。法定代表人陈先生，公司经营范围包括：软件开发；电影和影视节目发行；互联网信息服务（不含药品信息服务和网吧）；信息系统集成服务；信息技术咨询服务；数据处理和存储服务…',
        "company_introduce_image": null,
        "company_introduce_image_arr": ['http://image.wms.wljkxys.com/2022011061dbcddf655db.png', 'http://image.wms.wljkxys.com/2022011061dbcddf655db.png','http://image.wms.wljkxys.com/2022011061dbcddf655db.png','http://image.wms.wljkxys.com/2022011061dbcddf655db.png','http://image.wms.wljkxys.com/2022011061dbcddf655db.png','http://image.wms.wljkxys.com/2022011061dbcddf655db.png','http://image.wms.wljkxys.com/2022011061dbcddf655db.png','http://image.wms.wljkxys.com/2022011061dbcddf655db.png'],
        "user_id": 1,
        "status": 1,
        "profession": "技术",
        "industry": "互联网/IT/电子/通信"
      },
      "is_me": 1,
      "card_info_label_list": [{
        id: 1,
        name: '活泼开朗',
        zan_status: true,
        zan_num: 34
      }, {
        id: 2,
        name: '乐观',
        zan_status: true,
        zan_num: 3
      }, {
        id: 3,
        name: '活泼开朗',
        zan_status: true,
        zan_num: 1
      }, {
        id: 4,
        name: '活泼',
        zan_status: true,
        zan_num: 1
      }, {
        id: 5,
        name: '活泼开朗',
        zan_status: true,
        zan_num: 1
      }, {
        id: 6,
        name: '活泼开朗',
        zan_status: true,
        zan_num: 1
      }, {
        id: 7,
        name: '活泼开朗',
        zan_status: true,
        zan_num: 1
      }],
      "view_user_list": [{
          "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI9A7pz9icibBKLFGHLN9Z8wDnRRw4apoq16EWXzZictmuUZaNyY3PiaW8Xo3p1IHkoiaEqkQr3RZ8u0jQ/132",
          "user_id": 2
        },
        {
          "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLkibgRehIkVWlZjqKFCmvZWIBs57mh8A89iaJ8VHTibnjqqPIm7sIgSNp2cjdmMlL61Uu44cCLx1E1w/132",
          "user_id": 1
        },
        {
          "avatar": "http://thirdwx.qlogo.cn/mmopen/vi_32/j7QrfoC6aHSiaJ2eOH6Yick99WZHESib7k73oXre7WemI4rgnSMCsL8GheuhUvbXaAza1uoUlng9icETibolAG5CruA/132",
          "user_id": 0
        }
      ],
      "view_user_number": 3,
      "card_style": {
        "card_image": "http://image.wms.wljkxys.com/2022011061dbcddf655db.png",
        "name_color": "22",
        "name_transparent": "22",
        "is_name_show": 0,
        "avatar_color": "22",
        "avatar_transparent": "22",
        "is_avatar_show": 0,
        "phone_color": "22",
        "phone_transparent": "22",
        "is_phone_show": 0,
        "profession_color": "22",
        "profession_transparent": "22",
        "is_profession_show": 0,
        "company_color": "22",
        "company_transparent": "22",
        "is_company_show": 0,
        "address_color": "22",
        "address_transparent": "22",
        "is_address_show": 0,
        "phone_image": "http://image.wms.wljkxys.com/2022011061dbcdf1a6735.png",
        "email_image": "http://image.wms.wljkxys.com/2022011061dbcdf59c769.png",
        "address_image": "http://image.wms.wljkxys.com/2022011061dbcdf9d2de4.png",
        "background_image": "http://image.wms.wljkxys.com/2022011061dbcdfd8c26e.png",
        "create_time": 1641795085,
        "email_color": "22",
        "email_transparent": "22",
        "is_email_show": 0,
        "style_id": 4,
        "name": "高级",
        "is_customize_set": 0,
        "card_image_preview": "http://image.wms.wljkxys.com/2022011261de7d9bdf9fc.png",
        "user_id": 1,
        "sq_business_card_id": 23,
        "style_image_id": 0,
        "style_image_customize": ""
      },
      "card_zan": 1,
      "card_is_zan": 0,
      "hometown_status": 1,
      "card_status": 0
    }
  },
  watch: {
    tabIndex: {
      handler(nv, ov, obj) {
        // console.log(nv)
        if (nv === 0) {
          this.setData({
            'tadeOptions[0]cache': this.data.allData.card_info,
          })
        } else if (nv === 1) {
          this.setData({
            // tadeOptions[1]cache: 
          })
        } else if (nv === 2) {
          this.setData({
            'tadeOptions[2]cache': this.data.allData.card_info,
          })
        } else if (nv === 3) {
          this.setData({
            // 'tadeOptions[3]cache':
          })
        }
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
  // 我的名片-名片编辑
  editHandle() {
    wx.navigateTo({
      url: '/pages/bizEdit/edit',
    })
  },
  // 我的名片-递名片
  sendHandle() {
    this.setData({
      'dialog.share.opened': 1,
    })
  },
  zanHandle() {
    // console.log(999)
    console.log(this.data.allData.card_info)
    const type = this.data.allData.card_is_zan ? 0 : 1
    this.setCardZan({
      type,
      sq_business_card_id: this.data.allData.card_info.id
    }).then(res => {
      const tempData = {
        'allData.card_is_zan': type
      }
      if (type) {
        tempData['allData.card_zan'] = this.data.allData.card_zan + 1
      } else {
        tempData['allData.card_zan'] = this.data.allData.card_zan - 1
      }

      this.setData(tempData)
    })
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
  // 打开名片码
  awakenBizcodeHandle() {
    wx.navigateTo({
      url: '/pages/bizcode/bizcode',
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
        // 'dialog.telephone.telephoneObj': item,
        // 'dialog.telephone.opened': 1,
        // 'dialog.auth.opened': 1,
        'dialog.diy.opened': 1,
        // 'dialog.share.opened': 1,
        // 'dialog.forbidden.opened': 1,
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
  getStyleInfo() {
    return new Promise((resolve, reject) => {
      getStyleInfo().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setCardZan(data) {
    return new Promise((resolve, reject) => {
      setCardZan(data).then(res => {
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

    this.initRequst()

    this.setData({
      isCardEmpty: 0
    })

    this.store.data.isCardEmpty = 0
    this.update()

    getApp().setWatcher(this) //设置监听器
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
  initRequst() {
    this.getCardDetail({
      type: 1
    }).then(res => {
      this.setData({
        allData: res.data,
        tabIndex: this.data.tabIndex
      })
      // console.log(this.data.allData)
    })

    this.getStyleInfo().then(res => {
      console.log(res)
      // this.setData({
      //   allData: res.data
      // })
    })
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
      that.data.TASrollTop = (rect.top - that.store.data.compatibleInfo.navHeight - 11)
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: ' ',
        path: `pages/index/index?sq_business_card_id=${store.data.userInfo.id}`,
        // imageUrl: 'https://sharepuls.xcmbkj.com/img_enrollment.png',
        imageUrl: '/assets/images/share_send.png',
        success(res) {
          console.log('分享成功', res)
        },
        fail(res) {
          console.log(res)
        }
      }
    }
  }
})