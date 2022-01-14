// pages/bizEdit/edit.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  addCard
} from '../../api/cardEdit'
import {
  getStyleList
} from '../../api/cardEdit'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    cid: 1, //版式id

    cardData: {
      avatar: '', //头像
      video: '', //视频
      logo: ''
    },

    companypicList: [], //公司介绍图

    currentCountProfile: 0, //个人简介
    // currentCountTag: 0, //我的标签
    tagArr: [], //解析用
    currentCountIntroduction: 0, //公司简介
    currentCountCompanypic: 0, //公司介绍图

    navStatus: '', //isEmpty
    editData: null, //名片编辑数据 这里主要用到我的标签
    card: null, //名片全部数据
    userInfo: null,
    navigationBarTitleText: '编辑信息',
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone

    formData: {
      is_public: '', //是否曝光 1:曝光 0：否
      avatar: '', //头像
      name: '', //name
      hometown: '', //是否家乡
      mobile: '', //电话
      landline: '', //座机
      email: '', //邮箱
      introduce_myself: '', //个人简介
      label_str: '', //标签id 逗号分割
      vidieo_url: '', //视频地址
      company: '', //公司名
      profession_id: '', //职业id
      profession_name: '', //职位名称 否
      industry_id: '', //行业id
      industry_name: '', //行业名称 否
      address: '', //公司地址
      company_avatar: '', //公司Logo
      company_introduce: '', //公司介绍
      company_introduce_image_arr: '', //公司介绍图片
    },
  },
  // 跳转至选择名片样式页
  toStyleHandle() {
    wx.navigateTo({
      url: '/pages/bizEdit/style',
    })
  },
  // 星片曝光
  exposureHandle() {
    this.setData({
      'formData.is_public': this.data.formData.is_public ? 0 : 1
    })
  },
  // 去选择家乡
  hometownHandle() {
    wx.navigateTo({
      url: '/pages/bizEdit/treeselect?type=hometown&page=pages/bizEdit/edit',
    })
  },
  // 去选择行业
  industryHandle() {
    wx.navigateTo({
      url: '/pages/bizEdit/treeselect?type=industry&page=pages/bizEdit/edit',
    })
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
  // 选择头像
  inputAvatarHandle() {
    this.chooseImage('avatar')
  },
  // 选择视频
  inputVideoHandle() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        // console.log(res.tempFilePath)
        that.setData({
          'cardData.video': res.tempFilePath
        })
      }
    })
  },
  // 选择logo图
  inputLogoHandle() {
    this.chooseImage('logo')
  },
  // 个人简介
  textareaInputProfileHandle(e) {
    let len = e.detail.value.length

    if (len > 100) {
      len = 100
    }
    this.textareaInputHandle(len, 'currentCountProfile')
  },
  // 我的标签
  tagHandle(e) {
    const id = e.currentTarget.dataset.id

    if (!this.data.tagArr.length) {
      this.data.tagArr.push(id)
    } else {
      const res = this.data.tagArr.some((idd, index) => {
        if (idd === id) {
          this.data.tagArr.splice(index, 1)
          return true
        }
        return false
      })
      if (!res) {
        if (this.data.tagArr.length >= 9) return
        this.data.tagArr.push(id)
      }
    }

    this.setData({
      tagArr: this.data.tagArr,
      'formData.label_str': this.data.tagArr.join()
    })

    console.log(this.data.parseLabelArr)
  },
  // 公司简介
  textareaInputIntroductionHandle(e) {
    let len = e.detail.value.length

    if (len > 300) {
      len = 300
    }
    this.textareaInputHandle(len, 'currentCountIntroduction')
  },
  textareaInputHandle(num, type) {
    const data = {}

    data[type] = num

    this.setData(data)
  },
  afterRead(event) {
    console.log(event)
    const {
      file
    } = event.detail;

    // file.forEach((item, index) => {
    //   item.deletable = true
    // })

    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    const {
      companypicList = []
    } = this.data;

    // console.log(tempFilePaths)
    companypicList.push(
      ...file,
    );
    this.setData({
      companypicList
    });

    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: {
    //     user: 'test'
    //   },
    //   success(res) {
    //     console.log(file)
    //     // 上传完成需要更新 file
    //     const {
    //       companypicList = []
    //     } = this.data;
    //     companypicList.push({
    //       ...file,
    //       url: res.data
    //     });
    //     this.setData({
    //       companypicList
    //     });
    //   },
    // });
  },
  deleteCompanypicHandle(e) {
    console.log(e)

    const currentThumb = e.detail.file.thumb

    this.data.companypicList.some((item, index) => {
      if (item.thumb === currentThumb) {
        this.data.companypicList.splice(index, 1)
        return true
      }
      return false
    })

    this.setData({
      companypicList: this.data.companypicList
    });
  },
  addCard(data) {
    return new Promise((resolve, reject) => {
      addCard(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getStyleList(data) {
    return new Promise((resolve, reject) => {
      getStyleList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**.0
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      card: this.store.data.card
    })

    this.getStyleList().then(res => {
      this.setData({
        editData: res.data
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