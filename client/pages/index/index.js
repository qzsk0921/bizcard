// pages/index/index.js
import {
  setTabBar,
  drawCanvas
} from '../../utils/business'
// import config from '../../config/index'
import store from '../../store/common'
import create from '../../utils/create'
import {
  getCardDetail,
  getStyleInfo,
  setCardZan,
  setCardLabelZan,
  setTownsman
} from '../../api/card'
import {
  getStyleList
} from '../../api/cardEdit'
import {
  getCommentList,
  setCommentZan
} from '../../api/comment'
import {
  updateUserInfo
} from '../../api/user'
import {
  getGoodList
} from '../../api/shopping'
const list = [{
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
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    tabbarPage: '/pages/index/index',

    canvasWidth: 420,
    canvasHeight: 336,

    canIUseGetUserProfile: false,

    fixed: 0, //是否固定定位
    TASrollTop: null, //TA切换栏距离顶部距离
    cid: 1, //版式id
    is_select: 0, //协议
    isOverShare: true,

    navigationBarTitleText: '', //我的名片
    userInfo: null,
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone

    navStatus: '', //isEmpty

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
    tabbar: [], //['TA的简介', 'TA的产品', 'TA的企业', 'TA的评价'],
    tabIndex: 0, //'TA的简介', 'TA的产品', 'TA的企业', 'TA的评价'
    tabWidth: null,
    //id:1电话 2邮箱 3地址 4座机
    section4: [
      // {
      //   id: 1,
      //   img: '/assets/images/card_phone.png',
      //   title: '电话',
      //   content: '',
      //   toast: '',
      // }, {
      //   id: 2,
      //   img: '/assets/images/card_email.png',
      //   title: '邮箱',
      //   content: '',
      //   toast: '已为您复制Ta的邮箱至您的粘贴板',
      // }, {
      //   id: 3,
      //   img: '/assets/images/card_location.png',
      //   title: '地址',
      //   content: '',
      //   toast: '已将地址存至手机粘贴板' //然后，跳转至地图导航
      // }, {
      //   id: 4,
      //   img: '/assets/images/card_call.png',
      //   title: '座机',
      //   content: ''
      // }
    ],
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
        cache: [
          // {
          //   "id": 10,
          //   "name": "双净全棉加厚洗脸巾抽式，水刺无纺布，12包（箱）198元",
          //   "cover": "http://image.wms.wljkxys.com/202009305f742bc2bfac6.jpg",
          //   "cover_url": "http://image.wms.wljkxys.com/202009305f742bc2bfac6.jpg",
          //   "g_type": 1,
          //   "price": "198.00",
          //   "is_private": 0,
          //   "earnings": "99.00",
          //   "comment_num": 0,
          //   "enjoy": 0,
          //   "join_goods_id": 9,
          //   "read_num": 13,
          //   "is_postage": 1,
          //   "type": 0,
          //   "jinzhu_id": 782,
          //   "shop_id": 2,
          //   "shop_name": "小罗小店",
          //   "avatar": "http://image.wms.wljkxys.com/202009305f742f2b83137",
          //   "is_enjoy": 0,
          //   "is_official": 0,
          //   "is_join": 0,
          //   "check_buy": 0,
          //   "kilometers": "",
          //   "small_path": "",
          //   "color": "",
          //   "licensing_time": "",
          //   "price_str": "198元",
          //   "kilometers_str": "",
          //   "licensing_time_str": ""
          // },
          // {
          //   "id": 11,
          //   "name": "双净全棉加厚洗脸巾卷纸，水刺无纺布，10粒（箱）198元",
          //   "cover": "http://image.wms.wljkxys.com/202009305f742b4c394ee.jpg",
          //   "cover_url": "http://image.wms.wljkxys.com/202009305f742b4c394ee.jpg",
          //   "g_type": 1,
          //   "price": "198.00",
          //   "is_private": 0,
          //   "earnings": "118.00",
          //   "comment_num": 0,
          //   "enjoy": 0,
          //   "join_goods_id": 8,
          //   "read_num": 10,
          //   "is_postage": 1,
          //   "type": 0,
          //   "jinzhu_id": 782,
          //   "shop_id": 2,
          //   "shop_name": "小罗小店",
          //   "avatar": "http://image.wms.wljkxys.com/202009305f742f2b83137",
          //   "is_enjoy": 0,
          //   "is_official": 0,
          //   "is_join": 0,
          //   "check_buy": 0,
          //   "kilometers": "",
          //   "small_path": "",
          //   "color": "",
          //   "licensing_time": "",
          //   "price_str": "198元",
          //   "kilometers_str": "",
          //   "licensing_time_str": ""
          // },
          // {
          //   "id": 12,
          //   "name": "喜庆时分宝宝软抽纸450张（8包/提），木浆纸，2提（16包）29.9元",
          //   "cover": "http://image.wms.wljkxys.com/202009305f742ae593f1e.jpg",
          //   "cover_url": "http://image.wms.wljkxys.com/202009305f742ae593f1e.jpg",
          //   "g_type": 1,
          //   "price": "29.90",
          //   "is_private": 0,
          //   "earnings": "3.90",
          //   "comment_num": 0,
          //   "enjoy": 0,
          //   "join_goods_id": 7,
          //   "read_num": 4,
          //   "is_postage": 1,
          //   "type": 0,
          //   "jinzhu_id": 782,
          //   "shop_id": 2,
          //   "shop_name": "小罗小店",
          //   "avatar": "http://image.wms.wljkxys.com/202009305f742f2b83137",
          //   "is_enjoy": 0,
          //   "is_official": 0,
          //   "is_join": 0,
          //   "check_buy": 0,
          //   "kilometers": "",
          //   "small_path": "",
          //   "color": "",
          //   "licensing_time": "",
          //   "price_str": "29.9元",
          //   "kilometers_str": "",
          //   "licensing_time_str": ""
          // },
          // {
          //   "id": 13,
          //   "name": "双净柔纸巾（1*6*4），木浆纸，24包（箱）126元",
          //   "cover": "http://image.wms.wljkxys.com/202009305f742a98ce6c9.jpg",
          //   "cover_url": "http://image.wms.wljkxys.com/202009305f742a98ce6c9.jpg",
          //   "g_type": 1,
          //   "price": "126.00",
          //   "is_private": 0,
          //   "earnings": "61.00",
          //   "comment_num": 0,
          //   "enjoy": 0,
          //   "join_goods_id": 6,
          //   "read_num": 6,
          //   "is_postage": 1,
          //   "type": 0,
          //   "jinzhu_id": 782,
          //   "shop_id": 2,
          //   "shop_name": "小罗小店",
          //   "avatar": "http://image.wms.wljkxys.com/202009305f742f2b83137",
          //   "is_enjoy": 0,
          //   "is_official": 0,
          //   "is_join": 0,
          //   "check_buy": 0,
          //   "kilometers": "",
          //   "small_path": "",
          //   "color": "",
          //   "licensing_time": "",
          //   "price_str": "126元",
          //   "kilometers_str": "",
          //   "licensing_time_str": ""
          // },
          // {
          //   "id": 14,
          //   "name": "双净绿茶软抽（8包一提），木浆纸，2提（16包）29.9元",
          //   "cover": "http://image.wms.wljkxys.com/202009305f742e3bf05b0.jpg",
          //   "cover_url": "http://image.wms.wljkxys.com/202009305f742e3bf05b0.jpg",
          //   "g_type": 1,
          //   "price": "29.90",
          //   "is_private": 0,
          //   "earnings": "4.30",
          //   "comment_num": 0,
          //   "enjoy": 0,
          //   "join_goods_id": 5,
          //   "read_num": 6,
          //   "is_postage": 1,
          //   "type": 0,
          //   "jinzhu_id": 782,
          //   "shop_id": 2,
          //   "shop_name": "小罗小店",
          //   "avatar": "http://image.wms.wljkxys.com/202009305f742f2b83137",
          //   "is_enjoy": 0,
          //   "is_official": 0,
          //   "is_join": 0,
          //   "check_buy": 0,
          //   "kilometers": "",
          //   "small_path": "",
          //   "color": "",
          //   "licensing_time": "",
          //   "price_str": "29.9元",
          //   "kilometers_str": "",
          //   "licensing_time_str": ""
          // },
          // {
          //   "id": 15,
          //   "name": "明柔可湿水抽纸（8包一提），木浆纸，3提（24包）29.9元",
          //   "cover": "http://image.wms.wljkxys.com/202009305f7429ef4e7ac.png",
          //   "cover_url": "http://image.wms.wljkxys.com/202009305f7429ef4e7ac.png",
          //   "g_type": 1,
          //   "price": "29.90",
          //   "is_private": 0,
          //   "earnings": "2.40",
          //   "comment_num": 0,
          //   "enjoy": 0,
          //   "join_goods_id": 4,
          //   "read_num": 4,
          //   "is_postage": 1,
          //   "type": 0,
          //   "jinzhu_id": 782,
          //   "shop_id": 2,
          //   "shop_name": "小罗小店",
          //   "avatar": "http://image.wms.wljkxys.com/202009305f742f2b83137",
          //   "is_enjoy": 0,
          //   "is_official": 0,
          //   "is_join": 0,
          //   "check_buy": 0,
          //   "kilometers": "",
          //   "small_path": "",
          //   "color": "",
          //   "licensing_time": "",
          //   "price_str": "29.9元",
          //   "kilometers_str": "",
          //   "licensing_time_str": ""
          // },
          // {
          //   "id": 17,
          //   "name": "双净本色纸抽纸330张 （20包/箱），本色纸，20包（箱）69.9元",
          //   "cover": "http://image.wms.wljkxys.com/202009305f7429311b182.jpg",
          //   "cover_url": "http://image.wms.wljkxys.com/202009305f7429311b182.jpg",
          //   "g_type": 1,
          //   "price": "69.90",
          //   "is_private": 0,
          //   "earnings": "34.90",
          //   "comment_num": 0,
          //   "enjoy": 0,
          //   "join_goods_id": 3,
          //   "read_num": 7,
          //   "is_postage": 1,
          //   "type": 0,
          //   "jinzhu_id": 782,
          //   "shop_id": 2,
          //   "shop_name": "小罗小店",
          //   "avatar": "http://image.wms.wljkxys.com/202009305f742f2b83137",
          //   "is_enjoy": 0,
          //   "is_official": 0,
          //   "is_join": 0,
          //   "check_buy": 0,
          //   "kilometers": "",
          //   "small_path": "",
          //   "color": "",
          //   "licensing_time": "",
          //   "price_str": "69.9元",
          //   "kilometers_str": "",
          //   "licensing_time_str": ""
          // },
          // {
          //   "id": 16,
          //   "name": "双净宝宝柔软抽纸408张（8包/提），木浆纸，2提（16包）29.9元",
          //   "cover": "http://image.wms.wljkxys.com/202009305f74288b8a6c5.jpg",
          //   "cover_url": "http://image.wms.wljkxys.com/202009305f74288b8a6c5.jpg",
          //   "g_type": 1,
          //   "price": "29.90",
          //   "is_private": 0,
          //   "earnings": "2.90",
          //   "comment_num": 0,
          //   "enjoy": 0,
          //   "join_goods_id": 2,
          //   "read_num": 5,
          //   "is_postage": 1,
          //   "type": 0,
          //   "jinzhu_id": 782,
          //   "shop_id": 2,
          //   "shop_name": "小罗小店",
          //   "avatar": "http://image.wms.wljkxys.com/202009305f742f2b83137",
          //   "is_enjoy": 0,
          //   "is_official": 0,
          //   "is_join": 0,
          //   "check_buy": 0,
          //   "kilometers": "",
          //   "small_path": "",
          //   "color": "",
          //   "licensing_time": "",
          //   "price_str": "29.9元",
          //   "kilometers_str": "",
          //   "licensing_time_str": ""
          // },
          // {
          //   "id": 18,
          //   "name": "明柔可湿水抽纸（10包/提），木浆纸，3提（30包）29.9元",
          //   "cover": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
          //   "cover_url": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
          //   "g_type": 1,
          //   "price": "29.90",
          //   "is_private": 0,
          //   "earnings": "3.90",
          //   "comment_num": 0,
          //   "enjoy": 0,
          //   "join_goods_id": 1,
          //   "read_num": 5,
          //   "is_postage": 1,
          //   "type": 0,
          //   "jinzhu_id": 782,
          //   "shop_id": 2,
          //   "shop_name": "小罗小店",
          //   "avatar": "http://image.wms.wljkxys.com/202009305f742f2b83137",
          //   "is_enjoy": 0,
          //   "is_official": 0,
          //   "is_join": 0,
          //   "check_buy": 0,
          //   "kilometers": "",
          //   "small_path": "",
          //   "color": "",
          //   "licensing_time": "",
          //   "price_str": "29.9元",
          //   "kilometers_str": "",
          //   "licensing_time_str": ""
          // }
        ],
        count: 1,
        total_page: 1,
        page_size: 10,
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
        total_page: 1,
        page_size: 10,
      }
    ],
    card: {
      // "card_info": {
      //   "id": 23,
      //   "sq_jinzhu_id": 782,
      //   "template_card_id": 2,
      //   "name": "胡椒",
      //   "title": "UI",
      //   "mobile": "18046143570",
      //   "email": "2505655@qq.com",
      //   "wx_number": "2222333",
      //   "company": "厦门星辰追梦",
      //   "address": "厦门金海湾",
      //   "avatar": "https://wms.com/upload/20200922/f632f471db0dc259edfe0f08a4cea312.jpg",
      //   "wx_qr_code": "https://wms.com/upload/20200922/f632f471db0dc259edfe0f08a4cea312.jpg",
      //   "introduce_myself": "设计是最大的幸福",
      //   "personal_label": "a:2:{i:0;s:1:\"2\";i:1;s:1:\"5\";}",
      //   "personal_style": "a:2:{i:0;s:54:\"http://image.wms.wljkxys.com/201910305db95969e222e.png\";i:1;s:54:\"http://image.wms.wljkxys.com/201910305db959966fa68.png\";}",
      //   "create_time": 1554875788,
      //   "update_time": 1601432828,
      //   "del_flag": 0,
      //   "type": 1,
      //   "is_public": 0,
      //   "hometown": '福建厦门',
      //   "landline": null,
      //   "vidieo_url": 'https://vd3.bdstatic.com/mda-khqh5jcid4bgkur1/sc/mda-khqh5jcid4bgkur1.mp4?v_from_s=hkapp-haokan-nanjing&auth_key=1641983487-0-0-7704cdf23332db70415117a14553259b&bcevod_channel=searchbox_feed&pd=1&pt=3&logid=0086888447&vid=7450474287727338224&abtest=&klogid=0086888447',
      //   "profession_id": 1,
      //   "industry_id": 1,
      //   "company_avatar": 'http://image.wms.wljkxys.com/2022011061dbcddf655db.png',
      //   "company_introduce": '厦门脉呗科技营销有限公司于2019年04月10日成立。法定代表人陈先生，公司经营范围包括：软件开发；电影和影视节目发行；互联网信息服务（不含药品信息服务和网吧）；信息系统集成服务；信息技术咨询服务；数据处理和存储服务…',
      //   "company_introduce_image": null,
      //   "company_introduce_image_arr": ['http://image.wms.wljkxys.com/2022011061dbcddf655db.png', 'http://image.wms.wljkxys.com/2022011061dbcddf655db.png', 'http://image.wms.wljkxys.com/2022011061dbcddf655db.png', 'http://image.wms.wljkxys.com/2022011061dbcddf655db.png', 'http://image.wms.wljkxys.com/2022011061dbcddf655db.png', 'http://image.wms.wljkxys.com/2022011061dbcddf655db.png', 'http://image.wms.wljkxys.com/2022011061dbcddf655db.png', 'http://image.wms.wljkxys.com/2022011061dbcddf655db.png'],
      //   "user_id": 1,
      //   "status": 1,
      //   "profession": "技术",
      //   "industry": "互联网/IT/电子/通信"
      // },
      // "is_me": 1,
      // "card_info_label_list": [{
      //   id: 1,
      //   name: '活泼开朗',
      //   zan_status: true,
      //   zan_num: 34
      // }, {
      //   id: 2,
      //   name: '乐观',
      //   zan_status: true,
      //   zan_num: 3
      // }, {
      //   id: 3,
      //   name: '活泼开朗',
      //   zan_status: true,
      //   zan_num: 1
      // }, {
      //   id: 4,
      //   name: '活泼',
      //   zan_status: true,
      //   zan_num: 1
      // }, {
      //   id: 5,
      //   name: '活泼开朗',
      //   zan_status: true,
      //   zan_num: 1
      // }, {
      //   id: 6,
      //   name: '活泼开朗',
      //   zan_status: true,
      //   zan_num: 1
      // }, {
      //   id: 7,
      //   name: '活泼开朗',
      //   zan_status: true,
      //   zan_num: 1
      // }],
      // "view_user_list": [{
      //     "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI9A7pz9icibBKLFGHLN9Z8wDnRRw4apoq16EWXzZictmuUZaNyY3PiaW8Xo3p1IHkoiaEqkQr3RZ8u0jQ/132",
      //     "user_id": 2
      //   },
      //   {
      //     "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLkibgRehIkVWlZjqKFCmvZWIBs57mh8A89iaJ8VHTibnjqqPIm7sIgSNp2cjdmMlL61Uu44cCLx1E1w/132",
      //     "user_id": 1
      //   },
      //   {
      //     "avatar": "http://thirdwx.qlogo.cn/mmopen/vi_32/j7QrfoC6aHSiaJ2eOH6Yick99WZHESib7k73oXre7WemI4rgnSMCsL8GheuhUvbXaAza1uoUlng9icETibolAG5CruA/132",
      //     "user_id": 0
      //   }
      // ],
      // "view_user_number": 3,
      // "card_style": {
      //   "card_image": "http://image.wms.wljkxys.com/2022011061dbcddf655db.png",
      //   "name_color": "22",
      //   "name_transparent": "22",
      //   "is_name_show": 0,
      //   "avatar_color": "22",
      //   "avatar_transparent": "22",
      //   "is_avatar_show": 0,
      //   "phone_color": "22",
      //   "phone_transparent": "22",
      //   "is_phone_show": 0,
      //   "profession_color": "22",
      //   "profession_transparent": "22",
      //   "is_profession_show": 0,
      //   "company_color": "22",
      //   "company_transparent": "22",
      //   "is_company_show": 0,
      //   "address_color": "22",
      //   "address_transparent": "22",
      //   "is_address_show": 0,
      //   "phone_image": "http://image.wms.wljkxys.com/2022011061dbcdf1a6735.png",
      //   "email_image": "http://image.wms.wljkxys.com/2022011061dbcdf59c769.png",
      //   "address_image": "http://image.wms.wljkxys.com/2022011061dbcdf9d2de4.png",
      //   "background_image": "http://image.wms.wljkxys.com/2022011061dbcdfd8c26e.png",
      //   "create_time": 1641795085,
      //   "email_color": "22",
      //   "email_transparent": "22",
      //   "is_email_show": 0,
      //   "style_id": 4,
      //   "name": "高级",
      //   "is_customize_set": 0,
      //   "card_image_preview": "http://image.wms.wljkxys.com/2022011261de7d9bdf9fc.png",
      //   "user_id": 1,
      //   "sq_business_card_id": 23,
      //   "style_image_id": 0,
      //   "style_image_customize": ""
      // },
      // "card_zan": 1,
      // "card_is_zan": 0,
      // "hometown_status": 1,
      // "card_status": 0
    },
  },
  watch: {
    tabIndex: {
      handler(nv, ov, obj) {
        // console.log(nv)
        if (this.data.type == 2) {
          this.getStyleList().then(ress => {
            this.setData({
              editData: ress.data,
            })

            // const tempTags = ress.data.select_tag_list.filter(item => item.select_status)
            // let myTagarr = []
            // if (tempTags.length) {
            //   myTagarr = tempTags.map(it => it.id).join()
            // }
          })
        }
        if (nv === 0) {
          // 简介
          const data = this.data.card
          if (!data.card_info.introduce_myself &&
            !data.card_info_label_list.length &&
            !data.card_info.hometown &&
            !data.card_info.vidieo_url
          ) {
            return false
          }

          this.setData({
            'tadeOptions[0].cache': this.data.card.card_info,
          })
        } else if (nv === 1) {
          // 产品
          this.getGoodList({
            sq_business_card_id: this.data.card.card_info.sq_jinzhu_id
          })
        } else if (nv === 2) {
          // 企业
          const data = this.data.card
          if (!data.card_info.company_avatar &&
            !data.card_info.company &&
            !data.card_info.hometown &&
            !data.card_info.company_introduce &&
            !data.card_info.company_introduce_image_arr.length
          ) {
            return false
          }

          this.setData({
            'tadeOptions[2].cache': this.data.card.card_info,
          })
        } else if (nv === 3) {
          // 评价
          if (!this.data.tadeOptions[3].cache.length) {
            this.getCommentList({
              sq_business_card_id: this.data.card.card_info.id
            })
          }
        }
      },
      // immediate: true
    },
    type: {
      handler(nv, ov, obj) {
        const temp = {}

        if (nv == 1) {
          temp.navigationBarTitleText = '我的名片'
          temp.navStatus = 'isEmpty'
          temp.tabbar = ['我的简介', '我的产品', '我的企业', '我的评价']
          // 我的名片
          if (this.data.userInfo.has_card) {
            setTabBar.call(this)
          } else {
            setTabBar.call(this, {
              list
            })
          }
        } else {
          //他的名片 不用设置
        }

        if (nv == 2) {
          temp.navStatus = 'isEntryWithShare'
          temp.tabbar = ['TA的简介', 'TA的产品', 'TA的企业', 'TA的评价']
          // 自动将Ta人名片保持至名片夹 并toast：已为您将该名片至名片夹
          wx.showToast({
            icon: 'none',
            title: '已为您将该名片至名片夹',
          })
        }

        this.setData(temp)
        // 动态元素加载完成之后执行
        setTimeout(() => {
          this.elOnReady()
        }, 0)
      }
    }
  },
  awakenDialogAuth(e) {
    this.setData({
      'dialog.auth.opened': 1
    })
  },
  // 滚动时触发
  scrollHandle(e) {
    // console.log(e.detail.scrollTop)
    // console.log(this.data.TASrollTop)

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
  // 他的名片-回递名片
  replyHandle() {
    if (this.businessCheck()) return
    //若用户没有创建名片，显示制作名片弹窗3.若制作名片弹窗已经显示，点击toast:请先制作您的数字名片
    if (this.store.data.userInfo.has_card == 0) {
      if (this.data.tipcount != 1) {
        this.setData({
          'dialog.diy.opened': 1,
          tipcount: 1
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '请先制作您的数字名片',
        })
      }
    } else if (this.store.data.userInfo.has_card == 1) {
      // 点击跳转至回递名片页面
      wx.navigateTo({
        url: '/pages/returnbiz/returnbiz',
      })
    }
  },
  // 联系Ta点击，同点击电话，弹出电话弹窗
  contactHandle() {
    if (this.businessCheck()) return

    this.setData({
      'dialog.telephone.telephoneObj': this.data.section4[0],
      'dialog.telephone.opened': 1
    })
  },
  zanHandle() {
    if (this.businessCheck()) return

    const type = this.data.card.card_is_zan ? 0 : 1
    this.setCardZan({
      type,
      sq_business_card_id: this.data.card.card_info.id
    }).then(res => {
      const tempData = {
        'card.card_is_zan': type
      }
      if (type) {
        tempData['card.card_zan'] = this.data.card.card_zan + 1
      } else {
        tempData['card.card_zan'] = this.data.card.card_zan - 1
      }

      this.setData(tempData)
    })
  },
  // 标签赞
  labelZanHandle(e) {
    const item = e.currentTarget.dataset.item

    const type = item.status ? 0 : 1
    const temp = {
      type,
      sq_business_card_id: this.data.card.card_info.id,
      user_new_label_id: item.id
    }
    this.setCardLabelZan(temp).then(res => {
      this.data.editData.select_tag_list.some((it, index) => {
        if (it.id === item.id) {
          this.setData({
            [`editData.select_tag_list[${index}].status`]: type,
          })
        }
      })
    })
  },
  // 同乡
  hometownHandle() {
    const type = this.data.card.hometown_status ? 0 : 1

    const temp = {
      type,
      sq_business_card_id: this.data.card.card_info.id
    }
    this.setTownsman(temp).then(res => {
      wx.showToast({
        icon: 'none',
        title: res.msg,
      })
      const tempData = {
        'card.hometown_status': type
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
    const that = this
    if (!this.data.is_select) {
      wx.showToast({
        icon: 'none',
        title: '请阅读并同意《用户协议》和《隐私协议》后，在创建数字名片',
      })
      return
    }

    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        // this.store.data.userInfo = res.userInfo
        that.store.data.userInfo['avatar_url'] = res.userInfo.avatarUrl
        that.store.data.userInfo['city'] = res.userInfo.city
        that.store.data.userInfo['country'] = res.userInfo.country
        that.store.data.userInfo['gender'] = res.userInfo.gender
        that.store.data.userInfo['language'] = res.userInfo.language
        that.store.data.userInfo['nick_name'] = res.userInfo.nickName
        that.store.data.userInfo['province'] = res.userInfo.province
        that.update()

        // 上传用户信息
        updateUserInfo(res.userInfo).then(res => {
          // console.log(res.msg)
          wx.navigateTo({
            url: '/pages/bizEdit/easy',
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
  // 他人名片-授权弹窗关闭-立即弹出diy名片制作弹窗
  authCloseHandle() {
    if (!this.store.data.userInfo.has_card) {
      this.setData({
        'dialog.diy.opened': 1
      })
    }
  },
  // // 授权组件授权成功触发
  // signinedHandle(e) {
  //   console.log(e)
  // },
  businessCheck() {
    // 除Ta的简介、Ta的产品、Ta的企业、Ta的评价可点击切换内容以外，其他可点击内容，用户未授权微信，直接显示微信授权弹窗
    if (this.data.type == 2 && !this.store.data.userInfo.avatar_url) {
      this.setData({
        'dialog.auth.opened': 1
      })
      return true
    }
    return false
  },
  // 电话 邮箱 地址 座机
  itemHandle(e) {

    if (this.businessCheck()) return

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
            // latitude: 24.44579,
            // longitude: 118.08243
            latitude: this.data.card.card_info.address_latitude,
            longitude: this.data.card.card_info.address_longitude
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
        // 'dialog.auth.opened': 1,
        // 'dialog.diy.opened': 1,
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
  // 评论点赞
  commentZanHandle(e) {
    const item = e.currentTarget.dataset.item
    const type = item.is_zan ? 0 : 1
    this.setCommentZan({
      type,
      comment_id: item.id
    }).then(res => {
      this.data.tadeOptions[3].cache.some((it, index) => {
        if (it.id === item.id) {
          this.setData({
            [`tadeOptions[3].cache[${index}].is_zan`]: type,
            [`tadeOptions[3].cache[${index}].zan_num`]: type ? item.zan_num + 1 : item.zan_num - 1
          })
          return true
        }
        return false
      })
    })
  },
  // 跳转至全部评论页
  toEvaluateHandle() {
    wx.navigateTo({
      url: '/pages/ta/evaluate/list',
    })
  },
  // 跳转至立即评论页
  toEvaluatesubmitHandle() {
    if (this.businessCheck()) return
    wx.navigateTo({
      url: '/pages/ta/evaluate/submit',
    })
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
  setCardLabelZan(data) {
    return new Promise((resolve, reject) => {
      setCardLabelZan(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setCommentZan(data) {
    return new Promise((resolve, reject) => {
      setCommentZan(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setTownsman(data) {
    return new Promise((resolve, reject) => {
      setTownsman(data).then(res => {
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
  getGoodList(dataObj) {
    const tempData = {
      page: this.data.tadeOptions[1].count,
      page_size: this.data.tadeOptions[1].page_size,
      sq_business_card_id: this.data.card.card_info.sq_business_card_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getGoodList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.tadeOptions[1].cache.push(...res.data.data)
          this.setData({
            [`tadeOptions[1].cache`]: this.data.tadeOptions[1].cache,
            [`tadeOptions[1].total_page`]: res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            // 测试数据
            // [`tadeOptions.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            [`tadeOptions[1].cache`]: res.data.data,
            [`tadeOptions[1].total_page`]: res.data.last_page,
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 滚动到最底部
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')
    const tadeOptions = this.data.tadeOptions

    if (tadeOptions[this.data.tabIndex].count + 1 > tadeOptions[this.data.tabIndex].total_page) return

    this.setData({
      [`tadeOptions[${this.data.tabIndex}].count`]: ++tadeOptions[this.data.tabIndex].count
    })

    if (this.data.tabIndex === 1) {
      this.getGoodList('scrollToLower')
    } else if (this.data.tabIndex === 3) {
      this.getCommentList('scrollToLower')
    }

  },
  getCommentList(dataObj) {
    const tempData = {
      page: this.data.tadeOptions[3].count,
      page_size: this.data.tadeOptions[3].page_size,
      sq_business_card_id: this.data.card.card_info.sq_business_card_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getCommentList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.tadeOptions[3].cache.push(...res.data.data)
          this.setData({
            [`tadeOptions[3].cache`]: this.data.tadeOptions[3].cache,
            [`tadeOptions[3].total_page`]: res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            // 测试数据
            // [`tadeOptions.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            [`tadeOptions[3].cache`]: res.data.data,
            [`tadeOptions[3].total_page`]: res.data.last_page,
            commentNum: res.data.total //总数
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  initRequest(userInfo, options) {
    console.log(userInfo)
    // 更新userInfo
    this.store.data.userInfo = userInfo
    this.update()

    this.setData({
      userInfo,
      ...options
    })

    this.businessCheck()


    const temp = {}
    if (this.data.s) {
      // 通过扫码打开的他人的名片
      temp.type = this.data.type
      temp.sq_business_card_id = this.data.b
    } else {
      // 自己的名片
      temp.type = this.data.type
    }

    this.getCardDetail(temp).then(res => {

      // if (this.data.type == 1) {
      //   // 我的名片
      //   if (userInfo.has_card) {
      //     setTabBar.call(this)
      //   } else {
      //     setTabBar.call(this, {
      //       list
      //     })
      //   }
      // } else {
      //   //他的名片 不用设置
      // }

      // if (temp.type == 2) {
      //   // 自动将Ta人名片保持至名片夹 并toast：已为您将该名片至名片夹
      //   wx.showToast({
      //     icon: 'none',
      //     title: '已为您将该名片至名片夹',
      //   })
      // }
      let section4 = []
      if (res.data.card_info.mobile) {
        section4.push({
          id: 1,
          img: '/assets/images/card_phone.png',
          title: '电话',
          content: res.data.card_info.mobile,
          toast: '',
          name: res.data.card_info.name
        })
      }
      if (res.data.card_info.email) {
        section4.push({
          id: 2,
          img: '/assets/images/card_email.png',
          title: '邮箱',
          content: res.data.card_info.email,
          toast: '已为您复制Ta的邮箱至您的粘贴板',
          name: res.data.card_info.name
        })
      }

      if (res.data.card_info.address) {
        section4.push({
          id: 3,
          img: '/assets/images/card_location.png',
          title: '地址',
          content: res.data.card_info.address,
          toast: '已将地址存至手机粘贴板', //然后，跳转至地图导航
          name: res.data.card_info.name
        })
      }
      if (res.data.card_info.landline) {
        section4.push({
          id: 4,
          img: '/assets/images/card_call.png',
          title: '座机',
          content: res.data.card_info.landline,
          name: res.data.card_info.name
        })
      }

      const tempSetdata = {
        card: res.data,
        tabIndex: this.data.tabIndex,
        section4,
        'card.data': res.data.card_info,
        'card.style': res.data.card_style
      }

      // 自己查看自己的分享名片
      if (res.data.is_me) {
        tempSetdata.type = 1
        // tempSetdata.tabbar = ['TA的简介', 'TA的产品', 'TA的企业', 'TA的评价']
      }

      // 名片被禁用 分查看自己名片时 他人查看自己名片时
      if (res.data.card_info.status === 0) {
        tempSetdata['dialog.forbidden.opened'] = 1
        tempSetdata['dialog.forbidden.forbiddenObj'] = {
          text1: this.data.type == 1 ? '您已被停用使用数字星片' : '该数字星片已被停用',
          text2: this.data.type == 1 ? '详情请联系客服：0592-5239124' : '无法进行查看'
        }
      }
      this.setData(tempSetdata)

      this.store.data.card.data = res.data.card_info
      this.store.data.card.style = res.data.card_style
      this.store.data.card.card_info_label_list = res.data.card_info_label_list
      this.store.data.card.card_is_zan = res.data.card_is_zan
      this.store.data.card.card_status = res.data.card_status
      this.store.data.card.card_zan = res.data.card_zan
      this.store.data.card.hometown_status = res.data.hometown_status
      this.store.data.card.is_me = res.data.is_me
      this.store.data.card.view_user_list = res.data.view_user_list
      this.store.data.card.view_user_number = res.data.view_user_number

      this.update()
    })
  },
  elOnReady() {
    const that = this;
    const query = wx.createSelectorQuery();

    query.select('.tab').boundingClientRect(function (rect) {
      that.setData({
        tabWidth: rect.width,
        tabHeight: rect.height
      })
    }).exec();

    query.select('.section5').boundingClientRect(function (rect) {
      that.data.TASrollTop = (rect.top - that.store.data.compatibleInfo.navHeight - 11)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().setWatcher(this) //设置监听器
    // if (options.scene) {
    //   let temp = {}

    //   // const scene = decodeURIComponent(options.scene).substr(1)
    //   const scene = decodeURIComponent(options.scene)
    //   // console.log(scene)
    //   //scene=order_id=84&user_type=1
    //   //id=31&first_id=110&share_id=110
    //   if (scene && scene != 'undefined') {
    //     scene.split('?')[1].split('&').forEach(it => {
    //       const i = it.split('=')
    //       temp[i[0]] = i[1]
    //     })
    //   } else {
    //     temp = options
    //   }
    //   options = temp
    // }
    let temp = {}

    if (JSON.stringify(options) == "{}") {
      temp.type = 1
      temp.navigationBarTitleText = '我的名片'
      temp.navStatus = 'isEmpty'
      temp.tabbar = ['我的简介', '我的产品', '我的企业', '我的评价']
    } else {
      if (options.q) {
        // 扫码进入
        const q = decodeURIComponent(options.q) // 获取到二维码原始链接内容
        // const scancode_time = parseInt(options.scancode_time) // 获取用户扫码时间 UNIX 时间戳
        if (q && q != 'undefined') {
          q.split('?')[1].split('&').forEach(it => {
            const i = it.split('=')
            temp[i[0]] = i[1]
          })
        } else {
          temp = options
        }

        // temp.navStatus = 'isEntryWithShare'
        // temp.tabbar = ['TA的简介', 'TA的产品', 'TA的企业', 'TA的评价']
      } else {
        // 非扫码
        temp = options
        // 以下调试后删除（type=2&b=4269&s=3452）--------------------------------------------
      }
    }
    options = temp

    // {type: "2", b: "4269", s: "3452"}
    console.log(options)

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    if (this.store.data.userInfo) {
      this.initRequest(this.store.data.userInfo, options)
    } else {
      getApp().getUserInfoCallback = (res => {
        this.initRequest(res, options)
      })
    }

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

    // 评价后返回评价页更新数据
    if (this.data.tabIndex === 3) {
      this.getCommentList({
        sq_business_card_id: this.data.card.card_info.id
      })
    }

    // if (!this.data.userInfo) {
    //   this.setData({
    //     userInfo: this.store.data.userInfo
    //   })
    // }
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
  async onShareAppMessage(res) {
    if (res.from === 'button') {

      if (this.businessCheck()) return

      const imageUrl = await drawCanvas(this, this.data.cid, this.data.card)
      console.log(imageUrl)
      // 来自页面内转发按钮
      return {
        title: ' ',
        path: `pages/index/index?type=2&b=${this.data.card.card_info.id}&s=${this.store.data.userInfo.id}`,
        // imageUrl: 'https://sharepuls.xcmbkj.com/img_enrollment.png',
        imageUrl,
        success(res) {
          console.log('分享成功', res)
        },
        fail(res) {
          console.log(res)
        }
      }
    }
  },
})