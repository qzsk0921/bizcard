// pages/bizEdit/easy.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  checkMobile
} from '../../utils/util'
import {
  getStyleImageList,
  addEasyCard
} from '../../api/cardEdit'
import {
  updatePhone
} from '../../api/user'
const duration = 500
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    cid: 1, //版式
    // currentStyleId: null, //样式id
    cardInfo: {
      company: '厦门阿斯达克有安居房哈公司',
      name: '林老师',
      title: '销售经理',
      mobile: '13400055366',
      address: '北京市东城区发几款方法啊的空间的是243北京市北'
    },
    styleList: [], //样式列表

    formData: {
      name: '',
      mobile: '',
      company: '',
      profession_id: '',
      profession_name: '', //职位名称
      style_image_id: ''
    },

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
        // console.log(data)
        _this.setData({
          'userInfo.phone': data,
          'formData.mobile': data,
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
  // 自动填入手机号
  autoPhoneNumber() {
    this.setData({
      'formData.mobile': this.data.userInfo.phone
    })
  },
  // 职位 导航至职位列表
  positionHandle() {
    wx.navigateTo({
      url: '/pages/bizEdit/treeselect?type=position&page=pages/bizEdit/easy',
    })
  },
  // 样式选择
  styleHandle(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      'formData.style_image_id': id
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
      if (!checkMobile(formdata.mobile)) {
        wx.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
        return false
      }

      // if (this.data.type === 'edit') {
      //   // 编辑
      //   mydata.id = this.data.id
      //   this.editAddress(mydata).then(res => {
      //     wx.showToast({
      //       icon: 'none',
      //       title: res.msg,
      //       duration
      //     })

      //     setTimeout(() => {
      //       wx.navigateBack({
      //         delta: 0,
      //       })
      //     }, duration)
      //   })
      // } else {
      // 新增
      this.addEasyCard(formdata).then(res => {
        wx.showToast({
          icon: 'none',
          title: res.msg,
          duration
        })

        setTimeout(() => {
          // 返回我的名片页面 返回Ta的名片页面
          // wx.navigateBack({
          //   delta: 0,
          // })
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, duration)
      })
      // }
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
  addEasyCard(data) {
    return new Promise((resolve, reject) => {
      addEasyCard(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStyleImageList({
      style_id: 4
    }).then(res => {
      this.setData({
        styleList: res.data,
        // currentStyleId: res.data[0].id
        'formData.style_image_id': res.data[0].id
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