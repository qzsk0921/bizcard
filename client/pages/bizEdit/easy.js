// pages/bizEdit/easy.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  checkMobile
} from '../../utils/util'

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
        console.log(data)
        _this.setData({
          'userInfo.phone': data,
          'phone': data,
        })
        app.globalData.userInfo['phone'] = data //服务器解密后反回
        wx.showToast({
          title: '绑定成功，请重新点击立即购买',
          icon: 'none'
        })
      }).catch(res => {
        console.log(res)
      })
    } else {
      wx.showModal({
        content: '为便于商家服务需要您进行手机号授权',
        // confirmText: '同意',
        confirmText: '确定',
        confirmColor: '#4283FB',
        showCancel: false,
        // cancelText: '拒绝',
        // cancelColor: '#999999',
        success(res) {
          if (res.confirm) {
            console.log('确定')
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
    }
  },
  // 自动填入手机号
  autoPhoneNumber() {
    this.setData({
      phone: this.data.userInfo.phone
    })
  },
  // 保存名片信息
  formSubmit(e) {
    console.log(e)
    const formdata = e.detail.value
    const res = Object.keys(formdata).some(key => !formdata[key])

    if (res) {
      wx.showToast({
        icon: 'none',
        title: '请填写完整信息',
      })
    } else {
      // 校验手机号
      if (!checkMobile(formdata.consignee_phone)) {
        wx.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
        return false
      }

      const mydata = {
        ...this.data.deliveryAddress,
        ...formdata
      }

      if (this.data.type === 'edit') {
        // 编辑
        mydata.id = this.data.id
        this.editAddress(mydata).then(res => {
          wx.showToast({
            icon: 'none',
            title: res.msg,
            duration
          })

          setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            })
          }, duration)
        })
      } else {
        // 新增
        this.addAddress(mydata).then(res => {
          wx.showToast({
            icon: 'none',
            title: res.msg,
            duration
          })

          setTimeout(() => {
            // wx.navigateTo({
            //   url: '/pages/location/index/index',
            // })
            wx.navigateBack({
              delta: 0,
            })
          }, duration)
        })
      }
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