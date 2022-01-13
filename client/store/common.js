export default {
  data: {
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    compatibleInfo: {
      menuButtonObject: wx.getMenuButtonBoundingClientRect(), //按钮（右上角胶囊按钮）的布局位置信息
      systemInfo: null, //systemInfo system:'ios'||'android',
      navHeight: 0, //顶部导航栏高度
      isIphoneX: null,
    },
    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)

    address_id: wx.getStorageSync('address_id') || null, //当前使用的收货地址

    has_card: 1, //0无名片 1有名片
    styles: [] //版式
    // logs: [],
    // b: { 
    //   arr: [{ name: '数值项目1' }] ,
    //   //深层节点也支持函数属性
    //   fnTest:function(){
    //     return this.motto.split('').reverse().join('')
    //   }
    // },
    // firstName: 'dnt',
    // lastName: 'zhang',
    // fullName: function () {
    //   return this.firstName + this.lastName
    // },
    // pureProp: 'pureProp',
    // globalPropTest: 'abc', //更改我会刷新所有页面,不需要再组件和页面声明data依赖
    // ccc: { ddd: 1 } //更改我会刷新所有页面,不需要再组件和页面声明data依赖
  },
  globalData: ['globalPropTest', 'ccc.ddd'],
  logMotto: function () {
    console.log(this.data.motto)
  },
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}