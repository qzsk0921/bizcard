// components/Dialog/juide.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Boolean,
      value: false
    },
    navHeight: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    dialogTapHandle() {
      console.log(8888)
      this.setData({
        dialogVisible: false
      })
    }
  }
})