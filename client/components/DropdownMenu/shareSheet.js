// components/DropdownMenu/shareSheet.js
import store from '../../store/common'
import create from '../../utils/create'

// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    opened: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    options: [{
        name: '微信好友',
        icon: '../../assets/images/card_share_popup_wechat.png',
        mode: 'share'
      },
      {
        name: '名片码',
        icon: '../../assets/images/card_share_popup_scan.png',
        mode: 'poster'
      }
    ]
  },
  observers: {
    'opened': function (val) {
      // console.log(val)
      if (val === 1) {
        const query = wx.createSelectorQuery().in(this)
        query.select('.dropdown-item-down__content').boundingClientRect(rect => {
          console.log(rect)

          // 如果是switchTab页面，加tabbar高度
          const tabbarRoutes = this.getTabBar().data.list
          const currentRoute = getCurrentPages()[getCurrentPages().length - 1].route
          const res = tabbarRoutes.some(item =>
            item.pagePath === currentRoute || item.pagePath === '/' + currentRoute
          )

          let height = rect.height
          if (res) {
            height += store.data.compatibleInfo.tabbarH
          }

          this.setData({
            height
          })
        }).exec()
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cancelHandle() {
      this.setData({
        opened: 0,
      })
    },
    optionTapHandle(e) {
      const mode = e.target.dataset.mode
      console.log(e)
      if (mode === 'share') {
        // 分享给好友
        // console.log('分享给好友')
        this.setData({
          opened: 0,
        })
      } else if (mode === 'poster') {
        // 生成海报
        console.log('生成海报')
        this.setData({
          opened: 0,
        })
        this.triggerEvent('awakenposterdialog')
      }
    }
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})