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
    title: {
      // 提示的标题
      type: String,
      value: '',
    },
    content: {
      // 提示的内容
      type: String,
      value: ''
    },
    confirmText: {
      // 确认按钮的文字
      type: String,
      value: '确定'
    },
    confirmBgColor: {
      type: String,
      value: '#F23D32'
    },
    cancelText: {
      // 取消按钮的文字
      type: String,
      value: '取消'
    },
    cancelBgColor: {
      type: String,
      value: '#FFFFFF'
    }
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
      // this.triggerEvent('signup', false)
      this.setData({
        dialogVisible: false
      })
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