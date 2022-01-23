// pages/bizEdit/edit.js
import store from '../../store/common'
import create from '../../utils/create'
import config from '../../config/index'

import {
  addCard,
  getStyleInfo
} from '../../api/cardEdit'
import {
  getCardDetail
} from '../../api/card'
import {
  getQnToken
} from '../../api/oss'
import qiniuTools from '../../utils/oss'
import {
  checkMobile
} from '../../utils/util'

const duration = 1000

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    cid: 1, //版式id

    currentCountProfile: 0, //个人简介
    currentCountIntroduction: 0, //公司简介
    tagArr: [], //解析用

    navStatus: '', //isEmpty
    editData: null, //名片编辑数据 这里主要用到我的标签
    card: null, //名片全部数据
    userInfo: null,
    navigationBarTitleText: '编辑信息',
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone

    formData: {
      "sq_business_card_id": '', //名片id 必须
      "is_public": '', //是否曝光 1:曝光 0：否
      "avatar": '', //头像 必须
      "name": '', //name 必须
      "hometown": '', //是否家乡
      "mobile": '', //电话 必须
      "landline": '', //座机
      "email": '', //邮箱
      "introduce_myself": '', //个人简介
      "label_str": '', //标签id 逗号分割
      "vidieo_url": '', //视频地址
      "company": '', //公司名 必须
      "profession_id": '', //职业id 必须
      "profession_name": '', //职位名称 否
      "industry_id": '', //行业id
      "industry_name": '', //行业名称 否
      "address": '', //公司地址
      "address_longitude": '', //公司地址经度
      "address_latitude": '', //公司地址纬度
      "company_avatar": '', //公司Logo
      "company_introduce": '', //公司介绍
      "company_introduce_image_arr": [], //公司介绍图片
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
  // 去选择职位
  positionHandle() {
    wx.navigateTo({
      url: '/pages/bizEdit/treeselect?type=position&page=pages/bizEdit/edit',
    })
  },
  // 去选择行业
  industryHandle() {
    wx.navigateTo({
      url: '/pages/bizEdit/treeselect?type=industry&page=pages/bizEdit/edit',
    })
  },
  // 公司地址选择
  addressHandle() {
    const that = this

    wx.chooseLocation({
      success: function (res) {
        // console.log('chooseLocation success')
        console.log(res)
        that.setData({
          // 'formData.address': res.name,
          'formData.address': res.address,
          'formData.address_latitude': res.latitude,
          'formData.address_longitude': res.longitude
        })
      },
      fail: function (res) {
        // 接口调用失败的回调函数
        console.log('chooseLocation fail')
        console.log(res)
      },
      complete: function (res) {
        // 接口调用结束的回调函数（调用成功、失败都会执行）
        console.log('chooseLocation complete')
        console.log(res)
      }
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
          'formData.vidieo_url': res.tempFilePath
        })
      }
    })
  },
  // 选择logo图
  inputLogoHandle() {
    this.chooseImage('company_avatar')
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
      company_introduce_image_arr = []
    } = this.data.formData;

    // console.log(tempFilePaths)
    company_introduce_image_arr.push(
      ...file,
    );
    this.setData({
      'formData.company_introduce_image_arr': company_introduce_image_arr
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

    this.data.formData.company_introduce_image_arr.some((item, index) => {
      if (item.thumb == currentThumb) {
        this.data.formData.company_introduce_image_arr.splice(index, 1)
        return true
      }
      return false
    })

    this.setData({
      'formData.company_introduce_image_arr': this.data.formData.company_introduce_image_arr
    });
  },
  // 保存名片信息
  async formSubmit(e) {
    // console.log(e)
    // console.log(this.data.formData)
    const formData = e.detail.value

    Object.keys(formData).forEach(key => {
      this.data.formData[key] = formData[key]
    })
    // 校验
    if (!this.formValidate(this.data.formData)) return



    let http_avatar = null,
      http_vidieo_url = null,
      http_company_avatar = null,
      http_company_introduce_image_arr = null

    const tempUpdate = {
      'formData.avatar': this.data.formData.avatar,
      'formData.vidieo_url': this.data.formData.vidieo_url,
      'formData.company_avatar': this.data.formData.company_avatar,
      'formData.company_introduce_image_arr': this.data.formData.company_introduce_image_arr
    }

    // 头像
    //https协议的资源 不重复上传（未修改）
    if (this.data.formData.avatar) {
      if (!/^https/.test(this.data.formData.avatar)) {
        http_avatar = await this.updateQiniu(this.data.formData.avatar)
        if (http_avatar) {
          tempUpdate['formData.avatar'] = http_avatar
        } else {
          console.log('http_avatar上传失败')
          return
        }
      }
    }


    // 视频
    if (this.data.formData.vidieo_url) {
      //https协议的资源 不重复上传（未修改）
      if (!/^https/.test(this.data.formData.vidieo_url)) {
        http_vidieo_url = await this.updateQiniu(this.data.formData.vidieo_url)
        if (http_vidieo_url) {
          tempUpdate['formData.vidieo_url'] = http_vidieo_url
        }
      }
    }

    // 公司logo
    if (this.data.formData.company_avatar) {
      if (!/^https/.test(this.data.formData.company_avatar)) {
        http_company_avatar = await this.updateQiniu(this.data.formData.company_avatar)
        if (http_company_avatar) {
          tempUpdate['formData.company_avatar'] = http_company_avatar
        }
      }
    }
    // 公司介绍图
    if (this.data.formData.company_introduce_image_arr.length) {
      // http_company_introduce_image_arr = this.data.formData.company_introduce_image_arr
      // 取出修改的公司介绍图数组
      let tempArr = [],
        httpTempArr = []
      this.data.formData.company_introduce_image_arr.forEach((item, index) => {
        if (!/^https/.test(item.url)) {
          this.data.formData.company_introduce_image_arr.splice(index, 1)
          tempArr.push(item)
        } else {
          httpTempArr.push(item)
        }
      })

      if (tempArr.length) {
        // 有更换则上传
        let temp_http_company_introduce_image_arr = await this.updateQiniu(tempArr)
        // http_company_introduce_image_arr = this.data.formData.company_introduce_image_arr.concat(temp_http_company_introduce_image_arr).concat(httpTempArr.map(it => it.url))
        http_company_introduce_image_arr = httpTempArr.concat(temp_http_company_introduce_image_arr.map(url => {
          return {
            url,
            type: 'image',
            thumb: url
          }
        }))

        tempUpdate['formData.company_introduce_image_arr'] = http_company_introduce_image_arr
      } else {
        tempUpdate['formData.company_introduce_image_arr'] = this.data.formData.company_introduce_image_arr
      }
    }

    this.setData(tempUpdate)

    console.log(this.data.formData)
    // 返回我的名片页面
    this.addCard(this.data.formData).then(res => {
      wx.showToast({
        icon: 'none',
        title: '保存成功',
        duration
      })

      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }, duration)
    })
  },
  formValidate(formData) {
    const flag = Object.keys(formData).some(key => {
      if (!formData[key]) {
        // if (key == 'avatar') {
        //   wx.showToast({
        //     icon: 'none',
        //     title: '请上传头像',
        //   })
        //   return true
        // } else 
        if (key === 'name') {
          wx.showToast({
            icon: 'none',
            title: '请输入姓名',
          })
          return true
        } else if (key === 'mobile') {
          wx.showToast({
            icon: 'none',
            title: '请输入电话',
          })
          return true
        } else if (key === 'company') {
          wx.showToast({
            icon: 'none',
            title: '请输入公司名称',
          })
          return true
        } else if (key === 'profession_id') {
          wx.showToast({
            icon: 'none',
            title: '请选择职位',
          })
          return true
        }
        return false
      }
      return false
    })

    // 全部填写再校验手机号码
    if (!flag) {
      if (!checkMobile(formData.mobile)) {
        wx.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
        return false
      } else {
        return true
      }
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
  addCard(data) {
    return new Promise((resolve, reject) => {
      addCard(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getStyleInfo(data) {
    return new Promise((resolve, reject) => {
      getStyleInfo(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getCardDetail(data) {
    return new Promise((resolve, reject) => {
      getCardDetail(data).then(res => {
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
    this.getStyleInfo({
      sq_business_card_id: this.store.data.card.data.id
    }).then(ress => {
      this.setData({
        editData: ress.data,
      })

      this.getCardDetail({
        type: 1
      }).then(res => {
        const data = res.data
        this.store.data.card.data = data.card_info
        this.store.data.card.style = data.card_style
        this.update()

        const tempTags = ress.data.select_tag_list.filter(item => item.select_status)
        let myTagarr = []
        if (tempTags.length) {
          myTagarr = tempTags.map(it => it.id)
        }

        this.setData({
          card: this.store.data.card,
          //回显
          tagArr: myTagarr, //标签高亮
          currentCountProfile: res.data.card_info.introduce_myself.length,
          currentCountIntroduction: res.data.card_info.company_introduce.length,
          "formData.sq_business_card_id": res.data.card_info.id,
          'formData.is_public': res.data.card_info.is_public,
          'formData.avatar': res.data.card_info.avatar,
          'formData.name': res.data.card_info.name,
          'formData.hometown': res.data.card_info.hometown,
          'formData.mobile': res.data.card_info.mobile,
          'formData.landline': res.data.card_info.landline,
          'formData.email': res.data.card_info.email,
          'formData.introduce_myself': res.data.card_info.introduce_myself,
          'formData.label_str': myTagarr.length ? myTagarr.join() : '',
          'formData.vidieo_url': res.data.card_info.vidieo_url,
          'formData.company': res.data.card_info.company,
          'formData.profession_id': res.data.card_info.profession_id,
          'formData.profession_name': res.data.card_info.profession,
          'formData.profession': res.data.card_info.profession,
          'formData.industry_id': res.data.card_info.industry_id,
          'formData.industry_name': res.data.card_info.industry,
          'formData.address': res.data.card_info.address,
          'formData.address_longitude': res.data.card_info.address_longitude,
          'formData.address_latitude': res.data.card_info.address_latitude,
          'formData.company_avatar': res.data.card_info.company_avatar,
          'formData.company_introduce': res.data.card_info.company_introduce,
          'formData.company_introduce_image_arr': res.data.card_info.company_introduce_image_arr
        })
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