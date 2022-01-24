import request from '../utils/request'

/**
 * 商品列表 small/Shop/goods_list
 * @param {int} user_id require 名片的用户id
 */
export function getGoodList(data) {
  return request({
    url: '/small/Shop/goods_list',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 添加商品 small/Shop/add_goods
 * @param {string} title require 产品标题
 * @param {string} content require 产品内容
 * @param {float} price require 价格
 * @param {string} image_url require 图片地址
 */
export function addGood(data) {
  return request({
    url: '/small/Shop/add_goods',
    method: 'post',
    data,
  })
}

/**
 * 商品详情 small/Shop/goods_info
 * @param {int} id require 商品id
 */
export function getGoodDetail(data) {
  return request({
    url: '/small/Shop/goods_info',
    method: 'get',
    data,
  })
}

/**
 * 商品编辑 small/Shop/edit_goods
 * @param {int} id require 商品id
 * @param {string} title require 产品标题
 * @param {string} content require 产品内容
 * @param {float} price require 价格
 * @param {string} image_url require 图片地址
 */
export function editGood(data) {
  return request({
    url: '/small/Shop/edit_goods',
    method: 'post',
    data,
  })
}

/**
 * 商品删除 small/Shop/del_goods
 * @param {int} id require 商品id
 */
export function delGood(data) {
  return request({
    url: '/small/Shop/del_goods',
    method: 'get',
    data,
  })
}

/**
 * 商店申请 small/Shop/apply_shop
 * @param {string} phone require 手机
 * @param {string} name require 姓名
 */
export function applyShop(data) {
  return request({
    url: '/small/Shop/apply_shop',
    method: 'post',
    data,
  })
}

/**
 * 申请详情 small/Shop/apply_info
 */
export function getApplyShopInfo(data) {
  return request({
    url: '/small/Shop/apply_info',
    method: 'get',
    data,
  })
}