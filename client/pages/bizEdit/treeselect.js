// pages/bizEdit/treeselect.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  getProfessionList,
  getAddressList,
  getIndustryList
} from '../../api/cardEdit'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    mainActiveIndex: 0,
    activeId: null,
  },
  watch: {
    mainActiveIndex: {
      handler(nv, ov, obj) {
        // children: [
        //   {
        //     text: '杭州',
        //     id: 2,
        //   },
        // ],
        if (this.data.options.type === 'position') {
          this.getProfessionList({
            pid: this.data.items[nv].id
          }).then(res => {
            res.data.data.forEach(it => {
              it.text = it.name
            })
            this.setData({
              [`items[${nv}].children`]: res.data.data
            })
          })
        } else if (this.data.options.type === 'hometown') {
          this.data.currentProvince = this.data.items[nv].province_name
          this.getAddressList({
            type: 2,
            provinceid: this.data.items[nv].provinceid
          }).then(res => {
            res.data.forEach(it => {
              it.text = it.city_name
            })
            this.setData({
              [`items[${nv}].children`]: res.data
            })
          })
        } else if (this.data.options.type === "industry") {
          this.getIndustryList({
            pid: this.data.items[nv].id
          }).then(res => {
            res.data.data.forEach(it => {
              it.text = it.name
            })
            this.setData({
              [`items[${nv}].children`]: res.data.data
            })
          })
        }
      },
    }
  },
  // 被点击的导航的索引
  onClickNav({
    detail = {}
  }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    })
  },
  // 该点击项的数据
  onClickItem({
    detail = {}
  }) {
    // console.log(detail)
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({
      activeId
    });

    this.updatePrevpageData(detail)
  },
  // 更新上一个页面数据
  updatePrevpageData(data) {
    // 在提交成功后，返回上一页（带上参数）
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

    if (this.data.options.type === 'position') {
      // 职位 
      if (this.data.options.page) {
        if (this.data.options.page === 'pages/bizEdit/easy' || this.data.options.page === 'pages/bizEdit/edit') {
          // from名片极简和普通编辑页
          prevPage.setData({
            'formData.profession_id': data.id,
            'formData.profession_name': data.text
          })
        }
      }
    } else if (this.data.options.type === 'hometown') {
      // 家乡 
      if (this.data.options.page) {
        if (this.data.options.page === 'pages/bizEdit/edit') {
          // from名片编辑页
          prevPage.setData({
            'formData.hometown': this.data.currentProvince + data.city_name,
          })
        }
      }
    } else if (this.data.options.type === 'industry') {
      // 行业 
      if (this.data.options.page) {
        if (this.data.options.page === 'pages/bizEdit/edit') {
          // from名片编辑页
          prevPage.setData({
            'formData.industry_id': data.id,
            'formData.industry_name': data.text
          })
        }
      }
    }
  },
  // 修改职位数据
  parsePositionData(data) {
    data.forEach(item => {
      item.text = item.name
    })

    this.setData({
      items: data,
      mainActiveIndex: 0
    })
  },
  // 修改地址数据
  parseAddressData(data) {
    let mainActiveIndex = 0
    data.forEach((item, index) => {
      item.text = item.province_name
      // 获取省项的索引
      if (this.store.data.currentAddress.hometown.indexOf(item.province_name) != -1) {
        mainActiveIndex = index
      }
    })

    this.setData({
      items: data,
      mainActiveIndex
    })
  },
  // 修改行业数据
  parseIndustryData(data) {
    data.forEach(item => {
      item.text = item.name
    })

    this.setData({
      items: data,
      mainActiveIndex: 0
    })
  },
  getProfessionList(data) {
    return new Promise((resolve, reject) => {
      getProfessionList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getAddressList(data) {
    return new Promise((resolve, reject) => {
      getAddressList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getIndustryList(data) {
    return new Promise((resolve, reject) => {
      getIndustryList(data).then(res => {
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
    getApp().setWatcher(this) //设置监听器
    if (options) {
      this.data.options = options
    }

    if (options.type) {
      if (options.type === 'position') {
        // 职位
        this.getProfessionList().then(res => {
          this.parsePositionData(res.data.data)
        })
      } else if (options.type === 'hometown') {
        //家乡 默认显示微信授权的位置信息
        if (this.store.data.currentAddress.hometown) {
          this.setData({
            hometown: this.store.data.currentAddress.hometown
          })
        } else {
          getApp().getLocationCallback = (hometown) => {
            this.setData({
              hometown
            })
          }
        }

        this.getAddressList({
          type: 1
        }).then(res => {
          this.parseAddressData(res.data)
        })
      } else if (options.type === 'industry') {
        // 行业
        this.getIndustryList().then(res => {
          this.parseIndustryData(res.data.data)
        })
      }
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