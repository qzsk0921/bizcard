// pages/bizholder/bizholder.js
import {
  setTabBar
} from '../../utils/business'
import store from '../../store/common'
import create from '../../utils/create'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    navStatus: 'bizholder',
    navigationBarTitleText: '星片夹',
    userInfo: null,
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
    tabbarH: null,

    listData: {
      cache: [{
        id: 1,
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        nickname: '昵称',
        company: '厦门星辰追梦科技有限公司',
        position: '产品经理',
        date: '2021/05/14',
        precent: '80%'
      }, {
        id: 2,
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        nickname: '昵称',
        company: '厦门星辰追梦科技有限公司打到几点第九大队京东到家的角度讲',
        position: '产品经理',
        date: '2021/05/14',
        precent: '60%'
      }, {
        id: 3,
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        nickname: '昵称',
        company: '厦门星辰追梦科技有限公司',
        position: '产品经理',
        date: '2021/05/14',
        precent: '60%'
      }, {
        id: 4,
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.IJZRiLGakfZpsHnhxtXqqwHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7',
        nickname: '昵称',
        company: '厦门星辰追梦科技有限公司',
        position: '产品经理',
        date: '2021/05/14',
        precent: '60%'
      }],
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 10,

    remind: 1, //有新的朋友发来名片 0没有 1有
    searchKeyword: '',
    selectArr: [], //选中的id数组
    isSelectAll: 0, //默认非全选 0未全选 1全选
    status: 'edit' //edit 待编辑,editing 编辑中
  },
  watch: {
    selectArr: {
      handler(nv, ov, obj) {
        // console.log(nv)
        let isSelectAll = 0
        if (nv.length === this.data.listData.cache.length)
          isSelectAll = 1
        else isSelectAll = 0

        this.setData({
          isSelectAll
        })
      },
    }
  },
  // 完成按钮
  completeHandle() {
    this.setData({
      status: 'edit'
    })
  },
  // 编辑按钮
  editHandle() {
    this.setData({
      status: 'editing'
    })
  },
  // 底部删除按钮
  delHandle() {
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  selectHandle(e) {
    const id = e.currentTarget.dataset.id

    let res = false
    if (this.data.selectArr.length) {
      res = this.data.selectArr.some((idd, index) => {
        if (idd == id) {
          // 是选中状态
          this.data.selectArr.splice(index, 1)
          return true
        }
        return false
      })
    }

    // 是未选中状态
    if (!res) this.data.selectArr.push(id)

    this.setData({
      selectArr: this.data.selectArr
    })
  },
  selectAllHandle() {
    let selectArr = []

    if (this.data.isSelectAll) {
      // 全不选
    } else {
      // 全选
      selectArr = this.data.listData.cache.map(item => item.id)
    }

    this.setData({
      selectArr
    })
  },
  searchInputHandle(e) {
    // console.log(e)
    this.setData({
      searchKeyword: e.detail.value
    })
  },
  // 搜索
  btnSearchHandle() {
    // console.log('搜索')
    console.log(this.data.searchKeyword)
    this.setData({
      status: 'edit'
    })
  },
  bindconfirmHandle(e) {
    console.log(e.detail.value)
    this.setData({
      status: 'edit'
    })
  },
  scrollToLower() {
    console.log(e)
    console.log('scrollToLower')

    let listData = this.data.listData

    if (listData.count + 1 > listData.total_page) return

    this.setData({
      'listData.count': ++listData.count
    })

    // this.getGoodsList('scrollToLower').then(res => {
    //   listData.cache.push(...res.data.data)
    //   this.setData({
    //     [`listData.cache`]: listData.cache
    //   })
    // })
  },

  getGoodsList(dataObj) {
    const tempData = {
      page: this.data.listData.count,
      page_size: this.data.page_size,
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getGoodsList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.listData.cache.push(...res.data.data)
          this.setData({
            'listData.cache': this.data.listData.cache,
            'listData.total_page': res.data.last_page
          })
          resolve(res)
          console.log(this.data.listData)
        } else {
          this.setData({
            'listData.cache': res.data.data,
            'listData.total_page': res.data.last_page
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().setWatcher(this) //设置监听器
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.store.data.has_card) {
      setTabBar.call(this, {
        selected: 2
      })
    } else {
      let list = [{
          "pagePath": "/pages/index/index",
          "text": "我的星片",
          "iconPath": "/assets/images/btn_my_card_f.png",
          "selectedIconPath": "/assets/images/btn_my_card_n.png"
        },
        {
          "pagePath": "/pages/bizholder/bizholder",
          "text": "星片夹",
          "iconPath": "/assets/images/btn_card_holder_f.png",
          "selectedIconPath": "/assets/images/btn_card_holder_n.png"
        }
      ]
      setTabBar.call(this, {
        list,
        selected: 1
      })
    }


    const that = this;
    const query = wx.createSelectorQuery();
    query.select('.section3').boundingClientRect(function (rect) {
      that.setData({
        section3T: rect.top,
      })
    }).exec();
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