// src/components/dialog/auth.js
import {
  updateUserInfo
} from '../../api/user'
import store from '../../store/common'
import create from '../../utils/create'

const app = getApp()

// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    // dialogVisible: Boolean,
    opened: {
      type: Number,
      value: 0
    },
  },
  observers: {
    'opened': function (val) {
      // console.log(val)
      if (val === 1) {
        const query = wx.createSelectorQuery().in(this)
        query.select('.dropdown-item-down__content').boundingClientRect(rect => {
          let height = rect.height

          // 如果是switchTab页面，加tabbar高度
          if (this.getTabBar().data.list) {
            const tabbarRoutes = this.getTabBar().data.list
            const currentRoute = getCurrentPages()[getCurrentPages().length - 1].route
            const res = tabbarRoutes.some(item => item.pagePath === currentRoute || item.pagePath === '/' + currentRoute)

            if (res) {
              height += store.data.compatibleInfo.tabbarH
            }
          }

          this.setData({
            height
          })
        }).exec()
      } else {
        this.triggerEvent('close')
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    // dialogVisible: true,
    canIUseGetUserProfile: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dropdownItemTapHandle() {

    },
    toRuleHandle(e) {
      // console.log(e)
      const id = e.target.dataset.id
      wx.navigateTo({
        url: `/src/pages/agreement/index?id=${id}`,
      })
    },
    getUserProfile(e) {
      const _this = this
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // console.log(res)
          this.setData({
            userInfo: res.userInfo,
            // hasUserInfo: true
          })

          this.updateUserInfo(res.userInfo).then(res => {
            this.setData({
              opened: 0
            })
            store.data.userInfo['avatar_url'] = res.userInfo.avatarUrl
            store.data.userInfo['city'] = res.userInfo.city
            store.data.userInfo['country'] = res.userInfo.country
            store.data.userInfo['gender'] = res.userInfo.gender
            store.data.userInfo['language'] = res.userInfo.language
            store.data.userInfo['nick_name'] = res.userInfo.nickName
            store.data.userInfo['province'] = res.userInfo.province
            store.update()
            // 授权成功
            this.triggerEvent('updated', true)
            setTimeout(() => {
              this.triggerEvent('signined', false)
            }, 400)
          }).catch(res => {
            this.triggerEvent('signined', false)
            setTimeout(() => {
              _this.setData({
                dialogVisible: true
              })
            }, 400)

            wx.showToast({
              title: res,
              icon: 'none'
            })
          })

          // const userInfo = res.userInfo
          // if (userInfo) {
          //   this.saveUserInfo({
          //     user_info: userInfo
          //   }).then(res => {
          //     this.setData({
          //       userInfo
          //     })
          //     for (const iterator of Object.keys(userInfo)) {
          //       app.globalData.userInfo[iterator] = userInfo[iterator]
          //     }
          //   })
          // }
        }
      })
    },
    nosigninHandle() {
      this.setData({
        opened: 0
      })
    },
    updateUserInfo(data) {
      return new Promise((resolve, reject) => {
        updateUserInfo(data).then(res => {
          resolve(res)
        }).catch(res => {
          reject(res)
        })
      })
    },
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})