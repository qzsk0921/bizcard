// components/navigation/commonnav.js
import store from '../../store/common'
import create from '../../utils/create'
// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    color: String,
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
    location: {
      type: Object,
      value: {
        formatted_addresses: {
          recommend: '定位中...'
        }
      }
    }
  },
  observers: {
    'navHeight': function (val) {
      if(!val) {
        wx.getSystemInfo().then(res => {
          const navHeight = res.statusBarHeight + store.data.compatibleInfo.menuButtonObject.height + (store.data.compatibleInfo.menuButtonObject.top - res.statusBarHeight) * 2

          this.setData({
            navHeight
          })
        })
      }
    },
    'navTop':function(val) {
      if(!val) {
        this.setData({
          navTop:wx.getMenuButtonBoundingClientRect().top
        })
      }
    },
    'menuButtonHeight':function(val) {
      if(!val) {
        this.setData({
          menuButtonHeight:wx.getMenuButtonBoundingClientRect().height
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
      // console.log(_data)
      if (_data.tabbarPage) {
        // tabbar页面优先处理
        if (el) {
          // 点击左边的元素触发
          wx.switchTab({
            url: _data.tabbarPage,
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
        } else if (_data.status === 'location') {
          // 选择收货地址
          if (el) {
            wx.navigateTo({
              url: '/pages/location/index/index',
            })
          }
        } else if (_data.status === 'category') {
          // 分类页面
          if (el) {
            wx.navigateTo({
              url: '/pages/search/search',
            })
          }
        } else {
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