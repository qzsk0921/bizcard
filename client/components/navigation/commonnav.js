// components/navigation/commonnav.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  setTabBar
} from '../../utils/business'
// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    type: Number, //1我的名片 2他的名片
    color: String,
    colorArrow: {
      type: String,
      value: '#333'
    },
    bgColor: String,
    navigationBarTitleText: String,
    marginLeft: Number,
    navHeight: Number,
    navTop: Number,
    menuButtonHeight: Number,
    transition: Boolean, //详情页顶部导航栏过渡
    status: {
      type: String,
      value: 'leftarrow'
    },
    tabbarPage: {
      type: String,
      value: ''
    },
    // location: {
    //   type: Object,
    //   value: {
    //     formatted_addresses: {
    //       recommend: '定位中...'
    //     }
    //   }
    // }
  },
  observers: {
    'navHeight': function (val) {
      if (!val) {
        wx.getSystemInfo().then(res => {
          const navHeight = res.statusBarHeight + store.data.compatibleInfo.menuButtonObject.height + (store.data.compatibleInfo.menuButtonObject.top - res.statusBarHeight) * 2

          this.setData({
            navHeight
          })
        })
      }
    },
    'navTop': function (val) {
      if (!val) {
        this.setData({
          navTop: wx.getMenuButtonBoundingClientRect().top
        })
      }
    },
    'menuButtonHeight': function (val) {
      if (!val) {
        this.setData({
          menuButtonHeight: wx.getMenuButtonBoundingClientRect().height
        })
      }
    },
  },
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateBackHandle(e) {
      const _data = this.data,
        el = e.target.dataset.el

      if (_data.tabbarPage) {
        // tabbar页面优先处理
        if (el) {
          // 点击左边的元素触发
          if (_data.status === 'bizholderr') {
            // 从星片夹列表进入Ta人星片后
            // 左上角首页按钮需改为返回按钮， 且点击后返回星片夹列表页
            setTabBar.call(this, {
              selected: 2
            }, function () {
              wx.reLaunch({
                url: '/pages/bizholder/bizholder'
              })
            })
            return
          }

          // 除Ta的简介、Ta的产品、Ta的企业、Ta的评价可点击切换内容以外，其他可点击内容，用户未授权微信，直接显示微信授权弹窗
          if (!store.data.userInfo.avatar_url && this.data.type == 2 && _data.tabbarPage == '/pages/index/index') {
            this.triggerEvent('awakenDialogAuth')
            return
          }
          // 点击返回我的名片页，若用户没有创建数字星片，点击返回无名片信息页面
          // if (store.data.userInfo.has_card == 0) {}
          wx.reLaunch({
            url: _data.tabbarPage
          })
        }
      } else {
        // 不是tabbar页面的跳转
        if (_data.status === 'isEntryWithShare') {
          if (el) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        } else if (_data.status === 'bizholder') {
          if (el) {
            wx.navigateTo({
              url: '/pages/bizmsg/bizmsg',
            })
          }
        }
        // else if (_data.status === 'location') {
        //   // 选择收货地址
        //   if (el) {
        //     wx.navigateTo({
        //       url: '/pages/location/index/index',
        //     })
        //   }
        // } 
        // else if (_data.status === 'category') {
        //   // 分类页面
        //   if (el) {
        //     wx.navigateTo({
        //       url: '/pages/search/search',
        //     })
        //   }
        // }
        else {
          if (el) {
            wx.navigateBack({
              fail(err) {
                console.log(err)
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            })
          }
        }
      }
    },
    navigateBack(delta) {
      wx.navigateBack({
        // delta
        fail(err) {
          console.log(err)
          wx.redirectTo({
            url: '/pages/home/home',
          })
        }
      })
    },
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})