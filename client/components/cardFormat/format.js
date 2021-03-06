// components/cardFormat/format.js
import store from '../../store/common'
import create from '../../utils/create'
// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    field: {
      type: String,
      value: null,
    }, //属性的字段 例:name avatar company profession phone address email
    carddata: Object,
    cardstyle: Object,
    cid: {
      type: Number,
      value: 0,
    },
    navbarFixed: Boolean //0 1表示顶部导航栏有无固定定位
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  observers: {
    id: function (nv, ov) {
      // this.updateRate() //这里通过this.updateRate()方法来更新数据
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        navHeight: store.data.compatibleInfo.navHeight
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})