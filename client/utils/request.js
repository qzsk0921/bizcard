import config from '../config/index.js'
import {
  login
} from '../api/user.js'
let errCount = 0

class Request {
  constructor(params) {
    this.withBaseURL = params.withBaseURL
    this.baseURL = params.baseURL
    this.contentType = params.contentType
  }

  loginWhenLoseSession(resolve, method, url, data) {
    let that = this
    let app = getApp()
    wx.login().then(res => {
      if (res.errMsg == 'login:ok') {
        console.log('code====' + res.code)
        app.globalData.code = res.code
        that.loginBusinessSystem(resolve, method, url, data)
      }
    })
  }

  loginBusinessSystem(resolve, method, url, data) {
    const that = this,
      app = getApp(),
      code = app.globalData.code;

    const pms = {
      code
    }
    login(pms).then(res => {
      wx.setStorage({
        key: 'token',
        data: res.data.token
      }).then(res => {
        that.request({
          method,
          url,
          data
        }).then(res => {
          res => {
            resolve(res.data)
          }
        })
      })
    })
  }

  request(params) {
    const {
      method,
      url,
      data,
      load
    } = params

    let instanceLoad = null

    if (load !== 'noload') {
      instanceLoad = wx.showLoading({
        title: load ? load : '加载中...',
      })
    }

    const that = this
    const token = wx.getStorageSync('token') ? wx.getStorageSync('token') : wx.getStorageSync('customToken')

    return new Promise((resolve, reject) => {
      return wx.request({
        url: that.withBaseURL ? that.baseURL + url : url,
        data: data ? data : {},
        method,
        header: {
          token,
          'content-type': that.contentType ? that.contentType : 'application/x-www-form-urlencoded'
        },
        success(res) {
          if (instanceLoad) {
            wx.hideLoading()
          }
          // console.log(res)
          if (res.data.code !== 1) {
            // 错误次数大于5次不再请求
            if (++errCount>10) {
              wx.showToast({
                title: '请求出错，请重试',
                icon: 'none'
              })
              return
            }

            if (res.data.code === 101 || res.data.code === 102) {
              // 101	未登录授权(无效,过期)
              if (token) wx.removeStorageSync('token')
              that.loginWhenLoseSession(resolve, method, url, data)
            } else {
              wx.showToast({
                title: res.data.msg ? res.data.msg : url,
                icon: 'none'
              })
              reject({
                code: res.data.code,
                msg: res.data.msg,
                url: that.withBaseURL ? that.baseURL + url : url,
                method,
                data
              })
            }
          } else {
            resolve(res.data)
          }
        },
        fail(err) {
          console.log(new Error(err))
          wx.showToast({
            title: '网络出错，请检查网络连接是否正常',
            icon: 'none'
          })
          reject({
            msg: err.errMsg,
            url: that.withBaseURL ? that.baseURL + url : url,
            method,
            data
          })
        }
      })
    })
  }
}

const request = new Request({
  withBaseURL: true,
  baseURL: config.baseUrl,
  contentType: config.contentType
})

module.exports = request.request.bind(request)