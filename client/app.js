// app.js
import {
  login,
  getUserDetail
} from './api/user.js'

import store from './store/common'

App({
  onLaunch() {

    const token = wx.getStorageSync('token')
    if (!token) {
      wx.login().then(res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        this.login({
          code: res.code
        }).then(res => {
          wx.setStorageSync('token', res.data.token)
          // userStore.getUserDetail()
          getUserDetail().then(res => {

            this.globalData.userInfo = res.data
            store.data.userInfo = res.data
            store.update()
          })
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      getUserDetail().then(res => {

        this.globalData.userInfo = res.data
        store.data.userInfo = res.data
        store.update()
      })
    }

    this.init()
  },
  init() {
    // 全局分享
    this.onShareAppMessage()
    // 系统信息设置
    this.getSystemInfo()
    // 版本更新
    this.update()
  },
  getSystemInfo() {
    const _this = this

    wx.getSystemInfo().then(res => {
      console.log(res)
      const systemInfo = res
      const navHeight = res.statusBarHeight + store.data.compatibleInfo.menuButtonObject.height + (store.data.compatibleInfo.menuButtonObject.top - res.statusBarHeight) * 2
      const model = res.model
      if (res.system.includes('iOS')) {
        if (model.search('iPhone X') != -1 || model.search('iPhone 13 Pro') != -1) {
          wx.setStorageSync('model', model)
          // store.data.isIphoneX = true
          this.setMyStore(systemInfo, navHeight, true, true)
        } else {
          this.setMyStore(systemInfo, navHeight, false, true)
        }
      } else {
        this.setMyStore(systemInfo, navHeight, false, false)
      }

    }).catch(err => {
      console.log(err)
    })

  },
  setMyStore(systemInfo, navHeight, isIphoneX, isIphone) {
    if (this.getSystemInfoCallback) {
      // console.log('app getSystemInfoCallback')
      this.getSystemInfoCallback({
        systemInfo,
        navHeight,
        isIphoneX,
        isIphone
      })
    } else {
      store.data.compatibleInfo.systemInfo = systemInfo
      store.data.compatibleInfo.navHeight = navHeight
      store.data.compatibleInfo.isIphoneX = isIphoneX
      store.data.compatibleInfo.isIphone = isIphone
      store.update()
    }
    console.log(store.data.compatibleInfo)
  },
  /**
   * 设置监听器
   */
  setWatcher(page) { // 接收index.js传过来的data对象和watch对象
    let data = page.data;
    let watch = page.watch;
    Object.keys(watch).forEach(v => {
      let key = v.split('.'); // 将watch中的属性以'.'切分成数组
      let nowData = data; // 将data赋值给nowData
      for (let i = 0; i < key.length - 1; i++) { // 遍历key数组的元素，除了最后一个！
        nowData = nowData[key[i]]; // 将nowData指向它的key属性对象
      }
      let lastKey = key[key.length - 1];
      // 假设key==='my.name',此时nowData===data['my']===data.my,lastKey==='name'
      let watchFun = watch[v].handler || watch[v]; // 兼容带handler和不带handler的两种写法
      let deep = watch[v].deep; // 若未设置deep,则为undefine
      let immediate = watch[v].immediate; // 若未设置immediate,则为undefine
      this.observe(nowData, lastKey, watchFun, deep, immediate, page); // 监听nowData对象的lastKey
    })
  },

  /**
   * 监听属性 并执行监听函数
   */
  observe(obj, key, watchFun, deep, immediate, page) {
    var val = obj[key];
    // 判断deep是true 且 val不能为空 且 typeof val==='object'（数组内数值变化也需要深度监听）
    if (deep && val != null && typeof val === 'object') {
      Object.keys(val).forEach(childKey => { // 遍历val对象下的每一个key
        this.observe(val, childKey, watchFun, deep, immediate, page); // 递归调用监听函数
      })
    }

    if (immediate) {
      watchFun.call(page, val, obj); // value是新值，val是旧值
    }
    var that = this;
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        // 用page对象调用,改变函数内this指向,以便this.data访问data内的属性值
        watchFun.call(page, value, val, obj); // value是新值，val是旧值
        val = value;
        if (deep) { // 若是深度监听,重新监听该对象，以便监听其属性。
          that.observe(obj, key, watchFun, deep, immediate, page);
        }
      },
      get: function () {
        return val;
      }
    })
  },
  onShareAppMessage() {
    wx.onAppRoute((e) => {
      // console.log(e)
      // console.log('当前页面路由发生变化 触发该事件onShareAppMessage')
      const pages = getCurrentPages() //获取加载的页面
      const view = pages[pages.length - 1] //获取当前页面的对象
      if (!view) return false //如果不存在页面对象 则返回
      // 若想给个别页面做特殊处理 可以给特殊页面加isOverShare为true 就不会重写了
      const data = view.data
      if (!data.isOverShare) {
        // view.onShareAppMessage = () => { //重写分享配置
        //   return {
        //     title: '云商城',
        //     path: '/pages/index/index', //若无path 默认跳转分享页
        //     imageUrl: '/assets/images/cloudcar.png', //若无imageUrl 截图当前页面
        //     success(res) {
        //       console.log('分享成功', res)
        //     },
        //     fail(res) {
        //       console.log(res)
        //     }
        //   }
        // }
      }
    })
  },
  update() {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      // wx.showModal({
      //   title: '更新提示',
      //   content: '新版本已经准备好，是否重启应用？',
      //   success: function (res) {
      //     if (res.confirm) {
      //       // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      //       updateManager.applyUpdate()
      //     }
      //   }
      // })
      updateManager.applyUpdate()
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },

  login(data) {
    return new Promise((resolve, reject) => {
      login(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  globalData: {
    userInfo: null
  }
})