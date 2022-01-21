// components/Dialog/forbidden.js

// 浏览内容授权体验
import {
  updateUserInfo
} from '../../api/user'
import store from '../../store/common'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Boolean,
      value: false
    },
    forbiddenObj: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUseGetUserProfile: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dialogTapHandle() {
      // this.setData({
      //   dialogVisible: false
      // })
    },
    cancelHandle() {
      this.setData({
        dialogVisible: false
      })
      this.triggerEvent('cancel', 'cancel')
    },
    confirmHandle() {
      this.setData({
        dialogVisible: false
      })
      this.triggerEvent('confirm', 'confirm')
    }
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})