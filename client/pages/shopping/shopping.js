// pages/shopping/shopping.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  setTabBar
} from '../../utils/business'

import {
  updatePhone
} from '../../api/user'

import {
  getApplyShopInfo,
  applyShop
} from '../../api/shopping'

import {
  checkMobile
} from '../../utils/util'

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    shopData: {
      // "id": 1,
      // "sq_jinzhu_id": 7795,
      // "user_id": 3442,
      // "phone": "13559570108",
      // "name": "姓名",
      // "status": 3, //0:待审核 1:已通过 2:已拒绝 3:已处理 （0和3都显示为待审核）-1未申请
      // "create_time": 1642849819,
      // "is_show": 1,
      // "appid": "dsaf"
    },
    formData: {
      phone: '',
      name: ''
    },

    userInfo: null,
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
  },
  getPhoneNumber(e) {
    console.log(e)
    const _this = this
    if (e.detail.encryptedData) {
      this.updatePhone({
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      }).then(res => {
        const data = res.data.phone
        // console.log(data)
        _this.setData({
          'userInfo.phone': data,
          'formData.phone': data,
        })
        getApp().globalData.userInfo['phone'] = data //服务器解密后反回
        wx.showToast({
          title: '绑定成功',
          icon: 'none'
        })
      }).catch(res => {
        console.log(res)
      })
    } else {
      // wx.showModal({
      //   content: '为便于服务需要您进行手机号授权',
      //   confirmText: '确定',
      //   confirmColor: '#4283FB',
      //   showCancel: false,
      //   success(res) {
      //     if (res.confirm) {
      //       console.log('确定')
      //     } else if (res.cancel) {
      //       console.log('取消')
      //     }
      //   }
      // })
    }
  },
  updatePhone(data) {
    return new Promise((resolve, reject) => {
      updatePhone(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 自动填入手机号
  autoPhoneNumber() {
    this.setData({
      'formData.phone': this.data.userInfo.phone
    })
  },
  // 查看我的专属商城
  toMiniShopHandle(e) {
    wx.navigateToMiniProgram({
      appId: this.data.shopData.appid
    })
  },
  formSubmit(e) {
    console.log(e)
    const formData = e.detail.value

    Object.keys(formData).forEach(key => {
      this.data.formData[key] = formData[key]
    })
    // 校验
    if (!this.formValidate(this.data.formData)) return

    applyShop(this.data.formData).then(res => {
      getApplyShopInfo().then(res => {
        this.setData({
          shopData: res.data
        })
      })
    })
  },
  formValidate(formData) {
    const flag = Object.keys(formData).some(key => {
      if (!formData[key]) {
        if (key === 'name') {
          wx.showToast({
            icon: 'none',
            title: '请输入姓名',
          })
          return true
        } else if (key === 'phone') {
          wx.showToast({
            icon: 'none',
            title: '请输入联系方式',
          })
          return true
        }
        return false
      }
      return false
    })

    if (!flag) {
      // 校验手机号
      if (!checkMobile(this.data.formData.phone)) {
        wx.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
        return false
      }
      return true
    } else {
      return false
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTabBar.call(this, {
      selected: 3
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.data.userInfo) {
      this.setData({
        userInfo: this.store.data.userInfo
      })
    }

    getApplyShopInfo().then(res => {
      this.setData({
        shopData: res.data
      })
    })
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