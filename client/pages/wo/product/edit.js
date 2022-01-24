// pages/wo/product/edit.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  addGood,
  getGoodDetail,
  editGood,
  delGood
} from '../../../api/shopping'
import {
  getQnToken
} from '../../../api/oss'
import qiniuTools from '../../../utils/oss'

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    // navStatus: '',
    navigationBarTitleText: '',
    userInfo: null,
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone

    currentCountTitle: 0, //产品标题
    currentCountDes: 0, //产品描述
    type: null, //add edit
    formData: {
      title: '',
      content: '',
      image_url: '',
      price: '',
    }
  },
  // 产品标题
  inputTitleHandle(e) {
    let len = e.detail.value.length

    if (len > 20) {
      len = 20
    }
    this.inputHandle(len, 'currentCountTitle')
  },
  // 产品描述
  textareaInputContentHandle(e) {
    console.log(e)
    let len = e.detail.value.length

    if (len > 200) {
      len = 200
    }
    this.inputHandle(len, 'currentCountDes')
  },
  inputHandle(num, type) {
    const data = {}

    data[type] = num

    this.setData(data)
  },
  inputProHandle() {
    this.chooseImage('image_url')
  },
  chooseImage(field) {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        that.setData({
          [`formData.${field}`]: tempFilePaths[0]
        })
      }
    })
  },
  async formSubmit(e) {
    console.log(e)
    const formData = e.detail.value

    Object.keys(formData).forEach(key => {
      this.data.formData[key] = formData[key]
    })
    // 校验
    if (!this.formValidate(this.data.formData)) return

    let http_image_url = null

    const tempUpdate = {
      'formData.image_url': this.data.formData.image_url,
    }
    // 产品图
    if (this.data.formData.image_url) {
      if (!/^https/.test(this.data.formData.image_url)) {
        http_image_url = await this.updateQiniu(this.data.formData.image_url)
        if (http_image_url) {
          tempUpdate['formData.image_url'] = http_image_url
        }
      }
    }

    this.setData(tempUpdate)
    // console.log(this.data.formData)
    if (this.data.type === 'edit') {
      editGood(this.data.formData).then(res => {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      })
    } else {
      addGood(this.data.formData).then(res => {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      })
    }

  },
  // 删除产品
  delProHandle() {
    const that = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          delGood({
            id: that.data.formData.id
          }).then(res => [
            wx.reLaunch({
              url: '/pages/index/index',
            })
          ])
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  formValidate(formData) {
    const flag = Object.keys(formData).some(key => {
      if (!formData[key]) {
        if (key === 'title') {
          wx.showToast({
            icon: 'none',
            title: '请输入标题',
          })
          return true
        } else if (key === 'content') {
          wx.showToast({
            icon: 'none',
            title: '请输入描述',
          })
          return true
        } else if (key === 'image_url') {
          wx.showToast({
            icon: 'none',
            title: '请上传产品图',
          })
          return true
        } else if (key === 'price') {
          wx.showToast({
            icon: 'none',
            title: '请输入价格',
          })
          return true
        }
        return false
      }
      return false
    })

    if (!flag) {
      return true
    } else {
      return false
    }
  },
  // 上传资源
  updateQiniu(filePath) {
    console.log(filePath)
    return new Promise((resolve, reject) => {
      if (this.data.qnToken) {
        qiniuTools.uploadQiniu(filePath, this.data.qnToken, resolve, reject)
      } else {
        // return new Promise((resolve, reject) => {
        getQnToken().then(res => {
          const upToken = this.data.qnToken = res.data.upToken
          // 介绍图
          qiniuTools.uploadQiniu(filePath, upToken, resolve, reject)
        })
        // })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      type,
      id
    } = options

    const temp = {
      type,
    }

    if (type == 'edit' && id) {
      getGoodDetail({
        id
      }).then(res => {
        // console.log(res)
        temp.currentCountTitle = res.data.title.length
        temp.currentCountDes = res.data.content.length
        temp['formData.title'] = res.data.title
        temp['formData.content'] = res.data.content
        temp['formData.image_url'] = res.data.image_url
        temp['formData.price'] = res.data.price
        temp['formData.id'] = id
        this.setData(temp)
      })
    } else {
      this.setData(temp)
    }
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