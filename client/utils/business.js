import config from '../config/index'
/**
 * 自定义tabbar
 * @param {array} list 
 * @param {number} selected 
 */
export function setTabBar({
  selected = 0,
  list = config.tabBar.list
} = {}) {
  if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    this.getTabBar().setData({
      selected,
      list
    })
  }
}