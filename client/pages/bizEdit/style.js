// pages/bizEdit/style.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  getStyleList,
  getStyleImageList,
  setStyleImage,
  setStyleInfo,
} from '../../api/cardEdit'
import {
  addOrder
} from '../../api/order'
const duration = 500

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

    currentField: null, //操控显示的属性
    card: null,
    navStatus: '', //isEmpty
    currentStyleId: null, //当前选中版式id
    currentStyleImageObj: null, //当前选中星片图对象
    styleList: {
      // "card_info": {
      //   "id": 4269,
      //   "sq_jinzhu_id": 10353,
      //   "template_card_id": 1,
      //   "name": "l凌老师",
      //   "title": "",
      //   "mobile": "18969479682",
      //   "email": "",
      //   "wx_number": "",
      //   "company": "星辰",
      //   "address": "",
      //   "avatar": "",
      //   "wx_qr_code": "",
      //   "introduce_myself": null,
      //   "personal_label": "",
      //   "personal_style": null,
      //   "create_time": 1642073177,
      //   "update_time": 1642073177,
      //   "del_flag": 0,
      //   "type": 1,
      //   "is_public": 0,
      //   "hometown": null,
      //   "landline": null,
      //   "vidieo_url": null,
      //   "profession_id": 0,
      //   "industry_id": 0,
      //   "company_avatar": null,
      //   "company_introduce": null,
      //   "company_introduce_image": null,
      //   "user_id": 3452,
      //   "status": 1,
      //   "profession": "",
      //   "industry": "",
      //   "company_introduce_image_arr": ""
      // },
      // "style_list": [{
      //   "id": 1,
      //   "name": "版式一",
      //   "image": "http://image.wms.xcmbkj.com/2022011261de4ddadcfc0.png",
      //   "status": 1,
      //   "sort": 950,
      //   "create_time": 1641459985,
      //   "type": 1
      // }],
      // "style_image_list": [{
      //     "id": 7,
      //     "card_image": "http://image.wms.xcmbkj.com/2022011261de504947c7e.png",
      //     "price": "0.00",
      //     "stock": 9999999,
      //     "sort": 1000,
      //     "name_color": "#FFFFFF",
      //     "name_transparent": "100",
      //     "is_name_show": 1,
      //     "is_name_default_show": 1,
      //     "avatar_color": "",
      //     "avatar_transparent": "",
      //     "is_avatar_show": 0,
      //     "is_avatar_default_show": 0,
      //     "phone_color": "#FFFFFF",
      //     "phone_transparent": "80",
      //     "is_phone_show": 1,
      //     "is_phone_default_show": 0,
      //     "profession_color": "#FFFFFF",
      //     "profession_transparent": "80",
      //     "is_profession_show": 1,
      //     "is_profession_default_show": 0,
      //     "company_color": "#FFFFFF",
      //     "company_transparent": "80",
      //     "is_company_show": 1,
      //     "is_company_default_show": 1,
      //     "address_color": "#FFFFFF",
      //     "address_transparent": "80",
      //     "is_address_show": 1,
      //     "is_address_default_show": 0,
      //     "phone_image": "http://image.wms.xcmbkj.com/2022011261de4e6b01284.png",
      //     "email_image": "http://image.wms.xcmbkj.com/2022011261de4e6f180c1.png",
      //     "address_image": "http://image.wms.xcmbkj.com/2022011261de4f598fe0a.png",
      //     "background_image": "",
      //     "status": 1,
      //     "create_time": 1641959061,
      //     "email_color": "",
      //     "email_transparent": "",
      //     "is_email_show": 0,
      //     "is_email_default_show": 0,
      //     "style_id": 1,
      //     "name": "版式一图一",
      //     "is_customize_set": 0,
      //     "card_image_preview": null,
      //     "customize_image": "",
      //     is_buy: 1,
      //     "tag_list": [{
      //         "field": "name",
      //         "name": "名称",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "avatar",
      //         "name": "头像",
      //         "is_show": 0,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "phone",
      //         "name": "手机",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "profession",
      //         "name": "职业",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "company",
      //         "name": "公司",
      //         "is_show": 1,
      //         "is_default_show": 1
      //       },
      //       {
      //         "field": "address",
      //         "name": "地址",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "email",
      //         "name": "邮箱",
      //         "is_show": 0,
      //         "is_default_show": 0
      //       }
      //     ]
      //   },
      //   {
      //     "id": 8,
      //     "card_image": "http://image.wms.xcmbkj.com/2022011261de505e9c2f8.png",
      //     "price": "0.00",
      //     "stock": 9999999,
      //     "sort": 950,
      //     "name_color": "#FFFFFF",
      //     "name_transparent": "100",
      //     "is_name_show": 1,
      //     "is_name_default_show": 1,
      //     "avatar_color": "",
      //     "avatar_transparent": "",
      //     "is_avatar_show": 0,
      //     "is_avatar_default_show": 0,
      //     "phone_color": "#FFFFFF",
      //     "phone_transparent": "80",
      //     "is_phone_show": 1,
      //     "is_phone_default_show": 0,
      //     "profession_color": "#FFFFFF",
      //     "profession_transparent": "80",
      //     "is_profession_show": 1,
      //     "is_profession_default_show": 0,
      //     "company_color": "#FFFFFF",
      //     "company_transparent": "80",
      //     "is_company_show": 1,
      //     "is_company_default_show": 1,
      //     "address_color": "#FFFFFF",
      //     "address_transparent": "80",
      //     "is_address_show": 1,
      //     "is_address_default_show": 0,
      //     "phone_image": "http://image.wms.xcmbkj.com/2022011261de4ec45774a.png",
      //     "email_image": "",
      //     "address_image": "http://image.wms.xcmbkj.com/2022011261de4ed582ccc.png",
      //     "background_image": "",
      //     "status": 1,
      //     "create_time": 1641959169,
      //     "email_color": "",
      //     "email_transparent": "",
      //     "is_email_show": 0,
      //     "is_email_default_show": 0,
      //     "style_id": 1,
      //     "name": "版式一图二",
      //     "is_customize_set": 0,
      //     "card_image_preview": null,
      //     "customize_image": "",
      //     is_buy: 1,
      //     "tag_list": [{
      //         "field": "name",
      //         "name": "名称",
      //         "is_show": 1,
      //         "is_default_show": 1
      //       },
      //       {
      //         "field": "avatar",
      //         "name": "头像",
      //         "is_show": 0,
      //         "is_default_show": 1
      //       },
      //       {
      //         "field": "phone",
      //         "name": "手机",
      //         "is_show": 0,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "profession",
      //         "name": "职业",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "company",
      //         "name": "公司",
      //         "is_show": 1,
      //         "is_default_show": 1
      //       },
      //       {
      //         "field": "address",
      //         "name": "地址",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "email",
      //         "name": "邮箱",
      //         "is_show": 0,
      //         "is_default_show": 0
      //       }
      //     ]
      //   },
      //   {
      //     "id": 9,
      //     "card_image": "http://image.wms.xcmbkj.com/2022011261de508d8b26b.png",
      //     "price": "9.90",
      //     "stock": 1000,
      //     "sort": 800,
      //     "name_color": "#FFFFFF",
      //     "name_transparent": "100",
      //     "is_name_show": 1,
      //     "is_name_default_show": 1,
      //     "avatar_color": "",
      //     "avatar_transparent": "",
      //     "is_avatar_show": 0,
      //     "is_avatar_default_show": 0,
      //     "phone_color": "#FFFFFF",
      //     "phone_transparent": "80",
      //     "is_phone_show": 1,
      //     "is_phone_default_show": 0,
      //     "profession_color": "#FFFFFF",
      //     "profession_transparent": "80",
      //     "is_profession_show": 1,
      //     "is_profession_default_show": 0,
      //     "company_color": "#FFFFFF",
      //     "company_transparent": "80",
      //     "is_company_show": 1,
      //     "is_company_default_show": 1,
      //     "address_color": "#FFFFFF",
      //     "address_transparent": "80",
      //     "is_address_show": 1,
      //     "is_address_default_show": 0,
      //     "phone_image": "http://image.wms.xcmbkj.com/2022011261de50a1dd74c.png",
      //     "email_image": "",
      //     "address_image": "http://image.wms.xcmbkj.com/2022011261de50a55a796.png",
      //     "background_image": "",
      //     "status": 1,
      //     "create_time": 1641959640,
      //     "email_color": "",
      //     "email_transparent": "",
      //     "is_email_show": 0,
      //     "is_email_default_show": 0,
      //     "style_id": 1,
      //     "name": "版式一图三",
      //     "is_customize_set": 0,
      //     "card_image_preview": null,
      //     "customize_image": "",
      //     is_buy: 0,
      //     "tag_list": [{
      //         "field": "name",
      //         "name": "名称",
      //         "is_show": 1,
      //         "is_default_show": 1
      //       },
      //       {
      //         "field": "avatar",
      //         "name": "头像",
      //         "is_show": 0,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "phone",
      //         "name": "手机",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "profession",
      //         "name": "职业",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "company",
      //         "name": "公司",
      //         "is_show": 1,
      //         "is_default_show": 1
      //       },
      //       {
      //         "field": "address",
      //         "name": "地址",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "email",
      //         "name": "邮箱",
      //         "is_show": 0,
      //         "is_default_show": 0
      //       }
      //     ]
      //   },
      //   {
      //     "id": 10,
      //     "card_image": "http://image.wms.xcmbkj.com/2022011261de512ebc195.png",
      //     "price": "9.90",
      //     "stock": 1000,
      //     "sort": 750,
      //     "name_color": "#FFFFFF",
      //     "name_transparent": "100",
      //     "is_name_show": 1,
      //     "is_name_default_show": 1,
      //     "avatar_color": "",
      //     "avatar_transparent": "",
      //     "is_avatar_show": 0,
      //     "is_avatar_default_show": 0,
      //     "phone_color": "#FFFFFF",
      //     "phone_transparent": "80",
      //     "is_phone_show": 1,
      //     "is_phone_default_show": 0,
      //     "profession_color": "#FFFFFF",
      //     "profession_transparent": "80",
      //     "is_profession_show": 1,
      //     "is_profession_default_show": 0,
      //     "company_color": "#FFFFFF",
      //     "company_transparent": "80",
      //     "is_company_show": 1,
      //     "is_company_default_show": 1,
      //     "address_color": "#FFFFFF",
      //     "address_transparent": "80",
      //     "is_address_show": 1,
      //     "is_address_default_show": 0,
      //     "phone_image": "http://image.wms.xcmbkj.com/2022011261de514c8f26a.png",
      //     "email_image": "",
      //     "address_image": "http://image.wms.xcmbkj.com/2022011261de5151a3934.png",
      //     "background_image": "",
      //     "status": 1,
      //     "create_time": 1641959802,
      //     "email_color": "",
      //     "email_transparent": "",
      //     "is_email_show": 0,
      //     "is_email_default_show": 0,
      //     "style_id": 1,
      //     "name": "版式一图四",
      //     "is_customize_set": 0,
      //     "card_image_preview": null,
      //     "customize_image": "",
      //     is_buy: 1,
      //     "tag_list": [{
      //         "field": "name",
      //         "name": "名称",
      //         "is_show": 1,
      //         "is_default_show": 1
      //       },
      //       {
      //         "field": "avatar",
      //         "name": "头像",
      //         "is_show": 0,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "phone",
      //         "name": "手机",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "profession",
      //         "name": "职业",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "company",
      //         "name": "公司",
      //         "is_show": 1,
      //         "is_default_show": 1
      //       },
      //       {
      //         "field": "address",
      //         "name": "地址",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "email",
      //         "name": "邮箱",
      //         "is_show": 0,
      //         "is_default_show": 0
      //       }
      //     ]
      //   },
      //   {
      //     "id": 11,
      //     "card_image": "http://image.wms.xcmbkj.com/2022011261de51ba8d405.png",
      //     "price": "9.90",
      //     "stock": 1000,
      //     "sort": 650,
      //     "name_color": "#FFFFFF",
      //     "name_transparent": "100",
      //     "is_name_show": 1,
      //     "is_name_default_show": 1,
      //     "avatar_color": "",
      //     "avatar_transparent": "",
      //     "is_avatar_show": 0,
      //     "is_avatar_default_show": 0,
      //     "phone_color": "#FFFFFF",
      //     "phone_transparent": "80",
      //     "is_phone_show": 1,
      //     "is_phone_default_show": 0,
      //     "profession_color": "#FFFFFF",
      //     "profession_transparent": "80",
      //     "is_profession_show": 1,
      //     "is_profession_default_show": 0,
      //     "company_color": "#FFFFFF",
      //     "company_transparent": "80",
      //     "is_company_show": 1,
      //     "is_company_default_show": 1,
      //     "address_color": "#FFFFFF",
      //     "address_transparent": "80",
      //     "is_address_show": 1,
      //     "is_address_default_show": 0,
      //     "phone_image": "http://image.wms.xcmbkj.com/2022011261de51cde2793.png",
      //     "email_image": "",
      //     "address_image": "http://image.wms.xcmbkj.com/2022011261de51d2ab594.png",
      //     "background_image": "",
      //     "status": 1,
      //     "create_time": 1641959914,
      //     "email_color": "",
      //     "email_transparent": "",
      //     "is_email_show": 0,
      //     "is_email_default_show": 0,
      //     "style_id": 1,
      //     "name": "版式一图五",
      //     "is_customize_set": 0,
      //     "card_image_preview": null,
      //     "customize_image": "",
      //     is_buy: 0,
      //     "tag_list": [{
      //         "field": "name",
      //         "name": "名称",
      //         "is_show": 1,
      //         "is_default_show": 1
      //       },
      //       {
      //         "field": "avatar",
      //         "name": "头像",
      //         "is_show": 0,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "phone",
      //         "name": "手机",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "profession",
      //         "name": "职业",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "company",
      //         "name": "公司",
      //         "is_show": 1,
      //         "is_default_show": 1
      //       },
      //       {
      //         "field": "address",
      //         "name": "地址",
      //         "is_show": 1,
      //         "is_default_show": 0
      //       },
      //       {
      //         "field": "email",
      //         "name": "邮箱",
      //         "is_show": 0,
      //         "is_default_show": 0
      //       }
      //     ]
      //   }
      // ],
      // "order_list": {
      //   id: 1,
      //   user_id: 1,
      //   order_sn: 1111111111,
      //   style_image_id: 1,
      //   out_trade_no: 1, //支付订单号
      //   price: 199, //价格
      //   status: 1, //状态
      //   pay_time: '1999-9-9', //支付时间
      //   create_time: '1999-9-8', //创建时间
      //   style_image_info: [{
      //       "id": 9,
      //       "card_image": "http://image.wms.xcmbkj.com/2022011261de508d8b26b.png",
      //       "price": "9.90",
      //       "stock": 1000,
      //       "sort": 800,
      //       "name_color": "#FFFFFF",
      //       "name_transparent": "100",
      //       "is_name_show": 1,
      //       "is_name_default_show": 1,
      //       "avatar_color": "",
      //       "avatar_transparent": "",
      //       "is_avatar_show": 0,
      //       "is_avatar_default_show": 0,
      //       "phone_color": "#FFFFFF",
      //       "phone_transparent": "80",
      //       "is_phone_show": 1,
      //       "is_phone_default_show": 0,
      //       "profession_color": "#FFFFFF",
      //       "profession_transparent": "80",
      //       "is_profession_show": 1,
      //       "is_profession_default_show": 0,
      //       "company_color": "#FFFFFF",
      //       "company_transparent": "80",
      //       "is_company_show": 1,
      //       "is_company_default_show": 1,
      //       "address_color": "#FFFFFF",
      //       "address_transparent": "80",
      //       "is_address_show": 1,
      //       "is_address_default_show": 0,
      //       "phone_image": "http://image.wms.xcmbkj.com/2022011261de50a1dd74c.png",
      //       "email_image": "",
      //       "address_image": "http://image.wms.xcmbkj.com/2022011261de50a55a796.png",
      //       "background_image": "",
      //       "status": 1,
      //       "create_time": 1641959640,
      //       "email_color": "",
      //       "email_transparent": "",
      //       "is_email_show": 0,
      //       "is_email_default_show": 0,
      //       "style_id": 10,
      //       "name": "版式一图三",
      //       "is_customize_set": 0,
      //       "card_image_preview": null,
      //       "customize_image": "",
      //       "tag_list": [{
      //           "field": "name",
      //           "name": "名称",
      //           "is_show": 1,
      //           "is_default_show": 1
      //         },
      //         {
      //           "field": "avatar",
      //           "name": "头像",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "phone",
      //           "name": "手机",
      //           "is_show": 1,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "profession",
      //           "name": "职业",
      //           "is_show": 1,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "company",
      //           "name": "公司",
      //           "is_show": 1,
      //           "is_default_show": 1
      //         },
      //         {
      //           "field": "address",
      //           "name": "地址",
      //           "is_show": 1,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "email",
      //           "name": "邮箱",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         }
      //       ]
      //     },
      //     {
      //       "id": 10,
      //       "card_image": "http://image.wms.xcmbkj.com/2022011261de512ebc195.png",
      //       "price": "9.90",
      //       "stock": 1000,
      //       "sort": 750,
      //       "name_color": "#FFFFFF",
      //       "name_transparent": "100",
      //       "is_name_show": 1,
      //       "is_name_default_show": 1,
      //       "avatar_color": "",
      //       "avatar_transparent": "",
      //       "is_avatar_show": 0,
      //       "is_avatar_default_show": 0,
      //       "phone_color": "#FFFFFF",
      //       "phone_transparent": "80",
      //       "is_phone_show": 1,
      //       "is_phone_default_show": 0,
      //       "profession_color": "#FFFFFF",
      //       "profession_transparent": "80",
      //       "is_profession_show": 1,
      //       "is_profession_default_show": 0,
      //       "company_color": "#FFFFFF",
      //       "company_transparent": "80",
      //       "is_company_show": 1,
      //       "is_company_default_show": 1,
      //       "address_color": "#FFFFFF",
      //       "address_transparent": "80",
      //       "is_address_show": 1,
      //       "is_address_default_show": 0,
      //       "phone_image": "http://image.wms.xcmbkj.com/2022011261de514c8f26a.png",
      //       "email_image": "",
      //       "address_image": "http://image.wms.xcmbkj.com/2022011261de5151a3934.png",
      //       "background_image": "",
      //       "status": 1,
      //       "create_time": 1641959802,
      //       "email_color": "",
      //       "email_transparent": "",
      //       "is_email_show": 0,
      //       "is_email_default_show": 0,
      //       "style_id": 1,
      //       "name": "版式一图四",
      //       "is_customize_set": 0,
      //       "card_image_preview": null,
      //       "customize_image": "",
      //       "tag_list": [{
      //           "field": "name",
      //           "name": "名称",
      //           "is_show": 1,
      //           "is_default_show": 1
      //         },
      //         {
      //           "field": "avatar",
      //           "name": "头像",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "phone",
      //           "name": "手机",
      //           "is_show": 1,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "profession",
      //           "name": "职业",
      //           "is_show": 1,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "company",
      //           "name": "公司",
      //           "is_show": 1,
      //           "is_default_show": 1
      //         },
      //         {
      //           "field": "address",
      //           "name": "地址",
      //           "is_show": 1,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "email",
      //           "name": "邮箱",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         }
      //       ]
      //     },
      //     {
      //       "id": 11,
      //       "card_image": "http://image.wms.xcmbkj.com/2022011261de51ba8d405.png",
      //       "price": "9.90",
      //       "stock": 1000,
      //       "sort": 650,
      //       "name_color": "#FFFFFF",
      //       "name_transparent": "100",
      //       "is_name_show": 1,
      //       "is_name_default_show": 1,
      //       "avatar_color": "",
      //       "avatar_transparent": "",
      //       "is_avatar_show": 0,
      //       "is_avatar_default_show": 0,
      //       "phone_color": "#FFFFFF",
      //       "phone_transparent": "80",
      //       "is_phone_show": 1,
      //       "is_phone_default_show": 0,
      //       "profession_color": "#FFFFFF",
      //       "profession_transparent": "80",
      //       "is_profession_show": 1,
      //       "is_profession_default_show": 0,
      //       "company_color": "#FFFFFF",
      //       "company_transparent": "80",
      //       "is_company_show": 1,
      //       "is_company_default_show": 1,
      //       "address_color": "#FFFFFF",
      //       "address_transparent": "80",
      //       "is_address_show": 1,
      //       "is_address_default_show": 0,
      //       "phone_image": "http://image.wms.xcmbkj.com/2022011261de51cde2793.png",
      //       "email_image": "",
      //       "address_image": "http://image.wms.xcmbkj.com/2022011261de51d2ab594.png",
      //       "background_image": "",
      //       "status": 1,
      //       "create_time": 1641959914,
      //       "email_color": "",
      //       "email_transparent": "",
      //       "is_email_show": 0,
      //       "is_email_default_show": 0,
      //       "style_id": 1,
      //       "name": "版式一图五",
      //       "is_customize_set": 0,
      //       "card_image_preview": null,
      //       "customize_image": "",
      //       "tag_list": [{
      //           "field": "name",
      //           "name": "名称",
      //           "is_show": 1,
      //           "is_default_show": 1
      //         },
      //         {
      //           "field": "avatar",
      //           "name": "头像",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "phone",
      //           "name": "手机",
      //           "is_show": 1,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "profession",
      //           "name": "职业",
      //           "is_show": 1,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "company",
      //           "name": "公司",
      //           "is_show": 1,
      //           "is_default_show": 1
      //         },
      //         {
      //           "field": "address",
      //           "name": "地址",
      //           "is_show": 1,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "email",
      //           "name": "邮箱",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         }
      //       ]
      //     },
      //     {
      //       "id": 2,
      //       "card_image": "http://image.wms.xcmbkj.com/2022010761d79b2d5632d.png",
      //       "price": "32.00",
      //       "stock": 3,
      //       "sort": 23,
      //       "name_color": "32",
      //       "name_transparent": "32",
      //       "is_name_show": 0,
      //       "is_name_default_show": 0,
      //       "avatar_color": "23",
      //       "avatar_transparent": "32",
      //       "is_avatar_show": 0,
      //       "is_avatar_default_show": 0,
      //       "phone_color": "32",
      //       "phone_transparent": "32",
      //       "is_phone_show": 0,
      //       "is_phone_default_show": 0,
      //       "profession_color": "23",
      //       "profession_transparent": "23",
      //       "is_profession_show": 0,
      //       "is_profession_default_show": 0,
      //       "company_color": "23",
      //       "company_transparent": "23",
      //       "is_company_show": 0,
      //       "is_company_default_show": 0,
      //       "address_color": "23",
      //       "address_transparent": "43",
      //       "is_address_show": 0,
      //       "is_address_default_show": 0,
      //       "phone_image": "http://image.wms.xcmbkj.com/2022010761d79b33b99c8.png",
      //       "email_image": "http://image.wms.xcmbkj.com/2022010761d79b3837d61.png",
      //       "address_image": "http://image.wms.xcmbkj.com/2022010761d79b3da62cd.png",
      //       "background_image": "http://image.wms.xcmbkj.com/2022010761d79b41ee414.png",
      //       "status": 1,
      //       "create_time": 1641519958,
      //       "email_color": "32",
      //       "email_transparent": "23",
      //       "is_email_show": 0,
      //       "is_email_default_show": 0,
      //       "style_id": 3,
      //       "name": "样式二",
      //       "is_customize_set": 0,
      //       "card_image_preview": null,
      //       "customize_image": "",
      //       "tag_list": [{
      //           "field": "name",
      //           "name": "名称",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "avatar",
      //           "name": "头像",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "phone",
      //           "name": "手机",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "profession",
      //           "name": "职业",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "company",
      //           "name": "公司",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "address",
      //           "name": "地址",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "email",
      //           "name": "邮箱",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         }
      //       ]
      //     },
      //     {
      //       "id": 1,
      //       "card_image": "http://image.wms.xcmbkj.com/2022010661d6bf4d3d509.png",
      //       "price": "9.00",
      //       "stock": 11,
      //       "sort": 23,
      //       "name_color": "1",
      //       "name_transparent": "2",
      //       "is_name_show": 0,
      //       "is_name_default_show": 0,
      //       "avatar_color": "1",
      //       "avatar_transparent": "2",
      //       "is_avatar_show": 0,
      //       "is_avatar_default_show": 0,
      //       "phone_color": "1",
      //       "phone_transparent": "2",
      //       "is_phone_show": 1,
      //       "is_phone_default_show": 1,
      //       "profession_color": "1",
      //       "profession_transparent": "2",
      //       "is_profession_show": 0,
      //       "is_profession_default_show": 0,
      //       "company_color": "1",
      //       "company_transparent": "2",
      //       "is_company_show": 0,
      //       "is_company_default_show": 0,
      //       "address_color": "1",
      //       "address_transparent": "2",
      //       "is_address_show": 0,
      //       "is_address_default_show": 0,
      //       "phone_image": "http://image.wms.xcmbkj.com/2022010661d6bf5a59ef0.png",
      //       "email_image": "http://image.wms.xcmbkj.com/2022010661d6bf5e4ece0.png",
      //       "address_image": "http://image.wms.xcmbkj.com/2022010661d6bf6717ac4.png",
      //       "background_image": "http://image.wms.xcmbkj.com/2022010661d6bf6ceb60c.png",
      //       "status": 1,
      //       "create_time": 1641463682,
      //       "email_color": "1",
      //       "email_transparent": "2",
      //       "is_email_show": 0,
      //       "is_email_default_show": 0,
      //       "style_id": 3,
      //       "name": "样式三",
      //       "is_customize_set": 1,
      //       "card_image_preview": null,
      //       "customize_image": "",
      //       "tag_list": [{
      //           "field": "name",
      //           "name": "名称",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "avatar",
      //           "name": "头像",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "phone",
      //           "name": "手机",
      //           "is_show": 1,
      //           "is_default_show": 1
      //         },
      //         {
      //           "field": "profession",
      //           "name": "职业",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "company",
      //           "name": "公司",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "address",
      //           "name": "地址",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         },
      //         {
      //           "field": "email",
      //           "name": "邮箱",
      //           "is_show": 0,
      //           "is_default_show": 0
      //         }
      //       ]
      //     }
      //   ] //订单名片样式
      // },
      // "select_tag_list": [{
      //     "id": 1,
      //     "name": "标签1",
      //     "status": 1,
      //     "sort": 10000,
      //     "create_time": 1641969189,
      //     "update_time": 1641969189,
      //     "select_status": 0
      //   },
      //   {
      //     "id": 2,
      //     "name": "标签2",
      //     "status": 1,
      //     "sort": 9950,
      //     "create_time": 1641969200,
      //     "update_time": 1641969200,
      //     "select_status": 0
      //   },
      //   {
      //     "id": 3,
      //     "name": "标签3",
      //     "status": 1,
      //     "sort": 9900,
      //     "create_time": 1641969210,
      //     "update_time": 1641969210,
      //     "select_status": 0
      //   },
      //   {
      //     "id": 4,
      //     "name": "标签4",
      //     "status": 1,
      //     "sort": 9850,
      //     "create_time": 1641969217,
      //     "update_time": 1641969217,
      //     "select_status": 0
      //   },
      //   {
      //     "id": 5,
      //     "name": "标签5",
      //     "status": 1,
      //     "sort": 9800,
      //     "create_time": 1641969225,
      //     "update_time": 1641969225,
      //     "select_status": 0
      //   },
      //   {
      //     "id": 6,
      //     "name": "标签6",
      //     "status": 1,
      //     "sort": 9750,
      //     "create_time": 1641969239,
      //     "update_time": 1641969239,
      //     "select_status": 0
      //   },
      //   {
      //     "id": 7,
      //     "name": "标签7",
      //     "status": 1,
      //     "sort": 9700,
      //     "create_time": 1641969261,
      //     "update_time": 1641969261,
      //     "select_status": 0
      //   },
      //   {
      //     "id": 8,
      //     "name": "标签8",
      //     "status": 1,
      //     "sort": 9650,
      //     "create_time": 1641969268,
      //     "update_time": 1641969268,
      //     "select_status": 0
      //   },
      //   {
      //     "id": 9,
      //     "name": "标签9",
      //     "status": 1,
      //     "sort": 9600,
      //     "create_time": 1641969274,
      //     "update_time": 1641969274,
      //     "select_status": 0
      //   },
      //   {
      //     "id": 10,
      //     "name": "标签10",
      //     "status": 1,
      //     "sort": 9550,
      //     "create_time": 1641969282,
      //     "update_time": 1641969282,
      //     "select_status": 0
      //   },
      //   {
      //     "id": 11,
      //     "name": "标签11",
      //     "status": 1,
      //     "sort": 9500,
      //     "create_time": 1641969287,
      //     "update_time": 1641969287,
      //     "select_status": 0
      //   }
      // ]
    }, //名片编辑详情
    cid: 1, //版式id
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
    const dataset = e.currentTarget.dataset
    const temp = {
      currentStyleImageObj: dataset.item,
    }
    if (!dataset.type) {
      // 选择星片图
      if (!this.data.currentStyleId) {
        wx.showToast({
          title: '请先选择版式',
          icon: 'none'
        })
        return
      }
    } else if (dataset.type === 'nft') {
      // 选择nft星片图 版式和星片图变为不选中态（版式会下架）
      temp.currentStyleId = null
      temp.currentStyleImageObj.is_buy = 1
    }

    this.setData(temp)
  },
  tagHandle(e) {
    // console.log(e)
    const dataset = e.currentTarget.dataset
    // 固定属性
    if (dataset.item.is_default_show) return
    // 非固定属性
    else {
      // 显示0,1 取反
      this.data.currentStyleImageObj.tag_list[dataset.index].is_show = dataset.item.is_show ? 0 : 1
      this.setData({
        [`currentStyleImageObj.tag_list[${dataset.index}]`]: this.data.currentStyleImageObj.tag_list[dataset.index],
        currentField: dataset.item.field
      })
    }
  },
  // 勾选购买须知
  readHandle() {
    this.setData({
      readed: !this.data.readed
    })
  },
  // 阅读购买须知
  toPurinstruction() {
    wx.navigateTo({
      url: '../richtext/purinstruction',
    })
  },
  // 保存版式
  saveHandle() {
    if (!this.data.currentStyleId) {
      wx.showToast({
        title: '请先选择版式',
        icon: 'none'
      })
      return
    }
    const currentStyleImageObj = this.data.currentStyleImageObj
    // const tempStyleImage = {
    //   style_id: this.data.currentStyleId,
    //   style_image_id: currentStyleImageObj.id,
    //   image_url: currentStyleImageObj.card_image
    // }
    // // 设置用户自定义名片图片
    // this.setStyleImage(tempStyleImage).then(res => {})

    // 设置名片图风格
    const getShowStatus = (field) => {
      let is_show = 0
      currentStyleImageObj.tag_list.some(item => {
        if (item.field === field) {
          is_show = item.is_show
          return true
        }
        return false
      })
      return is_show
    }

    const tempStyleInfo = {
      type: 2,
      sq_business_card_id: this.store.data.card.data.id,
      style_image_id: currentStyleImageObj.id,
      is_name_show: getShowStatus('name'),
      is_avatar_show: getShowStatus('avatar'),
      is_phone_show: getShowStatus('phone'),
      is_profession_show: getShowStatus('profession'),
      is_company_show: getShowStatus('company'),
      is_address_show: getShowStatus('address'),
      is_email_show: getShowStatus('email')
    }
    this.setStyleInfo(tempStyleInfo).then(res => {

      wx.showToast({
        title: '保存成功',
        icon: 'none',
        duration
      })

      setTimeout(() => {
        wx.navigateBack({
          delta: 0,
        })
      }, duration)
    })
  },
  // 购买并使用
  payHandle() {
    if (!this.data.readed) {
      wx.showToast({
        title: '请先阅读购买须知',
        icon: 'none'
      })
      return
    }

    this.addOrder({
      style_image_id: this.data.currentStyleImageObj.id
    }).then(res => {
      this.wxPay(res.data)
    })
  },
  // 微信支付
  wxPay(payModel) {
    wx.requestPayment({
      'timeStamp': payModel.timeStamp.toString(),
      'nonceStr': payModel.nonceStr,
      'package': 'prepay_id=' + payModel.prepay_id, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
      'signType': payModel.signType,
      'paySign': payModel.paySign,
      'success': function (res) {
        console.log(res)
        // 支付成功后，返回个人中心，刷新个人中心页面
        wx.switchTab({
          url: '/pages/profile/profile',
        })
        // 获取消息下发权限(只在支付回调或tap手势事件能调用)
        // wx.requestSubscribeMessage({
        //   tmplIds: ['mtwGRB07oFL2fJgoiIipKVCYFFHS0vytiw2rTHqtAz8', 'gB9gMYOrOkLl-yTHdBP5vUS5rgwsTW1hjUYNml-57Go'],
        //   success(res) {},
        //   fail(err) {
        //     console.log(err)
        //   },
        //   complete() {
        //     // console.log("dasda", payModel.package.substr(10))
        //     that.addOrder(payModel.out_trade_no, payModel.package.substr(10))
        //   }
        // })
      },
      'fail': function (res) {
        const msg = res.errMsg == 'requestPayment:fail cancel' ? '取消支付' : res.errMsg
        wx.showToast({
          title: msg,
          icon: 'none'
        })

        console.log(res)
      }
    }).catch(res => {
      console.log(res)
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
  setStyleImage(data) {
    return new Promise((resolve, reject) => {
      setStyleImage(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setStyleInfo(data) {
    return new Promise((resolve, reject) => {
      setStyleInfo(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addOrder(data) {
    return new Promise((resolve, reject) => {
      addOrder(data).then(res => {
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