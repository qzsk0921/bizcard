// custom-tab-bar/index.js
import store from '../store/common'
import create from '../utils/create'
// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // selected: 0,
    color: "#888888",
    selectedColor: "#4980F9",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
    }
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
    },
    attached: function () {
      const query = wx.createSelectorQuery().in(this);

      setTimeout(()=>{
        // 在组件实例进入页面节点树时执行
        query.select('.tab-bar').boundingClientRect(function (rect) {
          if (rect.height) {
            store.data.compatibleInfo.tabbarH = rect.height
            store.update()
          }
        }).exec();
      },2500)
      
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})