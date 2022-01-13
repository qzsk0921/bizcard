export default {
  baseUrl: 'https://mbapp-test.xcmbkj.com', //测试
  // baseUrl: 'https://wms.wljkxys.com', 
  contentType: 'application/json',
  tencentKey: 'NMUBZ-KWM6V-E5IPZ-UARUF-6CKRH-FFBM2',
  // tencentKey: 'SIIBZ-BL36R-R54WV-WXKZM-OUTBQ-ZWFPR',
  tabBar: {
    list: [{
        "pagePath": "/pages/index/index",
        "text": "我的星片",
        "iconPath": "/assets/images/btn_my_card_f.png",
        "selectedIconPath": "/assets/images/btn_my_card_n.png"
      },
      {
        "pagePath": "/pages/radar/radar",
        "text": "星片雷达",
        "iconPath": "/assets/images/btn_data_f.png",
        "selectedIconPath": "/assets/images/btn_data_n.png"
      },
      {
        "pagePath": "/pages/bizholder/bizholder",
        "text": "星片夹",
        "iconPath": "/assets/images/btn_card_holder_f.png",
        "selectedIconPath": "/assets/images/btn_card_holder_n.png"
      },
      {
        "pagePath": "/pages/index/index",
        "text": "专属商城",
        "iconPath": "/assets/images/btn_shop_f.png",
        "selectedIconPath": "/assets/images/btn_shop_n.png"
      }
    ]
  }
}