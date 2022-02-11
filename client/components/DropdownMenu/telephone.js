// components/DropdownMenu/telephone.js
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
    },
    telephoneObj: Object
  },
  observers: {
    'opened': function (val) {
      // console.log(val)
      if (val === 1) {
        const query = wx.createSelectorQuery().in(this)
        query.select('.dropdown-item-down__content').boundingClientRect(rect => {
          console.log(rect)
          let height = rect.height

          // 如果是switchTab页面，加tabbar高度
          if (this.getTabBar().data.list) {
            const tabbarRoutes = this.getTabBar().data.list
            const currentRoute = getCurrentPages()[getCurrentPages().length - 1].route
            const res = tabbarRoutes.some(item => item.pagePath === currentRoute || item.pagePath === '/' + currentRoute)

            if (res) {
              height += store.data.compatibleInfo.tabbarH
            }
          }

          this.setData({
            height
          })
        }).exec()
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dropdownItemTapHandle(e) {
      console.log(this.data.telephoneObj)
      const type = e.target.dataset.type
      if (type === 'copy') {
        // 复制
        this.copyToClipboard(this.data.telephoneObj.content, '已为您存至粘贴板')
      } else if (type === 'call') {
        // 拨打
        wx.makePhoneCall({
          phoneNumber: this.data.telephoneObj.content,
        })
      } else if (type === 'create') {
        const that = this
        // 用户可以选择将该表单以「新增联系人」或「添加到已有联系人」的方式，写入手机系统通讯录。
        // 访问蓝牙、 添加通讯录联系人、 添加日历事件需要用户授权
        // 为优化用户体验， 平台将于2022年2月21日24时之后对访问蓝牙、 添加通讯录联系人、 添加日历事件增加用户授权。 如有使用该技术服务， 请开发者及时对小程序进行调整， 避免影响服务流程。 查看详情: https: //developers.weixin.qq.com/community/develop/doc/000e881c7046a8fa1f4d464105b001

        // 创建通讯录新联系人
        if (!store.data.settingInfo.authSetting['addPhoneContact']) {
          wx.authorize({
            scope: 'scope.addPhoneContact',
            success() {
              store.data.settingInfo.authSetting['addPhoneContact'] = true
              store.update()

              wx.addPhoneContact({
                firstName: that.data.telephoneObj.name,
                mobilePhoneNumber: that.data.telephoneObj.content
              })
            }
          })
        } else {
          wx.addPhoneContact({
            firstName: that.data.telephoneObj.name,
            mobilePhoneNumber: that.data.telephoneObj.content
          })
        }
      } else if (type === 'add') {
        // 添加到通讯录现有联系人
        wx.addPhoneContact({
          firstName: this.data.telephoneObj.name,
          mobilePhoneNumber: this.data.telephoneObj.content
        })
      } else if (type === 'cancel') {
        // 取消
        this.setData({
          opened: 0
        })
      }
    },
    // 复制到剪贴板
    copyToClipboard(data, title) {
      title ? title : '复制到剪贴板'
      wx.setClipboardData({
        data,
        success: (res) => {
          wx.showToast({
            title,
            icon: 'none'
          })
        },
      })
    },
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
  },
})