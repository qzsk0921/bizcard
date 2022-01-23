// pages/richtext/purinstruction.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  getAgreement
} from '../../api/business'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '',
  },
  replaceSpecialChar(url) {
    url = url.replace(/&quot;/g, '"');
    url = url.replace(/&amp;/g, '&');
    url = url.replace(/&lt;/g, '<');
    url = url.replace(/&gt;/g, '>');
    url = url.replace(/&nbsp;/g, ' ');
    console.log("转义字符", url);
    return url;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      id
    } = options

    getAgreement({
      id
    }).then(res => {
      console.log(res)
      console.log(res.data.content)
      const faqHtmlData = this.replaceSpecialChar(res.data.content)
        .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
        .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
        .replace(/<p>/ig, '<p class="p_class">')

        .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img$1')
        .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img$1')
        .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img$1')
        .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img$1')
        .replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img$1 class="pho"')
        .replace(/<img/g, '<img style="max-width:100%;height:auto;display:block;margin:10px 0;"')

      this.setData({
        navigationBarTitleText: res.data.title,
        faqHtmlData
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