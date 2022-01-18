// pages/bizholder/bizholder.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  setTabBar
} from '../../utils/business'
import {
  getCardList,
  getCardMsgNum,
  delCardList
} from '../../api/cardHolder'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    isOverShare: true,
    navStatus: 'bizholder',
    navigationBarTitleText: '星片夹',
    userInfo: null,
    systemInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone

    listData: {
      cache: [
        //   {
        //   "id": 1,
        //   "user_id": 1,
        //   "sq_business_card_id": 2,
        //   "avatar": "/assets/images/card_share_popup_wechat.png",
        //   "name": "任剑飞",
        //   "profession": "",
        //   "company": "未来健康",
        //   "status": 1,
        //   "update_time": 1641960017,
        //   "create_time": 0,
        //   intention_num: 70
        // },
        // {
        //   "id": 2,
        //   "user_id": 1,
        //   "sq_business_card_id": 2,
        //   "avatar": "/assets/images/card_share_popup_wechat.png",
        //   "name": "任剑飞",
        //   "profession": "",
        //   "company": "未来健康",
        //   "status": 1,
        //   "update_time": 1641960017,
        //   "create_time": 0,
        //   intention_num: 10
        // }
      ],
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 10,

    remind: 1, //有新的朋友发来名片 0没有 1有
    searchKeyword: '', //搜索关键字
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
    },
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
    const that = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // 删除选中名片
          that.delCardList({
            ids: that.data.selectArr
          }).then(res => {
            // 若列表数据删空，显示空数据时的样式，样式还原回未编辑状态
            that.setData({
              status: 'edit',
              'listData.count': 1
            })
            that.getCardList()
          })
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
  // 搜索-按钮
  btnSearchHandle() {
    // console.log('搜索')
    console.log(this.data.searchKeyword)
    this.setData({
      'listData.count': 1,
      status: 'edit'
    })
    this.getCardList()
  },
  // 搜索-回车
  bindconfirmHandle(e) {
    console.log(e.detail.value)
    this.setData({
      'listData.count': 1,
      status: 'edit'
    })
    this.getCardList()
  },
  scrollToLower() {
    console.log(e)
    console.log('scrollToLower')

    let listData = this.data.listData

    if (listData.count + 1 > listData.total_page) return

    this.setData({
      'listData.count': ++listData.count
    })

    this.getCardList('scrollToLower')
  },

  getCardList(dataObj) {
    const tempData = {
      page: this.data.listData.count,
      page_size: this.data.page_size,
      keyword: this.data.searchKeyword
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getCardList(tempData).then(res => {
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
            'listData.total_page': res.data.last_page,
            'listData.total': res.data.total
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  getCardMsgNum() {
    return new Promise((resolve, reject) => {
      getCardMsgNum().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  delCardList(data) {
    return new Promise((resolve, reject) => {
      delCardList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 隐藏消息提醒
  navHandle() {
    this.setData({
      remind: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().setWatcher(this) //设置监听器
    this.getCardList()
    this.getCardMsgNum().then(res => {
      if (res.data.total_number) {
        this.setData({
          remind: 1
        })
      }
    })
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
  onShareAppMessage: function (res) {
    // console.log(res)
    if (res.from === 'button') {
      // const imageUrl = await drawCanvas(this, this.data.cid, this.data.allData)
      // 来自页面内转发按钮
      return {
        title: ' ',
        path: `pages/index/index?type=2&b=${this.store.data.card.data.id}&s=${this.store.data.userInfo.id}`,
        imageUrl: '/assets/images/share_send.png',
        success(res) {
          console.log('分享成功', res)
        },
        fail(res) {
          console.log(res)
        }
      }
    }
  }
})